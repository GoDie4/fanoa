import Router from "express";
import { generalController } from "./general.controller";

export const generalRoute = () => {
  const router = Router();

  router.get("/", generalController.getAll);
  return router;
};
