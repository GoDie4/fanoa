import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const uploadDir = path.resolve(__dirname, "../../../uploads/banners-principales");

export const bPrincipalesController = {
  async getAll(_req: Request,res: Response) {
    try {
      const banners = await prisma.bannerPrincipal.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(banners);
    } catch (error) {
      console.error("Error al obtener banners principales:", error);
      res.status(500).json({ message: "Error al obtener banners" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const banner = await prisma.bannerPrincipal.findUnique({
        where: { id },
      });

      if (!banner) {
        return res.status(404).json({ message: "Banner no encontrado" });
      }

      res.json(banner);
    } catch (error) {
      // console.error("Error al obtener banner por ID:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const count = await prisma.bannerPrincipal.count();
      if (count >= 4) {
        return res.status(400).json({ message: "Máximo de 4 banners alcanzado" });
      }

      const { titulo, descripcion, enlace, textoBoton } = req.body;
      if (!req.file) return res.status(400).json({ message: "La imagen es obligatoria" });

      const nuevoBanner = await prisma.bannerPrincipal.create({
        data: {
          titulo,
          descripcion,
          textoBoton,
          enlace,
          imagen: req.file.filename,
        },
      });

      res.status(201).json(nuevoBanner);
    } catch (error) {
      console.error("Error al crear banner principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion, textoBoton, enlace } = req.body;
      const existente = await prisma.bannerPrincipal.findUnique({
        where: { id },
      });

      if (!existente) return res.status(404).json({ message: "Banner no encontrado" });

      let imagen = existente.imagen;
      if (req.file) {
        if (imagen) {
          const oldPath = path.join(uploadDir, imagen);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        imagen = req.file.filename;
      }

      const actualizado = await prisma.bannerPrincipal.update({
        where: { id },
        data: { titulo, descripcion, textoBoton, enlace, imagen },
      });

      res.json(actualizado);
    } catch (error) {
      console.error("Error al actualizar banner principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.bannerPrincipal.findUnique({
        where: { id },
      });

      if (!existente) return res.status(404).json({ message: "Banner no encontrado" });

      const filePath = path.join(uploadDir, existente.imagen);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      await prisma.bannerPrincipal.delete({ where: { id } });
      res.json({ message: "Banner eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar banner principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
