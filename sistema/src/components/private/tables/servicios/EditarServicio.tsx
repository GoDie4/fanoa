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
  type serviciosValuesModificate
} from '../../../shared/Interfaces'
import { SchemaServicios } from '../../../shared/Schemas'
import { ImageUpdate } from '../../../shared/ImageUpdate'

export const EditarServicio = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
  const token = localStorage.getItem('token')
  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar producto')
    const data = new FormData()
    data.append('buscar', '')
    // Fetch existing categories to determine the number of categories

    Promise.all([getProducto()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: serviciosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('titulo', values.titulo)
    if (imagenNueva1.archivo != null) {
      data.append('imagen1', imagenNueva1.archivo)
    } else {
      data.append('imagen1', imagen1)
    }
    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateServicio/${id ?? ''}`,
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
        navigate('/admin/galeria')
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
    const request = await axios.get(`${Global.url}/oneServicio/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      titulo: request.data.titulo
    })
    setImagen1(request.data.imagen1)
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
      titulo: ''
    },
    validationSchema: SchemaServicios,
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
              <TitleBriefs titulo="Nombre" />
              <InputsBriefs
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo} touched={touched.titulo} />
            </div>
          </div>
          <div className="relative flex flex-col mb-10 md:flex-row md:items-center gap-y-2">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagen del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col items-center flex-1 gap-4 lg:flex-row">
              <ImageUpdate
                globalUrl="galeria"
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
              to="/admin/galeria"
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
