import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { ImageUploaderCustom } from "../../servicios-categoria/components/ImageUploaderCustom";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { MdOutlineArrowCircleDown } from "react-icons/md";
import "@szhsin/react-menu/dist/index.css";
import { createMainBannersAction } from "./actions/createMainBanner.action";

// ✅ Validación del formulario
const ProyectoSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  enlace: Yup.string().required("El enlace es obligatorio"),
  textoBoton: Yup.string()
    .max(25, "Máximo 25 caracteres")
    .required("El texto del botón es obligatorio"),
  imagen: Yup.mixed().required("La imagen es obligatoria"),
});

export const CrearBannerPrincipal = (): JSX.Element => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tipoEnlace, setTipoEnlace] = useState<"URL" | "ENLACE" | "">("");

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      enlace: "",
      textoBoton: "",
      imagen: null as File | null,
    },
    validationSchema: ProyectoSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        if (!file) return;

        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("descripcion", values.descripcion);
        formData.append("enlace", values.enlace);
        formData.append("textoBoton", values.textoBoton);
        formData.append("imagen", file);

        await createMainBannersAction(formData);

        resetForm();
        setFile(null);
        setTipoEnlace("");
        navigate(-1);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // 🔹 Opciones internas para el dropdown
  const enlacesFijos = [
    { label: "Nosotros", value: "/nosotros" },
    { label: "Galería", value: "/galeria" },
    { label: "Contacto", value: "/contacto" },
  ];

  return (
    <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 mb-5">
        {/* Campo de título */}
        <div className="w-full">
          <TitleBriefs titulo="Título del Banner" />
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

        {/* Selección del tipo de enlace */}
        <div className="w-full">
          <TitleBriefs titulo="Tipo de Enlace" />
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="tipoEnlace"
                value="URL"
                checked={tipoEnlace === "URL"}
                onChange={() => {
                  setTipoEnlace("URL");
                  formik.setFieldValue("enlace", "");
                }}
              />
              URL
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="tipoEnlace"
                value="ENLACE"
                checked={tipoEnlace === "ENLACE"}
                onChange={() => {
                  setTipoEnlace("ENLACE");
                  formik.setFieldValue("enlace", "");
                }}
              />
              ENLACE
            </label>
          </div>
        </div>

        {/* Si es URL */}
        {tipoEnlace === "URL" && (
          <div className="w-full">
            <TitleBriefs titulo="Ingresa la URL" />
            <InputsBriefs
              name="enlace"
              type="text"
              value={formik.values.enlace}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Errors errors={formik.errors.enlace} touched={formik.touched.enlace} />
          </div>
        )}

        {/* Si es ENLACE */}
        {tipoEnlace === "ENLACE" && (
          <div className="w-full">
            <TitleBriefs titulo="Selecciona un Enlace Interno" />
            <Menu
              menuButton={
                <MenuButton className="flex items-center justify-between w-full px-4 py-2 text-white transition-colors rounded-lg bg-secondary-900 hover:bg-secondary-800 mt-2">
                  <span>
                    {formik.values.enlace
                      ? enlacesFijos.find((e) => e.value === formik.values.enlace)?.label
                      : "Seleccionar"}
                  </span>
                  <MdOutlineArrowCircleDown />
                </MenuButton>
              }
              transition
              menuClassName="bg-secondary-100 p-2 rounded-lg mt-2 w-full"
            >
              {enlacesFijos.map((op) => (
                <MenuItem
                  key={op.value}
                  onClick={() => formik.setFieldValue("enlace", op.value)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-white ${
                    formik.values.enlace === op.value
                      ? "bg-secondary-900"
                      : "hover:bg-secondary-900/20"
                  }`}
                >
                  {op.label}
                </MenuItem>
              ))}
            </Menu>
            <Errors errors={formik.errors.enlace} touched={formik.touched.enlace} />
          </div>
        )}

        {/* Campo texto del botón */}
        <div className="w-full">
          <TitleBriefs titulo="Texto del Botón (máx. 25 caracteres)" />
          <InputsBriefs
            name="textoBoton"
            type="text"
            value={formik.values.textoBoton}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Errors errors={formik.errors.textoBoton} touched={formik.touched.textoBoton} />
        </div>

        {/* Imagen */}
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
        <Link to="/admin/banner-principal" className="px-4 py-2 text-white bg-red-500 rounded-md">
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
