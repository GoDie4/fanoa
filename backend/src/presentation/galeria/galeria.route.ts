import { Router } from "express";
import { upload } from "../../config/upload";
import { galeriaController } from "./galeria.controller";

export const galeriaRoute = () => {
  const router = Router();

  router.get("/", galeriaController.list);
  router.post(
    "/",
    upload.single("imagen1"),
    galeriaController.create
  );
  router.put(
    "/:id",
    upload.single("imagen"),
    galeriaController.update
  );
  router.delete("/:id", galeriaController.delete);

  return router;
};
