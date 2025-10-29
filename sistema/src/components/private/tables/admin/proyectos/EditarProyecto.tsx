import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { getProjectByIdAction } from "./actions/getProjectByIdAction";

import type { ProyectoResponse } from "./interfaces/project.response";
import { updateProjectByIdAction } from "./actions/updateProjectByCategoryId.action";

const ProyectoSchema = Yup.object().shape({
  titulo: Yup.string(),
  imagen: Yup.mixed(),
});

export const EditarProyecto = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ProyectoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const data = await getProjectByIdAction(id);
        setInitialData(data);
      } catch (error) {
        console.error("Error al cargar proyecto:", error);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titulo: initialData?.titulo ?? "",
      imagen: null as File | null,
    },
    validationSchema: ProyectoSchema,
    onSubmit: async (values) => {
      if (!id) return;
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        if (file) formData.append("imagen", file);

        await updateProjectByIdAction(id, formData);

        navigate(-1);
      } catch (error) {
        console.error("Error al actualizar proyecto:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!initialData) {
    return <div className="p-8 bg-secondary-100 rounded-xl">Cargando proyecto...</div>;
  }

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <TitleBriefs titulo="Editar Proyecto" />

        {/* Campo de título */}
        <InputsBriefs
          name="titulo"
          type="text"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />

        {/* Campo de imagen con la imagen actual */}
        <ImageUploaderCustom
          file={file}
          setFile={(newFile) => {
            setFile(newFile);
            formik.setFieldValue("imagen", newFile);
          }}
          defaultImage={initialData.imagen} // 👈 muestra la imagen actual
        />
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
          value={loading ? "Guardando..." : "Guardar cambios"}
        />
      </div>
    </form>
  );
};
