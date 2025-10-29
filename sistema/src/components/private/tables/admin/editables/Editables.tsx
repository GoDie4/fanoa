import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";

import { getSeccionContactoAction } from "./actions/getSeccionContacto.action";
import { createSeccionContactoAction } from "./actions/createSeccionContacto.action";
import { updateSeccionContactoAction } from "./actions/updateSeccionContacto.action";

import { getServicioEditableAction } from "./actions/getServicioEditable.action";
import { createServicioEditableAction } from "./actions/createServicioEditable.action";
import { updateServicioEditableAction } from "./actions/updateServicioEditable.action";

// --- VALIDACIONES ---
const ContactoSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

const ServicioSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string()
    .max(130, "La descripción no puede exceder 130 caracteres")
    .required("La descripción es obligatoria"),
  componente1: Yup.string().required("El componente 1 es obligatorio"),
  componente2: Yup.string().required("El componente 2 es obligatorio"),
  componente3: Yup.string().required("El componente 3 es obligatorio"),
  componente4: Yup.string().required("El componente 4 es obligatorio"),
});

export const Editables = (): JSX.Element => {
  // --- ESTADOS ---
  const [contactoId, setContactoId] = useState<string | null>(null);
  const [servicioId, setServicioId] = useState<string | null>(null);

  // --- FORMULARIO CONTACTO ---
  const contactoFormik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
    },
    validationSchema: ContactoSchema,
    onSubmit: async (values) => {
      // console.log({ values });
      try {
        if (contactoId) {
          await updateSeccionContactoAction(contactoId, values);
          Swal.fire({
            icon: "success",
            title: "Contacto actualizado",
            text: "Los datos del contacto se actualizaron correctamente.",
            confirmButtonColor: "#22c55e",
          });
        } else {
          const nuevo = await createSeccionContactoAction(values);
          setContactoId(nuevo.id);
          Swal.fire({
            icon: "success",
            title: "Contacto creado",
            text: "El nuevo contacto se guardó correctamente.",
            confirmButtonColor: "#22c55e",
          });
        }
      } catch (error) {
        console.error("Error en Contacto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar el contacto. Intenta nuevamente.",
          confirmButtonColor: "#ef4444",
        });
      }
    },
  });

  // --- FORMULARIO SERVICIO ---
  const servicioFormik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      componente1: "",
      componente2: "",
      componente3: "",
      componente4: "",
    },
    validationSchema: Yup.lazy(() =>
      servicioId
        ? // Si hay servicioId (actualizando)
          Yup.object().shape({
            titulo: Yup.string(),
            descripcion: Yup.string().max(210, "Máximo 210 caracteres"),
            componente1: Yup.string(),
            componente2: Yup.string(),
            componente3: Yup.string(),
            componente4: Yup.string(),
          })
        : // Si NO hay servicioId (creando)
          Yup.object().shape({
            titulo: Yup.string().required("El título es obligatorio"),
            descripcion: Yup.string()
              .max(210, "La descripción no puede exceder 210 caracteres")
              .required("La descripción es obligatoria"),
            componente1: Yup.string().required("El componente 1 es obligatorio"),
            componente2: Yup.string().required("El componente 2 es obligatorio"),
            componente3: Yup.string().required("El componente 3 es obligatorio"),
            componente4: Yup.string().required("El componente 4 es obligatorio"),
          })
    ),
    onSubmit: async (values) => {
      try {
        if (servicioId) {
          await updateServicioEditableAction(servicioId, values);
          Swal.fire({
            icon: "success",
            title: "Servicio actualizado",
            text: "Los datos del servicio se actualizaron correctamente.",
            confirmButtonColor: "#22c55e",
          });
        } else {
          const nuevo = await createServicioEditableAction(values);
          setServicioId(nuevo.id);
          Swal.fire({
            icon: "success",
            title: "Servicio creado",
            text: "El nuevo servicio se guardó correctamente.",
            confirmButtonColor: "#22c55e",
          });
        }
      } catch (error) {
        console.error("Error en Servicio Editable:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los datos del servicio. Intenta nuevamente.",
          confirmButtonColor: "#ef4444",
        });
      }
    },
  });

  // --- CARGA INICIAL ---
  useEffect(() => {
    const loadData = async () => {
      const contacto = await getSeccionContactoAction();
      if (contacto) {
        setContactoId(contacto.id);
        contactoFormik.setValues(contacto);
      }

      const servicio = await getServicioEditableAction();
      if (servicio) {
        setServicioId(servicio.id);
        servicioFormik.setValues(servicio);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* --- FORMULARIO CONTACTO --- */}
      <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={contactoFormik.handleSubmit}>
        <TitleBriefs titulo="Contacto" />

        <div className="flex flex-col gap-4 mb-5 mt-10">
          <label className="font-medium text-white">Título del contacto</label>
          <InputsBriefs
            name="titulo"
            type="text"
            value={contactoFormik.values.titulo}
            onChange={contactoFormik.handleChange}
            onBlur={contactoFormik.handleBlur}
          />
          <Errors errors={contactoFormik.errors.titulo} touched={contactoFormik.touched.titulo} />

          <label className="font-medium text-white">Descripción del contacto</label>
          <InputsBriefs
            name="descripcion"
            type="textarea"
            value={contactoFormik.values.descripcion}
            onChange={contactoFormik.handleChange}
            onBlur={contactoFormik.handleBlur}
          />
          <Errors
            errors={contactoFormik.errors.descripcion}
            touched={contactoFormik.touched.descripcion}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-black bg-green-500 rounded-lg hover:bg-green-600"
          >
            Guardar contacto
          </button>
        </div>
      </form>

      {/* --- FORMULARIO SERVICIO --- */}
      <form className="p-8 bg-secondary-100 rounded-xl" onSubmit={servicioFormik.handleSubmit}>
        <TitleBriefs titulo="Servicio Editable" />

        <div className="flex flex-col gap-4 mb-5 mt-10">
          <label className="font-medium text-white">Título del servicio</label>
          <InputsBriefs
            name="titulo"
            type="text"
            value={servicioFormik.values.titulo}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors errors={servicioFormik.errors.titulo} touched={servicioFormik.touched.titulo} />

          <label className="font-medium text-white">Descripción</label>
          <InputsBriefs
            name="descripcion"
            type="textarea"
            rows={2}
            value={servicioFormik.values.descripcion}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors
            errors={servicioFormik.errors.descripcion}
            touched={servicioFormik.touched.descripcion}
          />

          <label className="font-medium text-white">Componente 1</label>
          <InputsBriefs
            name="componente1"
            type="text"
            value={servicioFormik.values.componente1}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors
            errors={servicioFormik.errors.componente1}
            touched={servicioFormik.touched.componente1}
          />

          <label className="font-medium text-white">Componente 2</label>
          <InputsBriefs
            name="componente2"
            type="text"
            value={servicioFormik.values.componente2}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors
            errors={servicioFormik.errors.componente2}
            touched={servicioFormik.touched.componente2}
          />

          <label className="font-medium text-white">Componente 3</label>
          <InputsBriefs
            name="componente3"
            type="text"
            value={servicioFormik.values.componente3}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors
            errors={servicioFormik.errors.componente3}
            touched={servicioFormik.touched.componente3}
          />

          <label className="font-medium text-white">Componente 4</label>
          <InputsBriefs
            name="componente4"
            type="text"
            value={servicioFormik.values.componente4}
            onChange={servicioFormik.handleChange}
            onBlur={servicioFormik.handleBlur}
          />
          <Errors
            errors={servicioFormik.errors.componente4}
            touched={servicioFormik.touched.componente4}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-black bg-green-500 rounded-lg hover:bg-green-600"
          >
            Guardar servicio
          </button>
        </div>
      </form>
    </div>
  );
};
