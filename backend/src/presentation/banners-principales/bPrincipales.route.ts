import { Router } from "express";
import { bPrincipalesController } from "./bPrincipales.controller";
import { upload } from "../../config/upload";

export const bannersPrincipalesRoute = () => {
  const router = Router();

  router.get("/", bPrincipalesController.getAll);
  router.get("/:id", bPrincipalesController.getById);
  router.post("/", upload.single("imagen"), bPrincipalesController.create);
  router.put("/:id", upload.single("imagen"), bPrincipalesController.update);
  router.delete("/:id", bPrincipalesController.delete);

  return router;
};
