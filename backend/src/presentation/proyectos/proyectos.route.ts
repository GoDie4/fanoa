import { Router } from "express";
import { proyectosController } from "./proyectos.controller";
import { upload } from "../../config/upload";

export const proyectosRoute = () => {
  const router = Router();

  router.get("/", proyectosController.getAll);
  router.get("/:id", proyectosController.getById);
  router.post("/", upload.single("imagen"), proyectosController.create);
  router.put("/:id", upload.single("imagen"), proyectosController.update);
  router.post("/:id", proyectosController.delete);

  return router;
};
