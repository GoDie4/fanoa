// src/components/private/tables/admin/trabajo/EditarTrabajo.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFormik } from "formik";

import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { TrabajoResponse } from "./interface/trabajo.interface";
import { getTrabajoByIdAction } from "./actions/getTrabajoByIdAction";
import { updateTrabajoByIdAction } from "./actions/updateTrabajoByIdAction";

export const EditarTrabajo = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<TrabajoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const data = await getTrabajoByIdAction(id);
        setInitialData(data);
      } catch (error) {
        console.error("Error al cargar trabajo:", error);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titulo: initialData?.titulo ?? "",
      descripcion: initialData?.descripcion ?? "",
      imagen: null as File | null,
    },
    onSubmit: async (values) => {
      console.log(values.descripcion);
      if (!id) return;
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("descripcion", values.descripcion);
        if (file) formData.append("imagen", file);

        await updateTrabajoByIdAction(id, formData);

        navigate(-1);
      } catch (error) {
        console.error("Error al actualizar trabajo:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!initialData) {
    return <div className="p-8 bg-secondary-100 rounded-xl">Cargando trabajo...</div>;
  }

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <TitleBriefs titulo="Editar Trabajo" />

        {/* Campo de título */}
        <InputsBriefs
          name="titulo"
          type="text"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />

        {/* Campo de descripción */}
        <InputsBriefs
          name="descripcion"
          type="textarea"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Errors errors={formik.errors.descripcion} touched={formik.touched.descripcion} />

        {/* Campo de imagen con la imagen actual */}
        <ImageUploaderCustom
          file={file}
          setFile={(newFile) => {
            setFile(newFile);
            formik.setFieldValue("imagen", newFile);
          }}
          defaultImage={initialData.imagen}
        />
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
          value={loading ? "Guardando..." : "Guardar cambios"}
        />
      </div>
    </form>
  );
};
