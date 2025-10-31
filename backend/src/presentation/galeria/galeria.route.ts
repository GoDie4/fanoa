import { Router } from "express";
import { upload } from "../../config/upload";
import { galeriaController } from "./galeria.controller";

export const galeriaRoute = () => {
  const router = Router();

  router.get("/", galeriaController.getAll);
  router.get("/:id", galeriaController.getOne);
  router.post("/", upload.single("imagen1"), galeriaController.create);
  router.post("/:id", upload.single("imagen1"), galeriaController.update);
  router.delete("/:id", galeriaController.delete);

  return router;
};
