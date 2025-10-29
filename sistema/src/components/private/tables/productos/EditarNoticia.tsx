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
  type ImagenState,
  type categoriasValues,
  type noticiasValuesModificate
} from '../../../shared/Interfaces'
import { SchemaNoticias } from '../../../shared/Schemas'
import { ImageUpdate } from '../../../shared/ImageUpdate'

export const EditarNoticia = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()

  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  //   const [pdf, setPdf] = useState<File | null>(null)
  //   const handlePdfChange = (pdf: File | null): void => {
  //     // Puedes realizar cualquier lógica adicional aquí si es necesario
  //     setPdf(pdf)
  //   }
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar producto')
    Promise.all([getCategorias(), getProducto()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: noticiasValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.id_categoria)
    data.append('nombre_es', values.nombre.es)
    data.append('nombre_en', values.nombre.en)
    data.append('descripcion_es', values.descripcion.es)
    data.append('descripcion_en', values.descripcion.en)
    data.append('tipo_diseno', values.tipo_diseno)

    // if (pdf !== null) {
    //   data.append('pdf', pdf)
    // }
    if (imagenNueva1.archivo != null) {
      data.append('imagen1', imagenNueva1.archivo)
    } else {
      data.append('imagen1', imagen1)
    }

    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateNoticia/${id ?? ''}}`,
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
        navigate('/admin/productos')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getCategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
  }

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneNoticia/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      id_categoria: request.data[0].id_categoria,
      tipo_diseno: request.data[0].tipo_diseno,
      nombre: {
        en: request.data[0].nombre_en,
        es: request.data[0].nombre_es
      },
      descripcion: {
        en: request.data[0].descripcion_en,
        es: request.data[0].descripcion_es
      }
    })
    setImagen1(request.data[0].imagen1)
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
      nombre: {
        es: '',
        en: ''
      },
      descripcion: {
        es: '',
        en: ''
      },
      id_categoria: '',
      tipo_diseno: ''
    },
    validationSchema: SchemaNoticias,
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
          <div className="flex flex-col justify-between w-full gap-6 mb-5 lg:relative lg:flex-row">
            <div className="flex flex-col w-full gap-6 lg:w-1/2">
              <div className="w-full">
                <TitleBriefs titulo="Nombre del producto (Español)" />
                <InputsBriefs
                  name="nombre.es"
                  type="text"
                  value={values.nombre.es}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.nombre?.es}
                  touched={touched.nombre?.es}
                />
              </div>

              <div className="w-full">
                <TitleBriefs titulo="Nombre del producto (Inglés)" />
                <InputsBriefs
                  name="nombre.en"
                  type="text"
                  value={values.nombre.en}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.nombre?.en}
                  touched={touched.nombre?.en}
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-6 lg:w-1/2">
              <div className="w-full">
                <TitleBriefs titulo="Descripción del producto (Español)" />
                <InputsBriefs
                  name="descripcion.es"
                  type="text"
                  value={values.descripcion.es}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.descripcion?.es}
                  touched={touched.descripcion?.es}
                />
              </div>

              <div className="w-full">
                <TitleBriefs titulo="Descripción del producto (Inglés)" />
                <InputsBriefs
                  name="descripcion.en"
                  type="text"
                  value={values.descripcion.en}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors
                  errors={errors.descripcion?.en}
                  touched={touched.descripcion?.en}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-6 mb-5 lg:relative lg:flex-row">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
                name="id_categoria"
                value={values.id_categoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {categorias.map((categoria: categoriasValues) => (
                  <option value={categoria.id} key={categoria.id}>
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.id_categoria}
                touched={touched.id_categoria}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Tipo de diseño" />
              <select
                className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
                name="tipo_diseno"
                value={values.tipo_diseno}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                <option value={'diseno1'}>Diseño 1</option>
                <option value={'diseno2'}>Diseño 2</option>
              </select>
              <Errors
                errors={errors.tipo_diseno}
                touched={touched.tipo_diseno}
              />
            </div>
          </div>
          <div className="relative flex flex-col mb-10 md:flex-row md:items-center gap-y-2">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagen del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
              <ImageUpdate
                globalUrl="productos"
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

          <div className="flex justify-end w-full gap-2">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/productos"
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
