import { Request, Response } from "express";
import { Jwt } from "../../config/jwt";
import { Bcrypt } from "../../config/bcryp";
import { prisma } from "../../data";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { nombre, email, contraseña } = req.body;

      if (!nombre || !email || !contraseña) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const existingUser = await prisma.usuario.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está registrado" });
      }

      const hashedPassword = await Bcrypt.hash(contraseña);

      const user = await prisma.usuario.create({
        data: {
          nombre,
          email,
          contraseña: hashedPassword,
        },
      });

      // const token = await Jwt.sign({ userId: user.id });

      res.status(201).json({
        message: "Usuario registrado correctamente",
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
        // token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, contraseña } = req.body;

      const user = await prisma.usuario.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "Credenciales inválidas" });
      }

      const isMatch = await Bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      const token = await Jwt.sign({ userId: user.id });

      res.status(200).json({
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  renewToken: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const user = await prisma.usuario.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const newToken = await Jwt.sign({ userId: user.id }, "1d");

      res.status(200).json({
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
        token: newToken,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al renovar el token" });
    }
  },
};
