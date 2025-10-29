import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { TitleBriefs } from "../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";
import { ImageUploaderCustom } from "./components/ImageUploaderCustom";

import type { ServicioCategoriaResponse } from "./interfaces/servicio-cateogira.response";
import { getServicioCategoriaById } from "./actions/getServicioCategoriaById.action";
import { updateServicioCategoria } from "./actions/updateServicioCategoria.action";

export const EditarServicioCategoria = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ServicioCategoriaResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const data = await getServicioCategoriaById(id);
        setInitialData(data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titulo: initialData?.titulo ?? "",
      subtitulo: initialData?.subtitulo ?? "",
      descripcion: initialData?.descripcion ?? "",
      miniTitulo: initialData?.miniTitulo ?? "",
      miniDescripcion: initialData?.miniDescripcion ?? "",
      imagen: null as File | null,
    },
    onSubmit: async (values, { resetForm }) => {
      if (!id) return;
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("subtitulo", values.subtitulo);
        formData.append("descripcion", values.descripcion);
        formData.append("miniTitulo", values.miniTitulo);
        formData.append("miniDescripcion", values.miniDescripcion);

        if (file) {
          formData.append("imagen", file);
        }

        await updateServicioCategoria(id, formData);

        resetForm();
        setFile(null);
        navigate("/admin/servicios-categoria");
      } catch (error) {
        console.error("Error al editar servicio categoría:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!initialData) {
    return <div className="p-8 bg-secondary-100 rounded-xl">Cargando datos...</div>;
  }

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

        {/* ✅ Ahora sí incluye la imagen actual */}
        <ImageUploaderCustom
          file={file}
          setFile={(newFile) => {
            setFile(newFile);
            formik.setFieldValue("imagen", newFile);
          }}
          defaultImage={initialData.imagen}
        />
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
          value={loading ? "Guardando..." : "Actualizar"}
        />
      </div>
    </form>
  );
};
