import { Router } from "express";
import { politicasController } from "./politicas.controller";

export const politicasRoute = () => {
  const router = Router();

  router.get("/", politicasController.getAll);
  router.get("/:id", politicasController.getOne);
  router.post("/", politicasController.create);
  router.put("/:id", politicasController.update);
  router.delete("/:id", politicasController.delete);

  return router;
};
