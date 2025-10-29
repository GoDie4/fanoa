import { Request, Response } from "express";
import { prisma } from "../../data";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/proyecto");

export const proyectosController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { categoriaId } = req.query;
      const where = categoriaId ? { categoriaId: String(categoriaId) } : {};

      const proyectos = await prisma.proyecto.findMany({
        where,
        orderBy: { createdAt: "asc" },
        // include: { categoria: true },
      });

      return res.status(200).json(proyectos);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);

      const proyecto = await prisma.proyecto.findUnique({
        where: { id },
        include: { categoria: true },
      });

      if (!proyecto) return res.status(404).json({ error: "Proyecto no encontrado" });

      return res.status(200).json(proyecto);
    } catch (error) {
      console.error("Error al obtener proyecto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { titulo, categoriaId } = req.body;
      const imagen = req.file ? req.file.filename : "";

      if (!titulo || !categoriaId)
        return res.status(400).json({ error: "El título y categoriaId son obligatorios" });

      const categoria = await prisma.servicioCategoria.findUnique({
        where: { id: categoriaId },
      });
      if (!categoria) return res.status(404).json({ error: "La categoría indicada no existe" });

      const nuevoProyecto = await prisma.proyecto.create({
        data: { titulo, imagen, categoriaId },
      });

      return res.status(201).json(nuevoProyecto);
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { titulo, categoriaId } = req.body;

      const existente = await prisma.proyecto.findUnique({ where: { id } });
      if (!existente) return res.status(404).json({ error: "Proyecto no encontrado" });

      let imagen = existente.imagen;
      if (req.file) {
        if (imagen) {
          const oldPath = path.join(uploadDir, imagen);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        imagen = req.file.filename;
      }

      const actualizado = await prisma.proyecto.update({
        where: { id },
        data: { titulo, categoriaId, imagen },
      });

      return res.status(200).json(actualizado);
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const existente = await prisma.proyecto.findUnique({ where: { id } });

      if (!existente) return res.status(404).json({ error: "Proyecto no encontrado" });

      // Eliminar imagen del servidor
      if (existente.imagen) {
        const filePath = path.join(uploadDir, existente.imagen);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await prisma.proyecto.delete({ where: { id } });

      return res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
