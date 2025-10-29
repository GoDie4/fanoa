import { Request, Response } from "express";
import { prisma } from "../../data";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/servicio_categoria");

export const servicioCategoriaController = {
  getAllServiciosCategoria: async (_req: Request, res: Response) => {
    try {
      const allServiciosCategorias = await prisma.servicioCategoria.findMany({
        orderBy: { createdAt: "asc" },
      });

      return res.status(200).json(allServiciosCategorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getOneServiciosCategoria: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const servicioCategoria = await prisma.servicioCategoria.findUnique({
        where: { id },
        include: {
          proyectos: true,
          serviciosAdicionales: true,
          trabajos: true,
        },
      });

      if (!servicioCategoria) return res.status(404).json({ error: "Categoría no encontrada" });

      return res.status(200).json(servicioCategoria);
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  createServicioCategoria: async (req: Request, res: Response) => {
    try {
      const { titulo, subtitulo, descripcion, miniTitulo, miniDescripcion } = req.body;
      const imagen = req.file ? req.file.filename : "";

      const nuevaCategoria = await prisma.servicioCategoria.create({
        data: {
          titulo,
          subtitulo,
          descripcion,
          miniTitulo,
          miniDescripcion,
          imagen,
        },
      });

      return res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  updateServicioCategoria: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { titulo, subtitulo, descripcion, miniTitulo, miniDescripcion } = req.body;

      const existente = await prisma.servicioCategoria.findUnique({
        where: { id },
      });
      if (!existente) return res.status(404).json({ error: "Categoría no encontrada" });

      // Si se sube nueva imagen, eliminar la anterior
      let imagen = existente.imagen;
      if (req.file) {
        if (imagen) {
          const oldPath = path.join(uploadDir, imagen);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        imagen = req.file.filename;
      }

      const actualizado = await prisma.servicioCategoria.update({
        where: { id },
        data: {
          titulo,
          subtitulo,
          descripcion,
          miniTitulo,
          miniDescripcion,
          imagen,
        },
      });

      return res.status(200).json(actualizado);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  deleteServicioCategoria: async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const existente = await prisma.servicioCategoria.findUnique({
        where: { id },
      });

      if (!existente) return res.status(404).json({ error: "Categoría no encontrada" });

      // Eliminar imagen del servidor si existe
      if (existente.imagen) {
        const filePath = path.join(uploadDir, existente.imagen);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await prisma.servicioCategoria.delete({ where: { id } });

      return res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
