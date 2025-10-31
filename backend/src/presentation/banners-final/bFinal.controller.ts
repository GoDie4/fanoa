import { Request, Response } from "express";
import { prisma } from "../../data";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/banners-final");

export const bFinalController = {
  async getAll(_req: Request, res: Response) {
    try {
      const banners = await prisma.bannerFinal.findMany({
        orderBy: { id: "asc" },
      });
      res.json(banners);
    } catch (error) {
      // console.error("Error al obtener banners finales:", error);
      res.status(500).json({ message: "Error al obtener banners" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const banner = await prisma.bannerFinal.findUnique({
        where: { id },
      });

      if (!banner) {
        return res.status(404).json({ message: "Banner no encontrado" });
      }

      res.json(banner);
    } catch (error) {
      // console.error("Error al obtener banner final por ID:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion } = req.body;

      // Verificamos si ya existe un registro en la tabla
      const existente = await prisma.bannerFinal.findFirst();
      if (existente) {
        return res.status(400).json({
          message: "Ya existe un banner final. Solo puede actualizarlo.",
        });
      }

      if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
        return res.status(400).json({ message: "Debe subir al menos una imagen" });
      }

      const images = req.files.map((file: Express.Multer.File) => file.filename);

      const nuevoBanner = await prisma.bannerFinal.create({
        data: {
          titulo,
          descripcion,
          images,
        },
      });

      res.status(201).json(nuevoBanner);
    } catch (error) {
      console.error("Error al crear banner final:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { titulo, descripcion } = req.body;

      const existente = await prisma.bannerFinal.findUnique({
        where: { id },
      });

      if (!existente) {
        return res.status(404).json({ message: "Banner no encontrado" });
      }

      let images = existente.images as string[];

      // Si se suben nuevas imágenes, reemplazamos las antiguas
      if (req.files && req.files instanceof Array && req.files.length > 0) {
        // Borrar las imágenes antiguas del servidor
        images.forEach((img) => {
          const oldPath = path.join(uploadDir, img);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        });

        images = req.files.map((file: Express.Multer.File) => file.filename);
      }

      const actualizado = await prisma.bannerFinal.update({
        where: { id },
        data: { titulo, descripcion, images },
      });

      res.json(actualizado);
    } catch (error) {
      // console.error("Error al actualizar banner final:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.bannerFinal.findUnique({
        where: { id },
      });

      if (!existente) {
        return res.status(404).json({ message: "Banner no encontrado" });
      }

      // Borrar las imágenes del servidor
      const images = existente.images as string[];
      images.forEach((img) => {
        const filePath = path.join(uploadDir, img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      await prisma.bannerFinal.delete({ where: { id } });
      res.json({ message: "Banner eliminado correctamente" });
    } catch (error) {
      // console.error("Error al eliminar banner final:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
