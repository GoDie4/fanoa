import { Router } from "express";
import { authController } from "./auth.controller";
import { validateJWT } from "../middlewares/auth.middleware";

export const authRoute = () => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/renew", validateJWT, authController.renewToken);

  return router;
};
