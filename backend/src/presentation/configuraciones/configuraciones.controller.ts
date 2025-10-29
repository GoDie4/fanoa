import { prisma } from "../../data";

import { Request, Response } from "express";

export const ConfiguracionController = {
  async getConfiguracion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const configuracion = await prisma.configuracion.findUnique({
        where: { id: parseInt(id ?? "") },
      });

      if (!configuracion) {
        res.status(404).json({ error: "Configuración no encontrada" });
        return;
      }

      res.json(configuracion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la configuración" });
    }
  },

  async updateConfiguracion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      console.log(req.body)
      const {
        numeros,
        correos,
        direccion1,
        direccion2,
        direccion3,
        horario,
        facebook,
        instagram,
        twiter,
        tiktok,
        linkedin,
        youtube,
        whatsapp,
      } = req.body;

      if (
        !numeros ||
        !correos ||
        !direccion1 ||
        !direccion2 ||
        !direccion3 ||
        !horario
      ) {
        res.status(400).json({
          error:
            "Los campos numeros, correos, direccion1, direccion2, direccion3 y horario son requeridos",
        });
        return;
      }

      // Verificar si existe
      const existe = await prisma.configuracion.findUnique({
        where: { id: parseInt(id ?? "") },
      });

      if (!existe) {
        res.status(404).json({ error: "Configuración no encontrada" });
        return;
      }

      const convertirNull = (value: any) => (value === "null" ? null : value);

      const configuracionActualizada = await prisma.configuracion.update({
        where: { id: parseInt(id ?? "") },
        data: {
          numeros,
          correos,
          direccion1,
          direccion2,
          direccion3,
          horario,
          facebook: convertirNull(facebook),
          instagram: convertirNull(instagram),
          twiter: convertirNull(twiter),
          tiktok: convertirNull(tiktok),
          linkedin: convertirNull(linkedin),
          youtube: convertirNull(youtube),
          whatsapp: convertirNull(whatsapp),
        },
      });

      res.json({ status: "success", data: configuracionActualizada });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          status: "error",
          error: "Error al actualizar la configuración",
        });
    }
  },
};
