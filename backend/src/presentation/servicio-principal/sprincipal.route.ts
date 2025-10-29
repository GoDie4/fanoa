import { Router } from "express";
import { servicioPrincipalController } from "./sprincipal.controller";

export const servicioPrincipalRoute = () => {
  const router = Router();

  router.get("/", servicioPrincipalController.getAll);
  router.get("/:id", servicioPrincipalController.getOne);
  router.post("/", servicioPrincipalController.create);
  router.put("/:id", servicioPrincipalController.update);
  router.delete("/:id", servicioPrincipalController.delete);

  return router;
};
