import { Router } from "express";
import { bSecundariosController } from "./bSecundarios.controller";
import { upload } from "../../config/upload";

export const bSecundariosRoute = () => {
  const router = Router();

  router.get("/", bSecundariosController.getAll);
  router.get("/:id", bSecundariosController.getOne);
  router.post("/", upload.single("imagen"), bSecundariosController.create);
  router.post("/:id", upload.single("imagen"), bSecundariosController.update);
  router.delete("/:id", bSecundariosController.delete);

  return router;
};
