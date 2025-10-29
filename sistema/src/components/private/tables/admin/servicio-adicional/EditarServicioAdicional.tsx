import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { ProyectoResponse } from "../proyectos/interfaces/project.response";
import { getServicioAdicionalByIdAction } from "./actions/getServicioAdicionalById.action";
import { updateServicioAdicionalByIdAction } from "./actions/updateServicioAdicionalById.action";

const ServicioAdicionalSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  imagen: Yup.mixed().nullable(),
});

export const EditarServicioAdicional = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ProyectoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const data = await getServicioAdicionalByIdAction(id);
        setInitialData(data);
      } catch (error) {
        console.error("Error al cargar servicio adicional:", error);
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
    validationSchema: ServicioAdicionalSchema,
    onSubmit: async (values) => {
      if (!id) return;
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        if (file) formData.append("imagen", file);

        await updateServicioAdicionalByIdAction(id, formData);

        navigate(-1);
      } catch (error) {
        console.error("Error al actualizar servicio adicional:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!initialData) {
    return <div className="p-8 bg-secondary-100 rounded-xl">Cargando servicio adicional...</div>;
  }

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <TitleBriefs titulo="Editar Servicio Adicional" />

        {/* Campo de título */}
        <InputsBriefs
          name="titulo"
          type="text"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />

        {/* Imagen actual */}
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
        <Link
          to="/admin/servicios-adicional"
          className="px-4 py-2 text-white bg-red-500 rounded-md"
        >
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
