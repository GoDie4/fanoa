import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TitleBriefs } from "../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";

import { postServicioCategoria } from "./actions/postServicioCategoria.action";
import { ImageUploaderCustom } from "./components/ImageUploaderCustom";

const ServicioCategoriaSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  subtitulo: Yup.string().required("El subtítulo es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  miniTitulo: Yup.string().required("El título secundario es obligatorio"),
  miniDescripcion: Yup.string().required("La descripción secundaria es obligatoria"),
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearServicioCategoria = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      titulo: "",
      subtitulo: "",
      descripcion: "",
      miniTitulo: "",
      miniDescripcion: "",
      imagen: null as File | null,
    },
    validationSchema: ServicioCategoriaSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("subtitulo", values.subtitulo);
        formData.append("descripcion", values.descripcion);
        formData.append("miniTitulo", values.miniTitulo);
        formData.append("miniDescripcion", values.miniDescripcion);
        if (file) formData.append("imagen", file);

        await postServicioCategoria(formData);

        resetForm();
        setFile(null);
      } catch (error) {
        console.error("Error al enviar formulario:", error);
      } finally {
        setLoading(false);
        navigate(-1);
      }
    },
  });

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full">
            <TitleBriefs titulo="Título" />
            <InputsBriefs
              name="titulo"
              type="text"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />
          </div>

          <div className="w-full">
            <TitleBriefs titulo="Subtítulo" />
            <InputsBriefs
              name="subtitulo"
              type="text"
              value={formik.values.subtitulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Errors errors={formik.errors.subtitulo} touched={formik.touched.subtitulo} />
          </div>
        </div>

        <div className="w-full">
          <TitleBriefs titulo="Descripción" />
          <InputsBriefs
            name="descripcion"
            type="textarea"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.descripcion} touched={formik.touched.descripcion} />
        </div>

        <div className="w-full">
          <TitleBriefs titulo="Título secundario" />
          <InputsBriefs
            name="miniTitulo"
            type="text"
            value={formik.values.miniTitulo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.miniTitulo} touched={formik.touched.miniTitulo} />
        </div>

        <div className="w-full">
          <TitleBriefs titulo="Descripción secundaria" />
          <InputsBriefs
            name="miniDescripcion"
            type="textarea"
            value={formik.values.miniDescripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.miniDescripcion} touched={formik.touched.miniDescripcion} />
        </div>

        <ImageUploaderCustom
          file={file}
          setFile={(newFile) => {
            setFile(newFile);
            formik.setFieldValue("imagen", newFile);
          }}
        />
        {formik.errors.imagen && formik.touched.imagen && (
          <p className="text-red-500">{formik.errors.imagen}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Link
          to="/admin/servicios-categoria"
          className="px-4 py-2 text-white bg-red-500 rounded-md"
        >
          Cancelar
        </Link>
        <input
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
          value={loading ? "Enviando..." : "Registrar"}
        />
      </div>
    </form>
  );
};
