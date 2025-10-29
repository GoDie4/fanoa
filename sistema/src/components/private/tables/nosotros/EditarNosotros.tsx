import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/Loading";
import { type ImagenState, nosotrosValuesModificate } from "../../../shared/Interfaces";
import Editor from "../../../shared/Editar";
import { ImageUpdate } from "../../../shared/ImageUpdate";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";
import { useFormik } from "formik";
import { SchemaNosotros } from "../../../shared/Schemas";
import { TitleBriefs } from "../../../shared/TitleBriefs";

export const EditarNosotros = (): JSX.Element => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");

  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();

  const [imagen1, setImagen1] = useState("");
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });

  const [boton1, setBoton1] = useState(false);
  const [url1, setUrl1] = useState("");

  const [imagen2, setImagen2] = useState("");
  const [imagenNueva2, setImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });

  const [boton2, setBoton2] = useState(false);
  const [url2, setUrl2] = useState("");

  const [imagen3, setImagen3] = useState("");
  const [imagenNueva3, setImagenNueva3] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });

  const [boton3, setBoton3] = useState(false);
  const [url3, setUrl3] = useState("");

  const [imagen4, setImagen4] = useState("");
  const [imagenNueva4, setImagenNueva4] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });

  const [boton4, setBoton4] = useState(false);
  const [url4, setUrl4] = useState("");
  useEffect(() => {
    setLoadingComponents(true);
    setTitle("Editar información");
    Promise.all([getProducto()]).then(() => {
      setLoadingComponents(false);
    });
  }, []);

  const updateProducto = async (values: nosotrosValuesModificate): Promise<void> => {
    setLoadingComponents(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("titulo1", values.titulo1);
    data.append("titulo2", values.titulo2);
    data.append("titulo3", values.titulo3);
    data.append("certificadoActivo", values.certificadoActivo);

    data.append("descripcion1", content);
    data.append("descripcion2", content2);
    data.append("descripcion3", content3);

    console.log(imagenNueva1.archivo);
    if (imagenNueva1.archivo != null) {
      data.append("imagen1", imagenNueva1.archivo);
    }

    if (imagenNueva2.archivo != null) {
      data.append("imagen2", imagenNueva2.archivo);
    }

    if (imagenNueva3.archivo != null) {
      data.append("imagen3", imagenNueva3.archivo);
    }

    if (imagenNueva4.archivo != null) {
      data.append("imagen4", imagenNueva4.archivo);
    }

    data.append("_method", "PUT");

    try {
      const respuesta = await axios.post(`${Global.url}/updateNosotros/${id ?? ""}}`, data, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== "" ? token : ""}`,
        },
      });

      if (respuesta.data.status == "success") {
        Swal.fire("Actualizado correctamente", "", "success");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } else {
        Swal.fire("Error ", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "", "error");
    }
    setLoadingComponents(false);
  };

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneNosotros/${id ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== "" ? `Bearer ${token}` : ""}`,
      },
    });

    setValues({
      ...values,
      titulo1: request.data.titulo1,
      titulo2: request.data.titulo2,
      titulo3: request.data.titulo3,
      certificadoActivo: request.data.certificadoActivo,
    });

    setImagen1(request.data.imagen1);
    setImagen2(request.data.imagen2);
    setImagen3(request.data.imagen3);
    setImagen4(request.data.imagen4);

    setContent(request.data.descripcion1);
    setContent2(request.data.descripcion2);
    setContent3(request.data.descripcion3);
  };

  const { handleSubmit, handleChange, errors, values, setValues, touched, handleBlur } = useFormik({
    initialValues: {
      titulo1: "",
      id: "",
      titulo2: "",
      titulo3: "",
      certificadoActivo: "",
    },
    validationSchema: SchemaNosotros,
    onSubmit: updateProducto,
  });
  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form className="bg-secondary-100 p-8 rounded-xl" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Fondo de interna
              <span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
              <ImageUpdate
                globalUrl="nosotros"
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                imagen={imagen1}
                setImagen={setImagenNueva1}
                clase="1"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-10 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Título de información
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <InputsBriefs
                name="titulo1"
                type="text"
                value={values.titulo1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo1} touched={touched.titulo1} />
            </div>
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Mostrar certificaciones" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="certificadoActivo"
                value={values.certificadoActivo}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                <option value={"Si"}>Si</option>
                <option value={"No"}>No</option>
              </select>
              <Errors errors={errors.certificadoActivo} touched={touched.certificadoActivo} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Información de empresa
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagen de empresa<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
              <ImageUpdate
                globalUrl="nosotros"
                url={url2}
                setUrl={setUrl2}
                boton={boton2}
                setBoton={setBoton2}
                imagen={imagen2}
                setImagen={setImagenNueva2}
                clase="2"
              />
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Título de misión
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <InputsBriefs
                    name="titulo2"
                    type="text"
                    value={values.titulo2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.titulo2} touched={touched.titulo2} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Información de misión
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <Editor content={content2} setContent={setContent2} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                  Imagen misión<span className="text-red-500">*</span>
                </p>
                <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
                  <ImageUpdate
                    globalUrl="nosotros"
                    url={url3}
                    setUrl={setUrl3}
                    boton={boton3}
                    setBoton={setBoton3}
                    imagen={imagen3}
                    setImagen={setImagenNueva3}
                    clase="3"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Título de visión
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <InputsBriefs
                    name="titulo3"
                    type="text"
                    value={values.titulo3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors errors={errors.titulo3} touched={touched.titulo3} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
                  Información de visión
                </p>
                <div className="flex-1 w-full md:w-3/4">
                  <Editor content={content3} setContent={setContent3} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
                <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                  Imagen visión<span className="text-red-500">*</span>
                </p>
                <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
                  <ImageUpdate
                    globalUrl="nosotros"
                    url={url4}
                    setUrl={setUrl4}
                    boton={boton4}
                    setBoton={setBoton4}
                    imagen={imagen4}
                    setImagen={setImagenNueva4}
                    clase="4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link to="/admin/imprenta" className="bg-red-500 px-4 py-2 rounded-md text-white">
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Actualizar"
            />
          </div>
        </form>
      )}
    </>
  );
};
