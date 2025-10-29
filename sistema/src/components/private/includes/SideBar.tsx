import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// Icons
import { RiLogoutCircleRLine, RiMenu3Line, RiCloseLine, RiStackFill } from "react-icons/ri";

import { logo_white } from "../../shared/Images";

const SideBar = (): JSX.Element => {
  const { logout, setLoading } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const cerrarSession = async (): Promise<void> => {
    setLoading(true);
    logout();
    navigate("/login");
    setLoading(false);
  };

  return (
    <>
      <div
        className={`fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-primary shadow-xl p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <h1 className="mt-5 mb-5 text-2xl font-bold text-center text-black">
            <img src={logo_white} alt="" className="w-32 m-auto" />
          </h1>
          <hr className="mb-5" />
          <ul className="p-0 ml-0">
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="galeria"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Galería
              </Link>
            </li>

            <li>
              <Link
                to="contacto/1"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Contacto
              </Link>
            </li>
            <li>
              <Link
                to="banner-principal"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Banner Principal
              </Link>
            </li>
            <li>
              <Link
                to="servicios-categoria"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Servicio Categoria
              </Link>
            </li>
            <li>
              <Link
                to="servicios-adicional"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Servicio Adicional
              </Link>
            </li>
            <li>
              <Link
                to="trabajo"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Pasos de Trabajo
              </Link>
            </li>
            <li>
              <Link
                to="proyectos"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Proyectos
              </Link>
            </li>
            <li>
              <Link
                to="editables"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Editables
              </Link>
            </li>
            <li>
              <Link
                to="marcas"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Marcas
              </Link>
            </li>
            <li>
              <Link
                to="banner-secundario"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Banner Secundario
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <Link
            to={""}
            onClick={() => {
              void cerrarSession();
            }}
            className="flex items-center gap-4 px-4 py-2 transition-colors rounded-lg hover:bg-main_2-100 text-main hover:text-main"
          >
            <RiLogoutCircleRLine className="text-main " /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        className="fixed z-50 p-3 text-white rounded-full xl:hidden bottom-4 right-4 bg-main"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default SideBar;
