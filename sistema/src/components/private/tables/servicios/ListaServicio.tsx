import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import { RiFilter2Fill } from "react-icons/ri";
import { Loading } from "../../../shared/Loading";
import { Paginacion } from "../../../shared/Paginacion";
import { DeleteItems } from "../../../shared/DeleteItems";
import { LoadingSmall } from "../../../shared/LoadingSmall";
import { type serviciosValues } from "../../../shared/Interfaces";

export const ListaServicio = (): JSX.Element => {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setpaginaActual] = useState(1);
  const [search, setSearch] = useState("");
  const [cantidadRegistros] = useState(8);

  const navigate = useNavigate();

  const getAllProductos = async (): Promise<void> => {
    setLoadingComponents(true);
    const data = new FormData();
    data.append("buscar", search);
    const request = await axios.post(`${Global.url}/getServicios`, data, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== "" ? token : ""}`,
      },
    });
    setProductos(request.data);
    setTotalRegistros(request.data.length);
    setLoadingComponents(false);
  };

  const indexOfLastPost = paginaActual * cantidadRegistros;
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros;
  const totalPosts = productos.length;

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost);
  };

  const onSeachChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    setpaginaActual(1);
    setSearch(target.value);
  };

  const preguntar = (id: number): void => {
    DeleteItems({
      ruta: "deleteServicio",
      id,
      token,
      getData: getAllProductos,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual,
    });
  };

  useEffect(() => {
    setTitle("Galería");
    getAllProductos();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4 ">
        <div>{/* <h1 className="text-xl font-bold text-gray-100">Lista de Productos</h1> */}</div>
        <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row">
          <button className="flex items-center w-full gap-2 px-4 py-2 transition-colors rounded-lg bg-secondary-100/50 hover:bg-secondary-100 md:w-fit hover:text-white">
            <RiFilter2Fill />
            <input
              placeholder="Buscar ..."
              className="bg-transparent outline-none"
              value={search}
              onChange={onSeachChange}
              type="search"
            />
            <button
              className="h-full px-3 py-1 text-white rounded-lg bg-main"
              onClick={() => {
                !loadingComponents && getAllProductos();
              }}
            >
              {!loadingComponents ? (
                "Buscar"
              ) : (
                <div>
                  <LoadingSmall />
                </div>
              )}
            </button>
          </button>
          <button
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main lg:w-fit"
            onClick={() => {
              navigate("agregar");
            }}
          >
            Crear
          </button>
        </div>
      </div>
      {loadingComponents ? (
        <Loading />
      ) : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterDate().map((pro: serviciosValues) => (
              <div
                className="overflow-hidden transition-transform bg-secondary-900 rounded-xl hover:scale-105"
                key={pro.id}
              >
                <div className="relative aspect-video">
                  <img
                    src={`${Global.urlImages}/galeria/${pro.imagen1}` || "/placeholder-image.jpg"}
                    alt={pro.titulo}
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
                          to={`editar/${pro.id}`}
                          className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                        >
                          Editar
                        </Link>
                      </MenuItem>
                      <MenuItem className="p-0 hover:bg-transparent">
                        <Link
                          to=""
                          onClick={() => {
                            preguntar(pro.id);
                          }}
                          className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                        >
                          Eliminar
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white truncate">{pro.titulo}</h3>

                  <p className="mt-2 text-xs text-gray-500">ID: #{pro.id}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5 mt-8 md:flex-row md:gap-0 content_buttons ">
            <p className="ml-1 text-md"> {totalRegistros} Registros </p>
            <Paginacion
              totalPosts={totalPosts}
              cantidadRegistros={cantidadRegistros}
              paginaActual={paginaActual}
              setpaginaActual={setpaginaActual}
            />
          </div>
        </div>
      )}
    </>
  );
};
