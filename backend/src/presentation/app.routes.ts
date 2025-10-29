import { Router } from "express";
import { servicioCategoriaRoute } from "./servicio-categoria/scategoria.route";
import { servicioAdicionalRoute } from "./servicio-adicional/sadicional.route";
import { trabajosRoute } from "./trabajo/trabajo.route";
import { proyectosRoute } from "./proyectos/proyectos.route";
import { feriaRoute } from "./feria/feria.route";
import { bSecundariosRoute } from "./banners-secundarios/bSecundarios.route";
import { contactoRoute } from "./contacto/contacto.route";
import { bannersPrincipalesRoute } from "./banners-principales/bPrincipales.route";
import { servicioPrincipalRoute } from "./servicio-principal/sprincipal.route";
import { authRoute } from "./auth/auth.route";
import { servicioEditableRoute } from "./servicio-editable/seditable.route";
import { generalRoute } from "./main/general.route";
import { configuracionRoute } from "./configuraciones/configuraciones.route";
import { galeriaRoute } from "./galeria/galeria.route";

export const appRouter = () => {
  const router = Router();

  router.use("/scategorias", servicioCategoriaRoute());
  router.use("/sadicionales", servicioAdicionalRoute());
  router.use("/sprincipal", servicioPrincipalRoute());
  router.use("/seditable", servicioEditableRoute());
  router.use("/proyectos", proyectosRoute());
  router.use("/trabajo", trabajosRoute());
  router.use("/feria", feriaRoute());
  router.use("/bsecundarios", bSecundariosRoute());
  router.use("/contacto", contactoRoute());
  router.use("/configuracion", configuracionRoute());
  router.use("/galeria", galeriaRoute());
  router.use("/bprincipales", bannersPrincipalesRoute());
  router.use("/auth", authRoute());
  //PARA TRAER TODOS LOS DATOS
  router.use("/general", generalRoute());

  return router;
};
