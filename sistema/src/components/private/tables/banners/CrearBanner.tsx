import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/Loading";
import { type ImagenState, bannersValuesModificate } from "../../../shared/Interfaces";
import { ImageUploader } from "../../../shared/ImageUploader";
import { TitleBriefs } from "../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";
import { useFormik } from "formik";
import { ScheamaBanner } from "../../../shared/Schemas";
import Editor from "../../../shared/Editar";

export const CrearBanner = (): JSX.Element => {
  const navigate = useNavigate();
  const { setTitle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });
  const [boton1, setBoton1] = useState(false);
  const [url1, setUrl1] = useState("");
  useEffect(() => {
    setTitle("Agregar banner");
  }, []);
  const [content, setContent] = useState("");

  const saveBanner = async (values: bannersValuesModificate): Promise<void> => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("titulo1", values.titulo1);
    data.append("titulo2", values.titulo2);
    data.append("text", values.text);
    data.append("descripcion", content);

    if (imagen1.archivo != null) {
      data.append("imagen1", imagen1.archivo);
    }
    try {
      const respuesta = await axios.post(`${Global.url}/saveBanner`, data, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== "" ? token : ""}`,
        },
      });

      if (respuesta.data.status == "success") {
        Swal.fire("Agregado correctamente", "", "success");
        navigate("/admin/banners");
      } else {
        Swal.fire("Error ", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "", "error");
    }
    setLoading(false);
  };

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } = useFormik({
    initialValues: {
      titulo1: "",
      titulo2: "",
      id: 0,
      imagen1: "",
      text: "",
    },
    validationSchema: ScheamaBanner,
    onSubmit: saveBanner,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form className="bg-secondary-100 p-8 rounded-xl" onSubmit={handleSubmit}>
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full ">
              <TitleBriefs titulo="Título 1" />
              <InputsBriefs
                name="titulo1"
                type="text"
                value={values.titulo1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo1} touched={touched.titulo1} />
            </div>
            <div className="w-full ">
              <TitleBriefs titulo="Título 2" />
              <InputsBriefs
                name="titulo2"
                type="text"
                value={values.titulo2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo2} touched={touched.titulo2} />
            </div>
            <div className="w-full ">
              <TitleBriefs titulo="Texto superior" />
              <InputsBriefs
                name="text"
                type="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.text} touched={touched.text} />
            </div>
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
              <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                Información
              </p>
              <div className="flex-1 w-full md:w-3/4">
                <Editor content={content} setContent={setContent} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Imagen<span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex  items-center gap-4">
              <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link to="/admin/banners" className="bg-red-500 px-4 py-2 rounded-md text-white">
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default CrearBanner;
