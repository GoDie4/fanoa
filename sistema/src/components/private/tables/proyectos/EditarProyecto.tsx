import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type proyectosValuesModificate,
  type ImagenState
} from '../../../shared/Interfaces'
import { SchemaProyectos } from '../../../shared/Schemas'
import { ImageUpdate } from '../../../shared/ImageUpdate'
import Editor from '../../../shared/Editar'

export const EditarProyecto = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [content, setContent] = useState('')
  const [content2, setContent2] = useState('')

  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [imagen2, setImagen2] = useState('')
  const [imagenNueva2, setImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')

  const [imagen3, setImagen3] = useState('')
  const [imagenNueva3, setImagenNueva3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')

  const [imagen4, setImagen4] = useState('')
  const [imagenNueva4, setImagenNueva4] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton4, setBoton4] = useState(false)
  const [url4, setUrl4] = useState('')

  const [imagen5, setImagen5] = useState('')
  const [imagenNueva5, setImagenNueva5] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton5, setBoton5] = useState(false)
  const [url5, setUrl5] = useState('')

  const [imagen6, setImagen6] = useState('')
  const [imagenNueva6, setImagenNueva6] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton6, setBoton6] = useState(false)
  const [url6, setUrl6] = useState('')

  const [imagen7, setImagen7] = useState('')
  const [imagenNueva7, setImagenNueva7] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton7, setBoton7] = useState(false)
  const [url7, setUrl7] = useState('')

  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar proyecto')
    Promise.all([getProducto()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: proyectosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('nombre', values.nombre)
    // if (pdf !== null) {
    //   data.append('pdf', pdf)
    // }
    if (imagenNueva1.archivo != null) {
      data.append('imagen1', imagenNueva1.archivo)
    } else {
      data.append('imagen1', imagen1)
    }
    if (imagenNueva2.archivo != null) {
      data.append('imagen2', imagenNueva2.archivo)
    } else {
      data.append('imagen2', imagen2)
    }
    if (imagenNueva3.archivo != null) {
      data.append('imagen3', imagenNueva3.archivo)
    } else {
      data.append('imagen3', imagen3)
    }
    if (imagenNueva4.archivo != null) {
      data.append('imagen4', imagenNueva4.archivo)
    } else {
      data.append('imagen4', imagen4)
    }
    if (imagenNueva5.archivo != null) {
      data.append('imagen5', imagenNueva5.archivo)
    } else {
      data.append('imagen5', imagen5)
    }
    if (imagenNueva6.archivo != null) {
      data.append('imagen6', imagenNueva6.archivo)
    } else {
      data.append('imagen6', imagen6)
    }
    if (imagenNueva7.archivo != null) {
      data.append('imagen7', imagenNueva7.archivo)
    } else {
      data.append('imagen7', imagen7)
    }
    data.append('contenido1', content)
    data.append('contenido2', content2)

    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateProyecto/${id ?? ''}}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )

      if (respuesta.data.status == 'success') {
        Swal.fire('Actualizado correctamente', '', 'success')
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

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProyecto/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      nombre: request.data[0].nombre
    })
    setImagen1(request.data[0].imagen1)
    setImagen2(request.data[0].imagen2)
    setImagen3(request.data[0].imagen3)
    setImagen4(request.data[0].imagen4)
    setImagen5(request.data[0].imagen5)
    setImagen6(request.data[0].imagen6)
    setImagen7(request.data[0].imagen7)

    setContent(request.data[0].contenido1)
    setContent2(request.data[0].contenido2)

    // setPdf(request.data[0].pdf)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      id: 0,
      nombre: ''
    },
    validationSchema: SchemaProyectos,
    onSubmit: updateProducto
  })

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
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

          <div className="relative flex flex-col mb-10 md:flex-row md:items-center gap-y-2">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagen del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
              <ImageUpdate
                globalUrl="proyectos"
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                imagen={imagen1}
                setImagen={setImagenNueva1}
                clase="1"
              />
            </div>
          </div>

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
            <ImageUpdate
              globalUrl="proyectos"
              url={url2}
              setUrl={setUrl2}
              boton={boton2}
              setBoton={setBoton2}
              imagen={imagen2}
              setImagen={setImagenNueva2}
              clase="2"
            />
            <ImageUpdate
              globalUrl="proyectos"
              url={url3}
              setUrl={setUrl3}
              boton={boton3}
              setBoton={setBoton3}
              imagen={imagen3}
              setImagen={setImagenNueva3}
              clase="3"
            />
            <ImageUpdate
              globalUrl="proyectos"
              url={url4}
              setUrl={setUrl4}
              boton={boton4}
              setBoton={setBoton4}
              imagen={imagen4}
              setImagen={setImagenNueva4}
              clase="4"
            />
            <ImageUpdate
              globalUrl="proyectos"
              url={url5}
              setUrl={setUrl5}
              boton={boton5}
              setBoton={setBoton5}
              imagen={imagen5}
              setImagen={setImagenNueva5}
              clase="5"
            />
            <ImageUpdate
              globalUrl="proyectos"
              url={url6}
              setUrl={setUrl6}
              boton={boton6}
              setBoton={setBoton6}
              imagen={imagen6}
              setImagen={setImagenNueva6}
              clase="6"
            />
            <ImageUpdate
              globalUrl="proyectos"
              url={url7}
              setUrl={setUrl7}
              boton={boton7}
              setBoton={setBoton7}
              imagen={imagen7}
              setImagen={setImagenNueva7}
              clase="7"
            />
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
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
