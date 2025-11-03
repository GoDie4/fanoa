import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/galeria");

export const galeriaController = {
  // Obtener todas las imágenes de la galería
  async getAll(_req: Request, res: Response) {
    try {
      const galerias = await prisma.galeria.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(galerias);
    } catch (error) {
      console.error("Error al obtener galería:", error);
      res.status(500).json({ message: "Error al obtener galería" });
    }
  },

  // Crear una nueva imagen en la galería
  async create(req: Request, res: Response) {
    try {
      if (!req.file) return res.status(400).json({ message: "La imagen es obligatoria" });

      const nuevaGaleria = await prisma.galeria.create({
        data: { imagen1: req.file.filename },
      });

      res.status(201).json(nuevaGaleria);
    } catch (error) {
      console.error("Error al crear galería:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  // Obtener una imagen por ID
  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const galeria = await prisma.galeria.findUnique({ where: { id } });

      if (!galeria) return res.status(404).json({ message: "Imagen no encontrada" });

      res.json(galeria);
    } catch (error) {
      console.error("Error al obtener imagen1:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  // Actualizar una imagen
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const existente = await prisma.galeria.findUnique({ where: { id } });

      if (!existente) return res.status(404).json({ message: "Imagen no encontrada" });

      let imagen1 = existente.imagen1;
      if (req.file) {
        const oldPath = path.join(uploadDir, imagen1);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        imagen1 = req.file.filename;
      }

      const actualizada = await prisma.galeria.update({
        where: { id },
        data: { imagen1 },
      });

      res.json(actualizada);
    } catch (error) {
      console.error("Error al actualizar galería:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  // Eliminar una imagen
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const existente = await prisma.galeria.findUnique({ where: { id } });

      if (!existente) return res.status(404).json({ message: "Imagen no encontrada" });

      const filePath = path.join(uploadDir, existente.imagen1);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      await prisma.galeria.delete({ where: { id } });
      res.json({ message: "Imagen eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar imagen1:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
