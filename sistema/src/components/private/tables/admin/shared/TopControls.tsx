// src/components/shared/TopControls.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { MdOutlineArrowCircleDown } from "react-icons/md";
import "@szhsin/react-menu/dist/index.css";

import { getAllServicioCategoria } from "../../servicios-categoria/actions/getAllServiciosCategorias.action";
import type { ServicioCategoriaResponse } from "../../servicios-categoria/interfaces/servicio-cateogira.response";

interface TopControlsProps {
  onCategoriaChange: (categoriaId: string) => void;
  initialCategoriaId?: string;
}

export const TopControls = ({ onCategoriaChange, initialCategoriaId = "" }: TopControlsProps) => {
  const [categorias, setCategorias] = useState<ServicioCategoriaResponse[]>([]);
  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] =
    useState<string>(initialCategoriaId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getAllServicioCategoria();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const getLabel = (id: string) => {
    if (!id) return "Todos";
    const found = categorias.find((c) => c.id === id);
    return found ? found.titulo : "Categoría";
  };

  const handleSelect = (id: string) => {
    setCategoriaSeleccionadaId(id);
    onCategoriaChange(id);
  };

  return (
    <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4">
      <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row lg:justify-between">
        <Menu
          menuButton={
            <MenuButton className="px-4 py-2 text-white bg-secondary-100 rounded-lg hover:bg-secondary-800 transition flex items-center gap-x-2">
              <p>{getLabel(categoriaSeleccionadaId)}</p>
              <MdOutlineArrowCircleDown />
            </MenuButton>
          }
          transition
          menuClassName="bg-secondary-100 p-2 rounded-lg mt-2"
        >
          {/* Opción Todos */}
          <MenuItem
            onClick={() => handleSelect("")}
            className={`px-3 py-2 rounded-md cursor-pointer text-white ${
              categoriaSeleccionadaId === "" ? "bg-secondary-900" : "hover:bg-secondary-900/20"
            }`}
          >
            Todos
          </MenuItem>

          {/* Categorías reales */}
          {categorias.map((cat) => (
            <MenuItem
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`px-3 py-2 rounded-md cursor-pointer text-white ${
                categoriaSeleccionadaId === cat.id
                  ? "bg-secondary-900"
                  : "hover:bg-secondary-900/20"
              }`}
            >
              {cat.titulo}
            </MenuItem>
          ))}
        </Menu>

        <button
          onClick={() => {
            navigate(`agregar/${categoriaSeleccionadaId}`);
          }}
          disabled={!categoriaSeleccionadaId}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main/80 lg:w-fit disabled:bg-gray-700"
        >
          Crear Proyecto
        </button>
      </div>
    </div>
  );
};
