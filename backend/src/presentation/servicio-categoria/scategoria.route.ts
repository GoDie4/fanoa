import { Router } from "express";
import { servicioCategoriaController } from "./scategoria.controller";
import { upload } from "../../config/upload";

export const servicioCategoriaRoute = () => {
  const router = Router();

  router.get("/", servicioCategoriaController.getAllServiciosCategoria);
  router.get("/:id", servicioCategoriaController.getOneServiciosCategoria);

  router.post(
    "/",
    upload.single("imagen"),
    servicioCategoriaController.createServicioCategoria
  );
  router.post(
    "/:id",
    upload.single("imagen"),
    servicioCategoriaController.updateServicioCategoria
  );

  router.post("/:id", servicioCategoriaController.deleteServicioCategoria);


  return router;
};
