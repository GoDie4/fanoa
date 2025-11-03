import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TitleBriefs } from "../../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../../shared/InputsBriefs";
import { Errors } from "../../../../shared/Errors";
import { updatePoliticaAction } from "./actions/updatePolitica.action";
import { createPoliticaAction } from "./actions/createPolitica.action";
import { getPoliticasAction } from "./actions/getPoliticas.action";

const PoliticaSchema = Yup.object().shape({
  titulo: Yup.string().required("El título es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

export const EditablesPoliticas = (): JSX.Element => {
  const [, setPoliticas] = useState<any[]>([]);
  const quillRefs = useRef<(ReactQuill & { editor?: any })[]>([]);

  const autoResize = (index: number) => {
    const editor = quillRefs.current[index]?.editor;
    if (editor) {
      const scrollHeight = editor.root.scrollHeight;
      editor.root.style.height = scrollHeight + "px";
    }
  };

  const formiks = Array.from({ length: 11 }).map((_, i) =>
    useFormik({
      initialValues: {
        id: "",
        titulo: "",
        descripcion: "",
      },
      validationSchema: PoliticaSchema,
      onSubmit: async (values) => {
        try {
          if (values.id) {
            await updatePoliticaAction(values.id, {
              titulo: values.titulo,
              descripcion: values.descripcion,
            });
            Swal.fire({
              icon: "success",
              title: `Política ${i + 1} actualizada`,
              confirmButtonColor: "#22c55e",
            });
          } else {
            const nueva = await createPoliticaAction({
              titulo: values.titulo,
              descripcion: values.descripcion,
            });
            formiks[i].setFieldValue("id", nueva.id);
            Swal.fire({
              icon: "success",
              title: `Política ${i + 1} creada`,
              confirmButtonColor: "#22c55e",
            });
          }
        } catch (error) {
          console.error("Error en Política:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al guardar la política.",
            confirmButtonColor: "#ef4444",
          });
        }
      },
    })
  );

  useEffect(() => {
    const loadPoliticas = async () => {
      const data = await getPoliticasAction();
      if (data && data.length > 0) {
        data.forEach((p: any, index: number) => {
          if (formiks[index]) {
            formiks[index].setValues({
              id: p.id,
              titulo: p.titulo,
              descripcion: p.descripcion,
            });
          }
        });
        setPoliticas(data);
      }
    };
    loadPoliticas();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {formiks.map((formik, index) => (
        <form
          key={index}
          className="p-8 bg-secondary-100 rounded-xl"
          onSubmit={formik.handleSubmit}
        >
          <TitleBriefs titulo={`Política ${index + 1}`} />

          <div className="flex flex-col gap-4 mt-10 mb-5">
            <label className="font-medium text-white">Título</label>
            <InputsBriefs
              name="titulo"
              type="text"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Errors errors={formik.errors.titulo} touched={formik.touched.titulo} />

            <label className="font-medium text-white">Descripción</label>
            <ReactQuill
              ref={(el) => (quillRefs.current[index] = el!)}
              theme="snow"
              value={formik.values.descripcion}
              onChange={(content) => {
                formik.setFieldValue("descripcion", content);
                autoResize(index);
              }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "clean"],
                ],
              }}
              className="bg-white rounded-lg text-black"
            />
            <Errors errors={formik.errors.descripcion} touched={formik.touched.descripcion} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-black bg-green-500 rounded-lg hover:bg-green-600"
            >
              Guardar Política {index + 1}
            </button>
          </div>
        </form>
      ))}
    </div>
  );
};
