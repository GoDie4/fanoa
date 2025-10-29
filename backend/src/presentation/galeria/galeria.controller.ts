import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../../data";
const deleteFileIfExists = (relativePath: string) => {
  try {
    if (!relativePath) return;
    // remove leading slash if present
    const rel = relativePath.replace(/^\//, "");
    const full = path.join(process.cwd(), rel);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
    }
  } catch (err) {
    console.error("Error eliminando fichero:", err);
  }
};

export const galeriaController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No se ha subido ninguna imagen" });
        return;
      }

      const nueva = await prisma.galeria.create({
        data: {
          imagen1: `/uploads/galerias/${req.file.filename}`,
        },
      });

      res.status(201).json({ status: "success", data: nueva });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: "Error al crear imagen" });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const todas = await prisma.galeria.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json({ status: "success", data: todas });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", error: "Error al listar galerías" });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!req.file) {
        res
          .status(400)
          .json({ status: "error", error: "No se subió ninguna imagen" });
        return;
      }

      const existe = await prisma.galeria.findUnique({
        where: { id: parseInt(id ?? '', 10) },
      });

      if (!existe) {
        // eliminar el fichero subido si el registro no existe para no dejar basura
        const uploadedRel = `/uploads/galerias/${req.file.filename}`;
        deleteFileIfExists(uploadedRel);
        res
          .status(404)
          .json({ status: "error", error: "Imagen no encontrada" });
        return;
      }

      // borrar la imagen anterior del disco (si existe)
      if (existe.imagen1) {
        deleteFileIfExists(existe.imagen1);
      }

      // actualizar registro con la nueva ruta
      const updated = await prisma.galeria.update({
        where: { id: parseInt(id ?? '', 10) },
        data: {
          imagen1: `/uploads/galerias/${req.file.filename}`,
        },
      });

      res.json({ status: "success", data: updated });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", error: "Error al actualizar imagen" });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const existe = await prisma.galeria.findUnique({
        where: { id: parseInt(id ?? "") },
      });

      if (!existe) {
        res.status(404).json({ error: "Imagen no encontrada" });
        return;
      }

      await prisma.galeria.delete({
        where: { id: parseInt(id ?? "") },
      });

      res.json({ status: "success", message: "Imagen eliminada" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", error: "Error al eliminar imagen" });
    }
  },
};
