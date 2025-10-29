import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/Loading";
import { useFormik } from "formik";
import { type ImagenState } from "../../../shared/Interfaces";
import { SchemaServicios } from "../../../shared/Schemas";
import { ImageUploader } from "../../../shared/ImageUploader";
import { TitleBriefs } from "../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";

export const CrearServicio = (): JSX.Element => {
  const navigate = useNavigate();
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();
  //   const [pdf, setPf] = useState<File | null>(null)
  //   const handleSetPdf = (pdfFile: File | null): void => {
  //     // Esta función se pasará como prop al componente PdfUploader
  //     setPdf(pdfFile)
  //   }

  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: "",
  });
  const [boton1, setBoton1] = useState(false);
  const [url1, setUrl1] = useState("");

  useEffect(() => {
    setTitle("Agregar galería");

    const data = new FormData();
    data.append("buscar", "");
    // Fetch existing categories to determine the number of categories
    const fetchCategories = async (): Promise<void> => {};

    fetchCategories();
  }, []);

  const saveNoticia = async (): Promise<void> => {
    setLoadingComponents(true);
    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("titulo", values.titulo);

    if (imagen1.archivo != null) {
      data.append("imagen1", imagen1.archivo);
    }
    try {
      const respuesta = await axios.post(`${Global.url}/saveServicio`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== "" ? token : ""
          }`,
        },
      });

      if (respuesta.data.status == "success") {
        Swal.fire("Agregado correctamente", "", "success");
        navigate("/admin/galeria");
      } else {
        Swal.fire("Error ", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "", "error");
    }
    setLoadingComponents(false);
  };

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        id: 0,
        categoria: "",
        titulo: "",
      },
      validationSchema: SchemaServicios,
      onSubmit: saveNoticia,
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
          <div className="flex flex-col justify-between w-full gap-2 mb-5 lg:relative ">
            <div className="flex flex-col justify-between w-full gap-2 mb-5 lg:relative lg:flex-row">
              <div className="w-full ">
                <TitleBriefs titulo="Nombre " />
                <InputsBriefs
                  name="titulo"
                  type="text"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.titulo} touched={touched.titulo} />
              </div>
            </div>
            <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
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

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/galeria"
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  );
};
