import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { getOneBannerSecundarioAction } from "./actions/getOneBannerSecundario.action";
import { updateBannerSecundarioAction } from "./actions/updateBannerSecundario.action";

export const EditarBannerSecundario = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      imagen: null as File | null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!id) return;
        setLoading(true);

        const formData = new FormData();
        if (file) formData.append("imagen", file);

        await updateBannerSecundarioAction(id, formData);
        navigate(-1);
      } catch (error) {
        console.error("Error al actualizar el banner secundario:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // 🔹 Cargar los datos al montar el componente
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const banner = await getOneBannerSecundarioAction(id);
        setPreviewImage(banner.imagen);
      } catch (error) {
        console.error("Error al obtener el banner secundario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id]);

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6 mb-6">
        <div className="w-full">
          <TitleBriefs titulo="Imagen del Banner Secundario" />

          {/* Imagen actual */}
          {previewImage && (
            <div className="mt-4 mb-4">
              <p className="text-white mb-2">Imagen actual:</p>
              <img
                src={previewImage}
                alt="Banner Secundario actual"
                className="w-full max-w-sm rounded-lg"
              />
            </div>
          )}

          {/* Subir nueva imagen */}
          <ImageUploaderCustom
            file={file}
            setFile={(newFile) => {
              setFile(newFile);
              formik.setFieldValue("imagen", newFile);
            }}
            defaultImage={previewImage}
          />

          {previewImage && (
            <p className="text-sm text-gray-300 mt-2 italic">
              Puedes reemplazar la imagen actual seleccionando una nueva.
            </p>
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
          value={loading ? "Actualizando..." : "Guardar Cambios"}
        />
      </div>
    </form>
  );
};
