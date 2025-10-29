import { Request, Response } from "express";
import { prisma } from "../../data";

export const generalController = {
  async getAll(_req: Request, res: Response) {
    try {
      // Cargar en paralelo los conjuntos de datos públicos
      const [
        bannersPrincipales,
        bannersSecundarios,
        servicioEditables,
        categoriasConRelaciones,
        proyectos,
        trabajos,
        ferias,
        seccionesContacto,
        usuariosSafe,
      ] = await Promise.all([
        prisma.bannerPrincipal.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.bannerSecundario.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.servicioEditable.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.servicioCategoria.findMany({
          orderBy: { createdAt: "asc" },
          include: {
            serviciosAdicionales: {
              orderBy: { createdAt: "asc" },
            },
            trabajos: {
              orderBy: { createdAt: "asc" },
            },
            proyectos: {
              orderBy: { createdAt: "asc" },
            },
          },
        }),
        prisma.proyecto.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.trabajo.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.feria.findMany({ orderBy: { createdAt: "asc" } }),
        prisma.seccionContacto.findMany({ orderBy: { createdAt: "asc" } }),
        // Exponer usuarios sin la contraseña por razones de seguridad
        prisma.usuario.findMany({
          select: { id: true, nombre: true, email: true, rol: true, createdAt: true },
        }),
      ]);

      const data = {
        banners: bannersPrincipales,
        bannersSecundarios,
        servicioEditables,
        categorias: categoriasConRelaciones,
        proyectos,
        trabajos,
        ferias,
        contacto: seccionesContacto,
        usuarios: usuariosSafe,
      };

      // console.log(JSON.stringify(data, null, 2));
      return res.json({ data });
    } catch (error) {
      // console.error("Error al obtener datos generales:", error);
      return res.status(500).json({ message: "Error al obtener datos" });
    }
  },
};
