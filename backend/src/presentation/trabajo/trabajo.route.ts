import { Router } from "express";
import { upload } from "../../config/upload";
import { trabajosController } from "./trabajo.controller";

export const trabajosRoute = () => {
  const router = Router();

  router.get("/", trabajosController.getAllTrabajos);
  router.get("/:id", trabajosController.getOneTrabajo);
  router.post("/", upload.single("imagen"), trabajosController.createTrabajo);
  router.post("/:id", upload.single("imagen"), trabajosController.updateTrabajo);
  router.delete("/:id", trabajosController.deleteTrabajo);

  return router;
};
