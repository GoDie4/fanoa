import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../mail/mail.controller";
import { getEnvs } from "../../config/getEnvs";
import axios from "axios";
export const prisma = new PrismaClient();

export const contactoController = {
  async getAll(_req: Request, res: Response) {
    try {
      const secciones = await prisma.seccionContacto.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(secciones);
    } catch (error) {
      console.error("Error al obtener las secciones de contacto:", error);
      res.status(500).json({ message: "Error al obtener datos" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const seccion = await prisma.seccionContacto.findUnique({
        where: { id },
      });

      if (!seccion)
        return res.status(404).json({ message: "Sección no encontrada" });

      res.json(seccion);
    } catch (error) {
      console.error("Error al obtener la sección:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion } = req.body;

      if (!titulo || !descripcion) {
        return res
          .status(400)
          .json({ message: "Título y descripción son requeridos" });
      }

      const nuevaSeccion = await prisma.seccionContacto.create({
        data: { titulo, descripcion },
      });

      res.status(201).json(nuevaSeccion);
    } catch (error) {
      console.error("Error al crear la sección de contacto:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion } = req.body;

      const existente = await prisma.seccionContacto.findUnique({
        where: { id },
      });
      if (!existente)
        return res.status(404).json({ message: "Sección no encontrada" });

      const actualizada = await prisma.seccionContacto.update({
        where: { id },
        data: { titulo, descripcion },
      });

      res.json(actualizada);
    } catch (error) {
      console.error("Error al actualizar la sección:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const existente = await prisma.seccionContacto.findUnique({
        where: { id },
      });
      if (!existente)
        return res.status(404).json({ message: "Sección no encontrada" });

      await prisma.seccionContacto.delete({ where: { id } });

      res.json({ message: "Sección eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la sección:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async sendContactForm(req: Request, res: Response) {
    try {
      const { nombre, correo, telefono, empresa, mensaje, recaptchaToken } =
        req.body;

      const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${
        getEnvs().RECAPTCHA_SECRET_KEY
      }&response=${recaptchaToken}`;

      const recaptchaRes = await axios.post(googleVerifyUrl);
      if (!recaptchaRes.data.success) {
        return res
          .status(400)
          .json({ message: "Validación de ReCAPTCHA fallida" });
      }

      const emailEnviado = await sendEmail(
        getEnvs().EMAIL_RECEIVER || "admin@tuempresa.com",
        `Nuevo mensaje de contacto: ${nombre}`,
        "templates/contacto.html",
        {
          nombre,
          correo,
          telefono,
          empresa,
          mensaje,
          fecha: new Date().toLocaleString(),
        }
      );

      if (!emailEnviado) {
        return res.status(500).json({
          message: "Mensaje guardado pero hubo un error al enviar el correo",
        });
      }

      res.status(200).json({
        message: "Formulario enviado y procesado correctamente",
      });
    } catch (error) {
      console.error("Error en el endpoint de contacto:", error);
      res.status(500).json({
        message: "Error interno del servidor al procesar el contacto",
      });
    }
  },
};
