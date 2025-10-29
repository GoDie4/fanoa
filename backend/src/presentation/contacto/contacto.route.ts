import { Router } from "express";
import { contactoController } from "./contacto.controller";

export const contactoRoute = () => {
  const router = Router();

  router.get("/", contactoController.getAll);
  router.get("/:id", contactoController.getOne);
  router.post("/", contactoController.create);
  router.put("/:id", contactoController.update);
  router.delete("/:id", contactoController.delete);

  return router;
};
