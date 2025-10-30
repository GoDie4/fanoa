import { RiArrowDownSLine, RiLogoutCircleRLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import icono from "./../../../assets/images/logos/icone.png";

const Header = (): JSX.Element => {
  const { user, setLoading, logout, title } = useAuth();
  const navigate = useNavigate();

  const cerrarSession = async (): Promise<void> => {
    setLoading(true);
    logout();
    navigate("/login");
    setLoading(false);
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-between">
      <div className="flex gap-3 md:gap-5">
        <p className="text-sm font-bold text-white md:text-xl">{title}</p>
      </div>
      <nav className="flex items-center gap-2">
        <Menu
          menuButton={
            <MenuButton className="flex items-center p-2 transition-colors rounded-lg gap-x-2 hover:bg-secondary-100">
              <img src={icono} className="object-contain w-6 h-6 rounded-full" />
              {/* <span>{user?.name}</span> */}
              <RiArrowDownSLine />
            </MenuButton>
          }
          align="end"
          arrow
          transition
          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/perfil"
              className="flex items-center flex-1 px-6 py-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
            >
              <img src={icono} className="object-contain w-8 h-8 rounded-full" />
              <div className="flex flex-col text-sm">
                {/* <span className="text-sm">{user?.name}</span> */}
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </Link>
          </MenuItem>

          <hr className="my-4 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to=""
              onClick={() => {
                void cerrarSession();
              }}
              className="flex items-center flex-1 px-6 py-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
            >
              <RiLogoutCircleRLine /> Cerrar sesión
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
