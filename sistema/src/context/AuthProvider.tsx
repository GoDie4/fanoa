import {
  useState,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { loginAction } from "../components/public/actions/login.action";
import { generateTokenAction } from "../components/public/actions/renew.action";

export interface User {
  id: string;
  nombre: string;
  email: string;
  contraseña: string;
  role: string;
}

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  user: User | null;
  authStatus: AuthStatus;
  // auth: typeof UserSchema;
  // setAuth: Dispatch<SetStateAction<typeof UserSchema>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  loadingComponents: boolean;
  setLoadingComponents: Dispatch<SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // const [auth, setAuth] = useState<typeof UserSchema>({
  //   id: "",
  //   name: "",
  //   email: "",
  //   idRol: null,
  // });
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [loadingComponents, setLoadingComponents] = useState(false);

  // useEffect(() => {
  //   authUser();
  // }, []);

  // const authUser = async (): Promise<false | undefined> => {
  //   // SACAR DATOS DEL USUARIO IDENTIFICADO DEL LOCALSTORAGE
  //   const token = localStorage.getItem("token");
  //   const user = localStorage.getItem("user");

  //   // COMPROBRAR SI TENGO EL TOKEN Y EL USER
  //   if (!token || !user) {
  //     setLoading(false);
  //     return false;
  //   }

  //   const respuesta = await axios.get(`${Global.url}/user-profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   // SETEAR LOS DATOS
  //   setAuth(respuesta.data.user);
  //   setLoading(false);
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      generateTokenAction().then((data) => {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setAuthStatus("authenticated");
      });
    } else {
      setAuthStatus("unauthenticated");
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthStatus("checking");

    try {
      const data = await loginAction(email, password);
      // console.log({ data });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setAuthStatus("authenticated");
      return true;
    } catch (error) {
      setUser(null);
      setAuthStatus("unauthenticated");
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthStatus("unauthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        // auth,
        // setAuth,
        user,
        authStatus,
        loading,
        setLoading,
        title,
        setTitle,
        loadingComponents,
        setLoadingComponents,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
