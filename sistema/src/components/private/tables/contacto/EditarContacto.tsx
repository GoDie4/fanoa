import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/Loading";
import { useFormik } from "formik";
import { SchemaConfiguracion } from "../../../shared/Schemas";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";
import { TitleBriefs } from "../../../shared/TitleBriefs";
import Numeros, { type NumerosItem } from "./components/Numeros";
import Correos, { type CorreosItem } from "./components/Correos";

export const EditarContacto = (): JSX.Element => {
  const token = localStorage.getItem("token");
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();

  useEffect(() => {
    setTitle("CONTACTO");
    getBanner();
  }, []);
  const [numeros, setNumeros] = useState<NumerosItem[]>([
    {
      numero: "",
      position: 1,
    },
  ]);

  const [correos, setCorreos] = useState<CorreosItem[]>([
    {
      correo: "",
      position: 1,
      descripcion: "",
    },
  ]);
  const upadateBanner = async (): Promise<void> => {
    if (correos.length < 1 || numeros.length < 1) {
      Swal.fire(
        "Correos o números al menos debe tener 1 registro",
        "",
        "error"
      );
      setLoadingComponents(false);
      return;
    }

    if (correos[0].correo === "" || correos[0].correo === null) {
      Swal.fire("El correo no puede estar vacío", "", "error");
      setLoadingComponents(false);
      return;
    }

    if (numeros[0].numero === "" || numeros[0].numero === null) {
      Swal.fire("El número no puede estar vacío", "", "error");
      setLoadingComponents(false);
      return;
    }
    setLoadingComponents(true);
    const data = {
      correos,
      numeros,
      direccion1: values.direccion1,
      direccion2: values.direccion2,
      direccion3: values.direccion3,
      horario: values.horario,
      facebook: values.facebook,
      instagram: values.instagram,
      twiter: values.twiter,
      linkedin: values.linkedin,
      tiktok: values.tiktok,
      youtube: values.youtube,
      whatsapp: values.whatsapp,
    };

    try {
      const respuesta = await axios.put(
        `${Global.url}/configuracion/updateConfiguracion/1`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== "" ? token : ""
            }`,
          },
        }
      );

      if (respuesta.data.status == "success") {
        Swal.fire("Actualizado correctamente", "", "success");
      } else {
        Swal.fire("Error al realizar la edicion", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "", "error");
    }
    setLoadingComponents(false);
  };

  const getBanner = async (): Promise<void> => {
    setLoadingComponents(true);
    const request = await axios.get(`${Global.url}/configuracion/oneConfi/1`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== "" ? `Bearer ${token}` : ""
        }`,
      },
    });
    console.log(request.data)
    setValues({
      ...values,
      direccion1: request.data.direccion1,
      direccion2: request.data.direccion2,
      direccion3: request.data.direccion3,
      horario: request.data.horario,
      facebook: request.data.facebook,
      instagram: request.data.instagram,
      twiter: request.data.twiter,
      linkedin: request.data.linkedin,
      youtube: request.data.youtube,
      whatsapp: request.data.whatsapp,
    });
    setCorreos(
      request.data.correos.map(
        (correo: any, i: number) => ({
          correo: correo.correo || "",
          descripcion: correo.descripcion || "",
          position: i + 1,
        })
      )
    );
    setNumeros(request.data.numeros);
    setLoadingComponents(false);
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      direccion1: "",
      direccion2: "",
      direccion3: "",
      horario: "",
      facebook: "",
      instagram: "",
      twiter: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
      whatsapp: "",
    },
    validationSchema: SchemaConfiguracion,
    onSubmit: upadateBanner,
  });

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="p-8 bg-secondary-100 rounded-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-10 text-2xl font-bold text-center text-main">
            Datos de Contacto
          </h2>
          <section className="flex flex-col w-full gap-2">
            <Numeros numeros={numeros} setNumeros={setNumeros} />
          </section>

          <section className="flex flex-col w-full gap-2">
            <Correos correos={correos} setCorreos={setCorreos} />
          </section>

          <section className="flex flex-col w-full gap-2">
            <div className="w-full">
              <TitleBriefs titulo="Dirección" />
              <InputsBriefs
                name="direccion1"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.direccion1}
              />
              <Errors errors={errors.direccion1} touched={touched.direccion1} />
            </div>
          </section>

          <section className="flex flex-col w-full gap-2 mt-4">
            <div className="w-full">
              <TitleBriefs titulo="Horario" />
              <InputsBriefs
                name="horario"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.horario}
              />
              <Errors errors={errors.horario} touched={touched.horario} />
            </div>
          </section>

          <h2 className="mb-10 text-2xl font-bold text-center text-main">
            Url Redes
          </h2>
          <div className="w-full mb-5 lg:relative">
            <TitleBriefs titulo="Facebook" />
            <InputsBriefs
              name="facebook"
              type="text"
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.facebook} touched={touched.facebook} />
          </div>
          <div className="w-full mb-5 lg:relative">
            <TitleBriefs titulo="Instagram" />
            <InputsBriefs
              name="instagram"
              type="text"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.instagram} touched={touched.instagram} />
          </div>

          <div className="w-full mb-5 lg:relative">
            <TitleBriefs titulo="Tiktok" />
            <InputsBriefs
              name="tiktok"
              type="text"
              value={values.tiktok}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.tiktok} touched={touched.tiktok} />
          </div>

          <div className="w-full mb-5 lg:relative">
            <TitleBriefs titulo="Youtube" />
            <InputsBriefs
              name="youtube"
              type="text"
              value={values.youtube}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.youtube} touched={touched.youtube} />
          </div>

          <div className="w-full mb-5 lg:relative">
            <TitleBriefs titulo="Whatsapp" />
            <InputsBriefs
              name="whatsapp"
              type="text"
              value={values.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.whatsapp} touched={touched.whatsapp} />
          </div>

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />

            <input
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
              value="Actualizar"
            />
          </div>
        </form>
      )}
    </>
  );
};
