// src/components/private/tables/admin/trabajo/CrearTrabajo.tsx
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { createTrabajoByCategoryIdAction } from "./actions/createTrabajoByCategoryIdAction";

const TrabajoSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearTrabajo = (): JSX.Element => {
  const { id } = useParams(); // categoriaId
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      imagen: null as File | null,
    },
    validationSchema: TrabajoSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        if (!file) return;

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("descripcion", values.descripcion);
        formData.append("imagen", file);
        formData.append("categoriaId", id || "");

        await createTrabajoByCategoryIdAction(formData);

        resetForm();
        setFile(null);
        navigate(-1);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        {/* Campo de título */}
        <div className="w-full">
          <TitleBriefs titulo="Título del Trabajo" />
          <InputsBriefs
            name="titulo"
            type="text"
            value={formik.values.titulo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />
        </div>

        {/* Campo de descripción */}
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

        {/* Campo de imagen */}
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

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <Link to="/admin/trabajo" className="px-4 py-2 text-white bg-red-500 rounded-md">
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
