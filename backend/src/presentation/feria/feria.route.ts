import { Router } from "express";
import { feriaController } from "./feria.controller";
import { upload } from "../../config/upload";

export const feriaRoute = () => {
  const router = Router();

  router.get("/", feriaController.getAll);
  router.get("/:id", feriaController.getOne);
  router.post("/", upload.single("imagen"), feriaController.create);
  router.post("/:id", upload.single("imagen"), feriaController.update);
  router.delete("/:id", feriaController.delete);

  return router;
};
