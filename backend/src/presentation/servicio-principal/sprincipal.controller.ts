import { Request, Response } from "express";
import { prisma } from "../../data";

export const servicioPrincipalController = {
  async getAll(_req: Request, res: Response) {
    try {
      const servicios = await prisma.servicioEditable.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(servicios);
    } catch (error) {
      console.error("Error al obtener servicios principales:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const servicio = await prisma.servicioEditable.findUnique({
        where: { id },
      });

      if (!servicio)
        return res.status(404).json({ message: "Servicio no encontrado" });

      res.json(servicio);
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion, componente1, componente2, componente3 } =
        req.body;

      // Validar campos
      if (!titulo || !descripcion) {
        return res
          .status(400)
          .json({ message: "Título y descripción son requeridos" });
      }

      const wordCount = descripcion.trim().split(/\s+/).length;
      if (wordCount > 150) {
        return res
          .status(400)
          .json({ message: "La descripción no puede exceder 150 palabras" });
      }

      const nuevoServicio = await prisma.servicioEditable.create({
        data: { titulo, descripcion, componente1, componente2, componente3 },
      });

      res.status(201).json(nuevoServicio);
    } catch (error) {
      console.error("Error al crear servicio principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion, componente1, componente2, componente3 } =
        req.body;

      const existente = await prisma.servicioEditable.findUnique({
        where: { id },
      });
      if (!existente)
        return res.status(404).json({ message: "Servicio no encontrado" });

      const wordCount = descripcion.trim().split(/\s+/).length;
      if (wordCount > 150) {
        return res
          .status(400)
          .json({ message: "La descripción no puede exceder 150 palabras" });
      }

      const actualizado = await prisma.servicioEditable.update({
        where: { id },
        data: { titulo, descripcion, componente1, componente2, componente3 },
      });

      res.json(actualizado);
    } catch (error) {
      console.error("Error al actualizar servicio principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      await prisma.servicioEditable.delete({ where: { id } });
      res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar servicio principal:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
