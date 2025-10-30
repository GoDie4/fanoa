import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { Login } from "../components/public/Login";
import { PrivateLayout } from "../components/private/PrivateLayout";
import Home from "../components/private/tables/Home";
// import { PrivateLayoutV2 } from "../components/private/PrivateLayoutV2";

import { ListaServicioCategoria } from "../components/private/tables/servicios-categoria/ListaServicioCategoria";
import { CrearServicioCategoria } from "../components/private/tables/servicios-categoria/CrearServicioCategoria";
import { EditarServicioCategoria } from "../components/private/tables/servicios-categoria/EditorServicioCategoria";

import { ListaProyectos } from "../components/private/tables/admin/proyectos/ListaProyectos";

import { CrearProyecto } from "../components/private/tables/admin/proyectos/CrearProyecto";
import { EditarProyecto } from "../components/private/tables/admin/proyectos/EditarProyecto";

import { ListaBannersPrincipal } from "../components/private/tables/admin/banner-principal/ListaBannersPrincipal";
import { CrearBannerPrincipal } from "../components/private/tables/admin/banner-principal/CrearBannerPrincipal";
import { EditarBannerPrincipal } from "../components/private/tables/admin/banner-principal/EditarBannerPrincipal";

import { ListaServicioAdicional } from "../components/private/tables/admin/servicio-adicional/ListaServicioAdicional";
import { CrearServicioAdicional } from "../components/private/tables/admin/servicio-adicional/CrearServicioAdicional";
import { EditarServicioAdicional } from "../components/private/tables/admin/servicio-adicional/EditarServicioAdicional";

import { ListaTrabajo } from "../components/private/tables/admin/trabajo/ListaTrabajo";
import { CrearTrabajo } from "../components/private/tables/admin/trabajo/CrearTrabajo";
import { EditarTrabajo } from "../components/private/tables/admin/trabajo/EditarTrabajo";
import { Editables } from "../components/private/tables/admin/editables/Editables";
import { ListaMarcas } from "../components/private/tables/admin/marcas/ListaMarcas";
import { CrearMarcas } from "../components/private/tables/admin/marcas/CrearMarcas";
import { EditarMarcas } from "../components/private/tables/admin/marcas/EditarMarcas";
import { ListaBannerSecundario } from "../components/private/tables/admin/banner-secundario/ListaBannerSecundatio";
import { CrearBannerSecundario } from "../components/private/tables/admin/banner-secundario/CrearBannerSecundario";
import { EditarBannerSecundario } from "../components/private/tables/admin/banner-secundario/EditarBannerSecundario";
import { EditarContacto } from "../components/private/tables/contacto/EditarContacto";
import { ListaGaleria } from "../components/private/tables/admin/galeria/ListarGaleria";
import { CrearGaleria } from "../components/private/tables/admin/galeria/CrearGaleria";
import { EditarGaleria } from "../components/private/tables/admin/galeria/EditarGaleria";

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<PrivateLayout />}>
            {/* <Route path="admin" element={<PrivateLayoutV2 />}> */}
            <Route index element={<Home />} />

            {/* NOTICIAS */}
            <Route path="galeria" element={<ListaGaleria />} />
            <Route path="galeria/agregar" element={<CrearGaleria />} />
            <Route path="galeria/editar/:id" element={<EditarGaleria />} />

            <Route path="banner-principal" element={<ListaBannersPrincipal />} />
            <Route path="banner-principal/agregar" element={<CrearBannerPrincipal />} />
            <Route path="banner-principal/editar/:id" element={<EditarBannerPrincipal />} />

            <Route path="servicios-categoria" element={<ListaServicioCategoria />} />
            <Route path="servicios-categoria/agregar" element={<CrearServicioCategoria />} />
            <Route path="servicios-categoria/editar/:id" element={<EditarServicioCategoria />} />

            <Route path="servicios-adicional" element={<ListaServicioAdicional />} />
            <Route path="servicios-adicional/agregar/:id" element={<CrearServicioAdicional />} />
            <Route
              path="servicios-adicional/:categoriaId/editar/:id"
              element={<EditarServicioAdicional />}
            />

            <Route path="trabajo" element={<ListaTrabajo />} />
            <Route path="trabajo/agregar/:id" element={<CrearTrabajo />} />
            <Route path="trabajo/:categoriaId/editar/:id" element={<EditarTrabajo />} />

            <Route path="proyectos" element={<ListaProyectos />} />
            <Route path="proyectos/agregar/:id" element={<CrearProyecto />} />
            <Route path="proyectos/:categoriaId/editar/:id" element={<EditarProyecto />} />

            <Route path="editables" element={<Editables />} />

            <Route path="marcas" element={<ListaMarcas />} />
            <Route path="marcas/agregar" element={<CrearMarcas />} />
            <Route path="marcas/editar/:id" element={<EditarMarcas />} />

            <Route path="banner-secundario" element={<ListaBannerSecundario />} />
            <Route path="banner-secundario/agregar" element={<CrearBannerSecundario />} />
            <Route path="banner-secundario/editar/:id" element={<EditarBannerSecundario />} />

            {/* CONFIGURACION */}
            <Route path="contacto/:id" element={<EditarContacto />} />
          </Route>
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
