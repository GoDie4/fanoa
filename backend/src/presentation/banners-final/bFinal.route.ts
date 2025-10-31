import { Router } from "express";
import { bFinalController } from "./bFinal.controller";
import { upload } from "../../config/upload";

export const bFinalRoute = () => {
  const router = Router();

  router.get("/", bFinalController.getAll);
  router.get("/:id", bFinalController.getById);
  router.post("/", upload.array("images", 5), bFinalController.create);
  router.post("/:id", upload.array("images", 5), bFinalController.update);
  router.delete("/:id", bFinalController.delete);

  return router;
};
