import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { createMarcaAction } from "./actions/createMarca.action";
import Swal from "sweetalert2";

// ✅ Validación del formulario
const MarcaSchema = Yup.object().shape({
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearMarcas = (): JSX.Element => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      imagen: null as File | null,
    },
    validationSchema: MarcaSchema,
    onSubmit: async (_, { resetForm }) => {
      try {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("imagen", file);

        await createMarcaAction(formData);

        Swal.fire({
          icon: "success",
          title: "Marca creada",
          text: "La marca se registró correctamente.",
          confirmButtonColor: "#22c55e",
        });

        resetForm();
        setFile(null);
        navigate(-1);
      } catch (error) {
        console.error("Error al crear la marca:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al crear la marca. Intenta nuevamente.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        <TitleBriefs titulo="Imagen de la Marca" />
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
          value={loading ? "Enviando..." : "Registrar"}
        />
      </div>
    </form>
  );
};
