// src/components/private/tables/admin/servicio-adicional/ListaServicioAdicional.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Swal from "sweetalert2";
import "@szhsin/react-menu/dist/index.css";

import { TopControls } from "../shared/TopControls";
import type { ProyectoResponse } from "../proyectos/interfaces/project.response";
import { getAllServiciosAdicionalesByCategoryAction } from "./actions/getAllServiciosAdicionalesByCategory.action";
import { deleteServicioAdicional } from "./actions/deleteServicioAdicional.action";
import useAuth from "../../../../../hooks/useAuth";

export const ListaServicioAdicional = (): JSX.Element => {
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [servicios, setServicios] = useState<ProyectoResponse[]>([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
  const { setTitle } = useAuth();

  const fetchServicios = async (categoriaId: string) => {
    setLoadingComponents(true);
    try {
      const data = await getAllServiciosAdicionalesByCategoryAction(categoriaId || "");
      setServicios(data);
      setTotalRegistros(data.length);
    } catch (error) {
      console.error("Error cargando servicios adicionales:", error);
      setServicios([]);
      setTotalRegistros(0);
    } finally {
      setLoadingComponents(false);
    }
  };

  useEffect(() => {
    fetchServicios(categoriaSeleccionada);
    setTitle("Servicios Adicionales");
  }, [categoriaSeleccionada]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteServicioAdicional(id);
        setServicios((prev) => prev.filter((item) => item.id !== id));
        setTotalRegistros((prev) => prev - 1);
        Swal.fire("Eliminado", "El servicio adicional ha sido eliminado.", "success");
      } catch (error) {
        console.error("Error eliminando servicio adicional:", error);
        Swal.fire("Error", "No se pudo eliminar el servicio adicional.", "error");
      }
    }
  };

  return (
    <>
      <TopControls onCategoriaChange={(id) => setCategoriaSeleccionada(id)} />

      {loadingComponents ? (
        <div className="text-center py-8 text-gray-400">Cargando servicios...</div>
      ) : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servicios.map((srv) => (
              <div
                className="overflow-hidden transition-transform bg-secondary-900 rounded-xl hover:scale-105"
                key={srv.id}
              >
                <div className="relative aspect-video">
                  <img
                    src={srv.imagen ?? "/placeholder-image.jpg"}
                    alt={srv.titulo}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    {categoriaSeleccionada && (
                      <Menu
                        menuButton={
                          <MenuButton className="p-2 transition-colors rounded-lg bg-secondary-100/80 backdrop-blur-sm hover:bg-secondary-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </MenuButton>
                        }
                        align="end"
                        arrow
                        transition
                        menuClassName="bg-secondary-100 p-4"
                      >
                        <MenuItem className="p-0 hover:bg-transparent">
                          <Link
                            to={`${categoriaSeleccionada}/editar/${srv.id}`}
                            className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                          >
                            Editar
                          </Link>
                        </MenuItem>
                        <MenuItem className="p-0 hover:bg-transparent">
                          <button
                            onClick={() => handleDelete(srv.id)}
                            className="flex items-center flex-1 p-2 text-red-500 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4 w-full text-left"
                          >
                            Eliminar
                          </button>
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white truncate">{srv.titulo}</h3>
                  <p className="mt-2 text-xs text-gray-500">ID: {srv.id.split("-")[0]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons">
            <p className="ml-1 text-md">{totalRegistros} Servicios adicionales</p>
          </div>
        </div>
      )}
    </>
  );
};
