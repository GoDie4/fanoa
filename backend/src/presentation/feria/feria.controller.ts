import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/feria");

export const feriaController = {
  async getAll(_req: Request, res: Response) {
    try {
      const ferias = await prisma.feria.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(ferias);
    } catch (error) {
      console.error("Error al obtener ferias:", error);
      res.status(500).json({ message: "Error al obtener ferias" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      if (!req.file) return res.status(400).json({ message: "La imagen es obligatoria" });

      const nuevaFeria = await prisma.feria.create({
        data: { imagen: req.file.filename },
      });

      res.status(201).json(nuevaFeria);
    } catch (error) {
      console.error("Error al crear feria:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const feria = await prisma.feria.findUnique({ where: { id } });

      if (!feria) return res.status(404).json({ message: "Feria no encontrada" });

      res.json(feria);
    } catch (error) {
      console.error("Error al obtener la feria:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.feria.findUnique({ where: { id } });

      if (!existente) return res.status(404).json({ message: "Feria no encontrada" });

      let imagen = existente.imagen;
      if (req.file) {
        const oldPath = path.join(uploadDir, imagen);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        imagen = req.file.filename;
      }

      const actualizada = await prisma.feria.update({
        where: { id },
        data: { imagen },
      });

      res.json(actualizada);
    } catch (error) {
      console.error("Error al actualizar feria:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.feria.findUnique({ where: { id } });

      if (!existente) return res.status(404).json({ message: "Feria no encontrada" });

      const filePath = path.join(uploadDir, existente.imagen);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      await prisma.feria.delete({ where: { id } });
      res.json({ message: "Feria eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar feria:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
