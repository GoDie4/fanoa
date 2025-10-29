import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { RiLockLine, RiEyeLine, RiEyeOffLine, RiUser3Line } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { bg, logo } from "../shared/Images";
import { Errors } from "../shared/Errors";
import { LoadingSmall } from "../shared/LoadingSmall";

const Schema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido").min(1),
});

interface Values {
  email: string;
  password: string;
}

export const Login = (): JSX.Element | undefined => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loged, setLoged] = useState("");
  const { login, loadingComponents, setLoadingComponents, authStatus } = useAuth();

  const validar = async (values: Values): Promise<void> => {
    setLoadingComponents(true);

    try {
      await login(values.email, values.password);

      navigate("/admin");
    } catch (error) {
      setLoged("noexiste");
    }
    setLoadingComponents(false);
  };

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: validar,
  });

  if (authStatus === "authenticated") return <Navigate to={"/admin"} />;

  return (
    <div className="flex flex-col-reverse items-center justify-between min-h-screen md:flex-row">
      <div className="flex flex-col justify-center w-screen h-screen p-8 shadow-2xl bg-secondary-100 md:px-20 lg:w-2/5">
        <a
          href="#"
          target="_blank"
          className="flex items-center justify-center w-full mb-8 text-gray-100 rounded-full"
          rel="noreferrer"
        >
          <img src={logo} className="object-contain w-full h-36" />
        </a>
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Iniciar <span className="text-main">sesión</span>
        </h1>
        <form className="mb-8 " onSubmit={handleSubmit}>
          <div className="relative flex flex-col w-full gap-2 ">
            <div className="relative w-full">
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg  border  ${
                  errors.email !== null &&
                  errors.email !== undefined &&
                  errors.email !== "" &&
                  touched.email !== null &&
                  touched.email !== undefined
                    ? " border-red-500"
                    : "border-transparent"
                }`}
                placeholder="Usuario"
              />
              <RiUser3Line className="absolute right-0 -translate-y-1/2 top-1/2 left-2 text-main" />
            </div>
            <Errors errors={errors.email} touched={touched.email} />
          </div>

          <div className="relative flex flex-col w-full gap-2 mt-3 mb-3">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className={`py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg  border  
                  ${
                    errors.password !== null &&
                    errors.password !== undefined &&
                    errors.password !== "" &&
                    touched.password !== null &&
                    touched.password !== undefined
                      ? " border-red-500"
                      : "border-transparent"
                  }`}
                placeholder="Contraseña"
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <RiEyeOffLine
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute -translate-y-1/2 top-1/2 right-2 hover:cursor-pointer text-main"
                />
              ) : (
                <RiEyeLine
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute -translate-y-1/2 top-1/2 right-2 hover:cursor-pointer text-main"
                  name="password"
                />
              )}
              <RiLockLine className="absolute right-0 -translate-y-1/2 top-1/2 left-2 text-main" />
            </div>
            <Errors errors={errors.password} touched={touched.password} />
          </div>

          <div className="mt-3 mb-8">
            {loged == "invalid" ? (
              <p className="text-main">Contraseña incorrecta</p>
            ) : loged == "noexiste" ? (
              <p className="text-main">El usuario no existe</p>
            ) : loged == "login" ? (
              <p className="text-green-500">Usuario identificado correctamente</p>
            ) : (
              ""
            )}
          </div>

          <div className="flex w-full">
            {loadingComponents ? (
              <div className="px-4 py-2 m-auto text-sm font-bold text-white uppercase rounded-lg bg-main w-80">
                <LoadingSmall />
              </div>
            ) : (
              <button
                type="submit"
                className="px-4 py-3 m-auto text-sm font-bold text-white uppercase rounded-lg bg-main w-80"
              >
                Ingresar
              </button>
            )}
          </div>
        </form>
        <div className="flex flex-col items-center gap-4">
          <Link to="/password" className="transition-colors hover:text-main">
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="transition-colors text-main hover:text-gray-100">
              Registrate
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden w-screen md:w-3/5 md:h-screen lg:block">
        <img src={bg} alt="" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};
