import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Swal from "sweetalert2";
import { getAllMarcasAction, MarcaResponse } from "./actions/getAllMarcas.action";
import useAuth from "../../../../../hooks/useAuth";
import { deleteMarcaAction } from "./actions/deleteMarca.action";

export const ListaMarcas = (): JSX.Element => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState<MarcaResponse[]>([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const { setTitle } = useAuth();

  const getAllMarcas = async () => {
    try {
      setLoadingComponents(true);
      const data = await getAllMarcasAction();
      setMarcas(data);
      setTotalRegistros(data.length);
    } catch (error) {
      // console.error("Error al obtener las marcas:", error);
    } finally {
      setLoadingComponents(false);
    }
  };

  useEffect(() => {
    setTitle("Marcas");
    getAllMarcas();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteMarcaAction(id);
        Swal.fire("Eliminado", "La marca fue eliminada correctamente.", "success");
        getAllMarcas(); // refrescar la lista
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la marca.", "error");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row lg:justify-end">
          <button
            onClick={() => navigate("agregar")}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main/90 lg:w-fit"
          >
            Crear
          </button>
        </div>
      </div>

      {loadingComponents ? (
        <div className="text-center text-white">Cargando...</div>
      ) : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          {marcas.length === 0 ? (
            <p className="text-center text-gray-400">No hay marcas registradas.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {marcas.map((marca) => (
                <div
                  className="overflow-hidden transition-transform bg-secondary-900 rounded-xl hover:scale-105"
                  key={marca.id}
                >
                  <div className="relative aspect-video">
                    <img
                      src={marca.imagen || "/placeholder-image.jpg"}
                      alt={`Marca ${marca.id}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
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
                            to={`editar/${marca.id}`}
                            className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                          >
                            Editar
                          </Link>
                        </MenuItem>
                        <MenuItem className="p-0 hover:bg-transparent">
                          <button
                            onClick={() => handleDelete(marca.id)}
                            className="flex items-center flex-1 p-2 text-red-500 transition-colors rounded-lg hover:bg-secondary-900/20 gap-x-4"
                          >
                            Eliminar
                          </button>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 truncate">ID: {marca.id}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Creado: {new Date(marca.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Actualizado: {new Date(marca.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons">
            <p className="ml-1 text-md">{totalRegistros} Registros</p>
          </div>
        </div>
      )}
    </>
  );
};
