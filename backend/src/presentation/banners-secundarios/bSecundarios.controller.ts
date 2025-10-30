import { Request, Response } from "express";
import { prisma } from "../../data";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../../uploads/banners-secundarios");

export const bSecundariosController = {
  async getAll(_req: Request,res: Response) {
    try {
      const banners = await prisma.bannerSecundario.findMany({
        orderBy: { createdAt: "asc" },
      });
      res.json(banners);
    } catch (error) {
      console.error("Error al obtener banners:", error);
      res.status(500).json({ message: "Error al obtener banners" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const banner = await prisma.bannerSecundario.findUnique({
        where: { id },
      });

      if (!banner) return res.status(404).json({ message: "Banner no encontrado" });

      res.json(banner);
    } catch (error) {
      console.error("Error al obtener el banner:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      if (!req.file) return res.status(400).json({ message: "La imagen es obligatoria" });

      const nuevoBanner = await prisma.bannerSecundario.create({
        data: { imagen: req.file.filename },
      });

      res.status(201).json(nuevoBanner);
    } catch (error) {
      console.error("Error al crear banner:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.bannerSecundario.findUnique({
        where: { id },
      });

      if (!existente) return res.status(404).json({ message: "Banner no encontrado" });

      let imagen = existente.imagen;
      if (req.file) {
        const oldPath = path.join(uploadDir, imagen);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        imagen = req.file.filename;
      }

      const actualizado = await prisma.bannerSecundario.update({
        where: { id },
        data: { imagen },
      });

      res.json(actualizado);
    } catch (error) {
      console.error("Error al actualizar banner:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const existente = await prisma.bannerSecundario.findUnique({
        where: { id },
      });

      if (!existente) return res.status(404).json({ message: "Banner no encontrado" });

      const filePath = path.join(uploadDir, existente.imagen);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      await prisma.bannerSecundario.delete({ where: { id } });
      res.json({ message: "Banner eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar banner:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
