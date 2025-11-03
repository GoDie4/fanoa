import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/trabajo");

export const trabajosController = {
  getAllTrabajos: async (req: Request, res: Response) => {
    try {
      const { categoriaId } = req.query;
      const whereClause = categoriaId ? { categoriaId: String(categoriaId) } : {};

      const trabajos = await prisma.trabajo.findMany({
        where: whereClause,
        orderBy: { createdAt: "asc" },
        // include: { categoria: true },
      });

      return res.status(200).json(trabajos);
    } catch (error) {
      console.error("Error al obtener trabajos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getOneTrabajo: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);

      const trabajo = await prisma.trabajo.findUnique({
        where: { id },
        include: { categoria: true },
      });

      if (!trabajo) return res.status(404).json({ error: "Trabajo no encontrado" });

      return res.status(200).json(trabajo);
    } catch (error) {
      console.error("Error al obtener trabajo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  createTrabajo: async (req: Request, res: Response) => {
    try {
      const { titulo, descripcion, categoriaId } = req.body;
      const imagen = req.file ? req.file.filename : "";

      if (!titulo || !categoriaId) {
        return res.status(400).json({ error: "El título y categoriaId son obligatorios" });
      }

      const categoria = await prisma.servicioCategoria.findUnique({
        where: { id: categoriaId },
      });

      if (!categoria) return res.status(404).json({ error: "La categoría indicada no existe" });

      const nuevoTrabajo = await prisma.trabajo.create({
        data: {
          titulo,
          descripcion,
          imagen,
          categoriaId,
        },
      });

      return res.status(201).json(nuevoTrabajo);
    } catch (error) {
      console.error("Error al crear trabajo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  updateTrabajo: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion, categoriaId } = req.body;

      const existente = await prisma.trabajo.findUnique({ where: { id } });
      if (!existente) return res.status(404).json({ error: "Trabajo no encontrado" });

      let imagen = existente.imagen;
      if (req.file) {
        if (imagen) {
          const oldPath = path.join(uploadDir, imagen);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        imagen = req.file.filename;
      }

      const actualizado = await prisma.trabajo.update({
        where: { id },
        data: {
          titulo,
          descripcion,
          categoriaId,
          imagen,
        },
      });

      return res.status(200).json(actualizado);
    } catch (error) {
      console.error("Error al actualizar trabajo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  deleteTrabajo: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);

      const existente = await prisma.trabajo.findUnique({ where: { id } });
      if (!existente) return res.status(404).json({ error: "Trabajo no encontrado" });

      if (existente.imagen) {
        const filePath = path.join(uploadDir, existente.imagen);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await prisma.trabajo.delete({ where: { id } });

      return res.status(200).json({ message: "Trabajo eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar trabajo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
