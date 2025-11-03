import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/servicio_adicional");

export const servicioAdicionalController = {
  getAllServiciosAdicional: async (req: Request, res: Response) => {
    try {
      const { categoriaId } = req.query;

      const whereClause = categoriaId ? { categoriaId: String(categoriaId) } : {};

      const servicios = await prisma.servicioAdicional.findMany({
        where: whereClause,
        orderBy: { createdAt: "asc" },
        // include: { categoria: true },
      });

      return res.status(200).json(servicios);
    } catch (error) {
      console.error("Error al obtener servicios adicionales:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getOneServicioAdicional: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);

      const servicio = await prisma.servicioAdicional.findUnique({
        where: { id },
        include: { categoria: true },
      });

      if (!servicio) return res.status(404).json({ error: "Servicio adicional no encontrado" });

      return res.status(200).json(servicio);
    } catch (error) {
      console.error("Error al obtener servicio adicional:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  createServicioAdicional: async (req: Request, res: Response) => {
    try {
      const { titulo, subtitulo, categoriaId } = req.body;
      const imagen = req.file ? req.file.filename : "";

      if (!titulo || !categoriaId) {
        return res.status(400).json({ error: "El nombre y categoriaId son obligatorios" });
      }

      // Validar que la categoría exista
      const categoria = await prisma.servicioCategoria.findUnique({
        where: { id: categoriaId },
      });
      if (!categoria) {
        return res.status(404).json({ error: "La categoría indicada no existe" });
      }

      const nuevoServicio = await prisma.servicioAdicional.create({
        data: {
          titulo,
          subtitulo,
          imagen,
          categoriaId,
        },
      });

      return res.status(201).json(nuevoServicio);
    } catch (error) {
      console.error("Error al crear servicio adicional:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  updateServicioAdicional: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { titulo, subtitulo, categoriaId } = req.body;

      const existente = await prisma.servicioAdicional.findUnique({
        where: { id },
      });
      if (!existente) return res.status(404).json({ error: "Servicio adicional no encontrado" });

      // Si se sube una nueva imagen, eliminar la anterior
      let imagen = existente.imagen;
      if (req.file) {
        if (imagen) {
          const oldPath = path.join(uploadDir, imagen);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        imagen = req.file.filename;
      }

      const actualizado = await prisma.servicioAdicional.update({
        where: { id },
        data: {
          titulo,
          subtitulo,
          categoriaId,
          imagen,
        },
      });

      return res.status(200).json(actualizado);
    } catch (error) {
      console.error("Error al actualizar servicio adicional:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  deleteServicioAdicional: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);

      const existente = await prisma.servicioAdicional.findUnique({
        where: { id },
      });
      if (!existente) return res.status(404).json({ error: "Servicio adicional no encontrado" });

      // Eliminar imagen del servidor si existe
      if (existente.imagen) {
        const filePath = path.join(uploadDir, existente.imagen);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await prisma.servicioAdicional.delete({ where: { id } });

      return res.status(200).json({ message: "Servicio adicional eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar servicio adicional:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
