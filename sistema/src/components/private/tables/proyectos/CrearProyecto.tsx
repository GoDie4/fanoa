import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { ImageUploader } from '../../../shared/ImageUploader'
import {
  type ImagenState,
  type proyectosValuesModificate
} from '../../../shared/Interfaces'
import { SchemaProyectos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'

export const CrearProyecto = (): JSX.Element => {
  const navigate = useNavigate()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  //   const [pdf, setPf] = useState<File | null>(null)
  //   const handleSetPdf = (pdfFile: File | null): void => {
  //     // Esta función se pasará como prop al componente PdfUploader
  //     setPdf(pdfFile)
  //   }
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [imagen2, setImagen2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')

  const [imagen3, setImagen3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')

  const [imagen4, setImagen4] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton4, setBoton4] = useState(false)
  const [url4, setUrl4] = useState('')

  const [imagen5, setImagen5] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton5, setBoton5] = useState(false)
  const [url5, setUrl5] = useState('')

  const [imagen6, setImagen6] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton6, setBoton6] = useState(false)
  const [url6, setUrl6] = useState('')

  const [imagen7, setImagen7] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton7, setBoton7] = useState(false)
  const [url7, setUrl7] = useState('')

  const [content, setContent] = useState('')
  const [content2, setContent2] = useState('')

  useEffect(() => {
    setTitle('Agregar proyecto')
  }, [])

  const saveNoticia = async (
    values: proyectosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('nombre', values.nombre)
    data.append('contenido1', content)
    data.append('contenido2', content2)

    if (imagen1.archivo != null) {
      data.append('imagen1', imagen1.archivo)
    }
    if (imagen2.archivo != null) {
      data.append('imagen2', imagen2.archivo)
    }
    if (imagen3.archivo != null) {
      data.append('imagen3', imagen3.archivo)
    }
    if (imagen4.archivo != null) {
      data.append('imagen4', imagen4.archivo)
    }
    if (imagen5.archivo != null) {
      data.append('imagen5', imagen5.archivo)
    }
    if (imagen6.archivo != null) {
      data.append('imagen6', imagen6.archivo)
    }
    if (imagen7.archivo != null) {
      data.append('imagen7', imagen7.archivo)
    }

    // if (pdf != null) {
    //   data.append('pdf', pdf)
    // }
    try {
      const respuesta = await axios.post(`${Global.url}/saveProyecto`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })

      if (respuesta.data.status == 'success') {
        Swal.fire('Agregado correctamente', '', 'success')
        navigate('/admin/proyectos')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        id: 0
      },
      validationSchema: SchemaProyectos,
      onSubmit: saveNoticia
    })

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="p-8 bg-secondary-100 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-between w-full gap-2 mb-5 lg:relative lg:flex-row">
            <div className="w-full ">
              <TitleBriefs titulo="Nombre del proyecto" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
          </div>

          <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Portada del proyecto<span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
              <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
            </div>
          </div>
          {/* <div className="relative flex flex-col mb-10 md:flex-row md:items-center gap-y-2">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Ficha técnica
            </p>
            <PdfUploader setPdf={handleSetPdf} clase='pdf'/>
          </div> */}

          <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Resumen del proyecto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>

          <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Descripcion del proyecto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content2} setContent={setContent2} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 1<span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url2}
                  setUrl={setUrl2}
                  boton={boton2}
                  setBoton={setBoton2}
                  setImagen={setImagen2}
                  clase="2"
                />
              </div>
            </div>
            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 2<span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url3}
                  setUrl={setUrl3}
                  boton={boton3}
                  setBoton={setBoton3}
                  setImagen={setImagen3}
                  clase="3"
                />
              </div>
            </div>
            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 3<span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url4}
                  setUrl={setUrl4}
                  boton={boton4}
                  setBoton={setBoton4}
                  setImagen={setImagen4}
                  clase="4"
                />
              </div>
            </div>

            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 4
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url5}
                  setUrl={setUrl5}
                  boton={boton5}
                  setBoton={setBoton5}
                  setImagen={setImagen5}
                  clase="5"
                />
              </div>
            </div>

            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 5
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url6}
                  setUrl={setUrl6}
                  boton={boton6}
                  setBoton={setBoton6}
                  setImagen={setImagen6}
                  clase="6"
                />
              </div>
            </div>

            <div className="relative flex flex-col mb-12 md:flex-row md:items-center gap-y-2">
              <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
                Imagen 6
              </p>
              <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
                <ImageUploader
                  url={url7}
                  setUrl={setUrl7}
                  boton={boton7}
                  setBoton={setBoton7}
                  setImagen={setImagen7}
                  clase="7"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/proyectos"
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-black transition-colors bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
              value="Registrar"
            />
          </div>
        </form>
      )}
    </>
  )
}
