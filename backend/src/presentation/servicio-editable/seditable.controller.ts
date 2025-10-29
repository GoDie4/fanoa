import { Request, Response } from "express";
import { prisma } from "../../data";

export const servicioEditableController = {
  async getAll(_req: Request, res: Response) {
    try {
      const servicios = await prisma.servicioEditable.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(servicios);
    } catch (error) {
      console.error("Error al obtener los servicios editables:", error);
      res.status(500).json({ message: "Error al obtener los servicios" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const servicio = await prisma.servicioEditable.findUnique({
        where: { id },
      });

      if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });

      res.json(servicio);
    } catch (error) {
      console.error("Error al obtener el servicio editable:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion, componente1, componente2, componente3, componente4 } = req.body;

      if (!titulo || !descripcion || !componente1 || !componente2 || !componente3 || !componente4) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
      }

      const nuevoServicio = await prisma.servicioEditable.create({
        data: { titulo, descripcion, componente1, componente2, componente3, componente4 },
      });

      res.status(201).json(nuevoServicio);
    } catch (error) {
      console.error("Error al crear el servicio editable:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion, componente1, componente2, componente3, componente4 } = req.body;

      const existente = await prisma.servicioEditable.findUnique({ where: { id } });
      if (!existente) return res.status(404).json({ message: "Servicio no encontrado" });

      const actualizado = await prisma.servicioEditable.update({
        where: { id },
        data: { titulo, descripcion, componente1, componente2, componente3, componente4 },
      });

      res.json(actualizado);
    } catch (error) {
      console.error("Error al actualizar el servicio editable:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const existente = await prisma.servicioEditable.findUnique({ where: { id } });
      if (!existente) return res.status(404).json({ message: "Servicio no encontrado" });

      await prisma.servicioEditable.delete({ where: { id } });

      res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el servicio editable:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
