import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { createProjectByCategoryIdAction } from "./actions/createProjectByCategoryId.action";

const ProyectoSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearProyecto = (): JSX.Element => {
  const { id } = useParams();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      titulo: "",
      imagen: null as File | null,
    },
    validationSchema: ProyectoSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        if (!file) return;

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("imagen", file);
        formData.append("categoriaId", id || "");

        await createProjectByCategoryIdAction(formData);
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
          <TitleBriefs titulo="Título del Proyecto" />
          <InputsBriefs
            name="titulo"
            type="text"
            value={formik.values.titulo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />
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
        <Link to="/admin/proyectos" className="px-4 py-2 text-white bg-red-500 rounded-md">
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
