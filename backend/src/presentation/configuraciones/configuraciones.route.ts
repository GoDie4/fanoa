import { Router } from "express";
import { ConfiguracionController } from "./configuraciones.controller";

export const configuracionRoute = () => {
  const router = Router();

  router.get("/oneConfi/:id", (req, res) =>
    ConfiguracionController.getConfiguracion(req, res)
  );
  router.put("/updateConfiguracion/:id", (req, res) =>
    ConfiguracionController.updateConfiguracion(req, res)
  );
  return router;
};
