import { Request, Response } from "express";
import { prisma } from "../../data";

export const politicasController = {
  async getAll(_req: Request, res: Response) {
    try {
      const politicas = await prisma.politicas.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(politicas);
    } catch (error) {
      // console.error("❌ Error al obtener las políticas:", error);
      res.status(500).json({ message: "Error al obtener datos" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const politica = await prisma.politicas.findUnique({
        where: { id },
      });

      if (!politica) {
        return res.status(404).json({ message: "Política no encontrada" });
      }

      res.json(politica);
    } catch (error) {
      // console.error("❌ Error al obtener la política:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion } = req.body;

      if (!titulo || !descripcion) {
        return res.status(400).json({ message: "Título y descripción son requeridos" });
      }

      const nuevaPolitica = await prisma.politicas.create({
        data: { titulo, descripcion },
      });

      res.status(201).json(nuevaPolitica);
    } catch (error) {
      // console.error("❌ Error al crear la política:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion } = req.body;

      const existente = await prisma.politicas.findUnique({
        where: { id },
      });

      if (!existente) {
        return res.status(404).json({ message: "Política no encontrada" });
      }

      const actualizada = await prisma.politicas.update({
        where: { id },
        data: { titulo, descripcion },
      });

      res.json(actualizada);
    } catch (error) {
      // console.error("❌ Error al actualizar la política:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const existente = await prisma.politicas.findUnique({
        where: { id },
      });
      if (!existente) {
        return res.status(404).json({ message: "Política no encontrada" });
      }

      await prisma.politicas.delete({ where: { id } });

      res.json({ message: "Política eliminada correctamente" });
    } catch (error) {
      // console.error("❌ Error al eliminar la política:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
