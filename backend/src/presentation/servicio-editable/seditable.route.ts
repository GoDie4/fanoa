import { Router } from "express";
import { servicioEditableController } from "./seditable.controller";

export const servicioEditableRoute = () => {
  const router = Router();

  router.get("/", servicioEditableController.getAll);
  router.get("/:id", servicioEditableController.getOne);
  router.post("/", servicioEditableController.create);
  router.post("/:id", servicioEditableController.update);
  router.delete("/:id", servicioEditableController.delete);

  return router;
};
