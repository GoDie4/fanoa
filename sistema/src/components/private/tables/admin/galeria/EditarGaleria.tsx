import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import Swal from "sweetalert2";
import { updateGaleriaAction } from "./actions/updateGaleria.action";
import { getGaleriaById } from "./actions/getGaleriaById.action";

export const EditarGaleria = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      imagen1: null as File | null,
    },
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        if (!id) return;
        setLoading(true);

        const formData = new FormData();
        if (file) formData.append("imagen1", file);

        await updateGaleriaAction(id, formData);

        Swal.fire({
          icon: "success",
          title: "Galería actualizada",
          text: "La galería se actualizó correctamente.",
          confirmButtonColor: "#22c55e",
        });

        setFile(null);
        navigate(-1);
      } catch (error) {
        console.error("Error al actualizar la galería:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la galería. Intenta nuevamente.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchGaleria = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const galeria = await getGaleriaById(id);
        setPreviewImage(galeria.imagen1);
        formik.setFieldValue("imagen", null);
      } catch (error) {
        console.error("Error al cargar la galeria:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleria();
  }, [id]);

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <TitleBriefs titulo="Imagen" />

        {previewImage && !file && (
          <div className="mb-4">
            <p className="mb-2 text-white">Imagen actual:</p>
            <img src={previewImage} alt="Marca actual" className="w-full max-w-sm rounded-lg" />
          </div>
        )}

        <ImageUploaderCustom
          file={file}
          setFile={(newFile) => {
            setFile(newFile);
            formik.setFieldValue("imagen", newFile);
            setPreviewImage(""); // quitar preview antigua al seleccionar nueva
          }}
        />

        {previewImage && (
          <p className="mt-2 text-sm italic text-gray-300">
            Puedes reemplazar la imagen actual seleccionando una nueva.
          </p>
        )}

        {formik.errors.imagen1 && formik.touched.imagen1 && (
          <p className="text-red-500">{formik.errors.imagen1}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white bg-red-500 rounded-md"
        >
          Cancelar
        </button>
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
