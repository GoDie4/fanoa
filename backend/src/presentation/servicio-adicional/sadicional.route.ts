import { Router } from "express";
import { upload } from "../../config/upload";
import { servicioAdicionalController } from "./sadicional.controller";

export const servicioAdicionalRoute = () => {
  const router = Router();

  router.get("/", servicioAdicionalController.getAllServiciosAdicional);
  router.get("/:id", servicioAdicionalController.getOneServicioAdicional);
  router.post("/", upload.single("imagen"), servicioAdicionalController.createServicioAdicional);
  router.put("/:id", upload.single("imagen"), servicioAdicionalController.updateServicioAdicional);
  router.post("/:id", servicioAdicionalController.deleteServicioAdicional);

  return router;
};
