import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { getAllMainBannersAction } from "./actions/getAllMainBanners.action";
import useAuth from "../../../../../hooks/useAuth";

interface BannerPrincipal {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  textoBoton: string;
}

export const ListaBannersPrincipal = (): JSX.Element => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<BannerPrincipal[]>([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const { setTitle } = useAuth();

  const getAllBanners = async () => {
    try {
      setLoadingComponents(true);
      const data = await getAllMainBannersAction();
      setBanners(data);
      setTotalRegistros(data.length);
    } catch (error) {
      console.error("Error al obtener los banners:", error);
    } finally {
      setLoadingComponents(false);
    }
  };

  // const handleDelete = (id: string) => {
  //   const confirmar = window.confirm("¿Seguro que deseas eliminar este banner?");
  //   if (!confirmar) return;
  //   setBanners((prev) => prev.filter((item) => item.id !== id));
  //   setTotalRegistros((prev) => prev - 1);
  //   alert("Banner eliminado correctamente ✅");
  // };

  useEffect(() => {
    setTitle("Banners Principales");
    getAllBanners();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row lg:justify-end">
          {totalRegistros < 3 && (
            <button
              onClick={() => navigate("agregar")}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main/90 lg:w-fit"
            >
              Crear
            </button>
          )}
        </div>
      </div>

      {loadingComponents ? (
        <div className="text-center text-white">Cargando...</div>
      ) : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          {banners.length === 0 ? (
            <p className="text-center text-gray-400">No hay banners registrados.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {banners.map((banner) => (
                <div
                  className="overflow-hidden transition-transform bg-secondary-900 rounded-xl hover:scale-105"
                  key={banner.id}
                >
                  <div className="relative aspect-video">
                    <img
                      src={banner.imagen || "/placeholder-image.jpg"}
                      alt={banner.titulo}
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
                            to={`editar/${banner.id}`}
                            className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                          >
                            Editar
                          </Link>
                        </MenuItem>
                        {/* <MenuItem className="p-0 hover:bg-transparent">
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4 w-full text-left"
                          >
                            Eliminar
                          </button>
                        </MenuItem> */}
                      </Menu>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold text-white truncate">
                      {banner.titulo}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{banner.descripcion}</p>
                    <p className="mt-3 text-xs text-gray-500">Botón: {banner.textoBoton}</p>
                    <p className="mt-1 text-xs text-gray-500">Enlace: {banner.enlace}</p>
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
