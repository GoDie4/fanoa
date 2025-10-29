import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { createBannerSecundarioAction } from "./actions/createBannerSecundario.action";

const BannerSecundarioSchema = Yup.object().shape({
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearBannerSecundario = (): JSX.Element => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      imagen: null as File | null,
    },
    validationSchema: BannerSecundarioSchema,
    onSubmit: async (_, { resetForm }) => {
      try {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("imagen", file);

        await createBannerSecundarioAction(formData);

        resetForm();
        setFile(null);
        navigate(-1);
      } catch (error) {
        console.error("Error al crear el banner secundario:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <div className="w-full">
          <TitleBriefs titulo="Imagen del Banner Secundario" />
          <ImageUploaderCustom
            file={file}
            setFile={(newFile) => {
              setFile(newFile);
              formik.setFieldValue("imagen", newFile);
            }}
          />
          {formik.errors.imagen && formik.touched.imagen && (
            <Errors errors={formik.errors.imagen} touched={formik.touched.imagen} />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Link to="/admin/banner-secundario" className="px-4 py-2 text-white bg-red-500 rounded-md">
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
