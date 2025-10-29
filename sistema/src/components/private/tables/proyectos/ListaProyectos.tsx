import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { RiFilter2Fill } from 'react-icons/ri'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import { type proyectosValues } from '../../../shared/Interfaces'
import { DeleteItems } from '../../../shared/DeleteItems'
import { LoadingSmall } from '../../../shared/LoadingSmall'

export const ListaProyectos = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const [productos, setProductos] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const [paginaActual, setpaginaActual] = useState(1)
  const [search, setSearch] = useState('')
  const [cantidadRegistros] = useState(4)

  const navigate = useNavigate()

  const getAllProductos = async (): Promise<void> => {
    setLoadingComponents(true)
    const data = new FormData()
    data.append('buscar', search)
    const request = await axios.post(`${Global.url}/getProyectos`, data, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setProductos(request.data)
    setTotalRegistros(request.data.length)
    setLoadingComponents(false)
  }

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = productos.length

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost)
  }

  const onSeachChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setpaginaActual(1)
    setSearch(target.value)
  }

  const preguntar = (id: number): void => {
    DeleteItems({
      ruta: 'deleteProyecto',
      id,
      token,
      getData: getAllProductos,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  useEffect(() => {
    setTitle('Listado de proyectos')
    getAllProductos()
  }, [])

  return (
    <>
      <div className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between gap-y-4 ">
        <div>
          {/* <h1 className="text-xl font-bold text-gray-100">Lista de Productos</h1> */}
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row">
          <button className="flex items-center w-full gap-2 px-4 py-2 transition-colors rounded-lg bg-secondary-100/50 hover:bg-secondary-100 md:w-fit hover:text-white">
            <RiFilter2Fill />
            <input
              placeholder="Buscar ..."
              className="bg-transparent outline-none"
              value={search}
              onChange={onSeachChange}
              type="search"
            />
            <button
              className="h-full px-3 py-1 text-white rounded-lg bg-main"
              onClick={() => {
                !loadingComponents && getAllProductos()
              }}
            >
              {!loadingComponents
                ? (
                    'Buscar'
                  )
                : (
                <div>
                  <LoadingSmall />
                </div>
                  )}
            </button>
          </button>
          <button
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-main hover:bg-main lg:w-fit"
            onClick={() => {
              navigate('agregar')
            }}
          >
            Crear
          </button>
        </div>
      </div>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <div className="p-8 bg-secondary-100 rounded-xl">
          <div className="hidden grid-cols-1 gap-4 p-4 mb-10 md:grid md:grid-cols-4">
            <h5 className="md:text-center">ID</h5>
            <h5 className="md:text-center">Nombre</h5>
            <h5 className="md:text-center">Imagen</h5>
            <h5 className="md:text-center">Acciones</h5>
          </div>
          {filterDate().map((pro: proyectosValues) => (
            <div
              className="grid items-center grid-cols-1 gap-4 p-4 mb-4 md:grid-cols-4 bg-secondary-900 rounded-xl"
              key={pro.id}
            >
              <div className="md:text-center">
                <h5 className="mb-2 font-bold text-white md:hidden">ID</h5>
                <span>#{pro.id}</span>
              </div>
              <div className="md:text-center">
                <h5 className="mb-2 font-bold text-white md:hidden">Nombre</h5>
                <span>{pro.nombre}</span>
              </div>

              <div className="md:text-center md:flex md:justify-center">
                <h5 className="mb-2 font-bold text-white md:hidden">Imagen</h5>
                <img
                  src={`${Global.urlImages}/proyectos/${pro.imagen1}`}
                  alt=""
                  className="object-contain w-12 h-12"
                />
              </div>

              <div className="md:text-center md:flex md:justify-center">
                <h5 className="mb-2 font-bold text-white md:hidden">
                  Acciones
                </h5>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center p-2 transition-colors rounded-lg gap-x-2 bg-secondary-100">
                      Acciones
                    </MenuButton>
                  }
                  align="end"
                  arrow
                  transition
                  menuClassName="bg-secondary-100 p-4"
                >
                  <MenuItem className="p-0 hover:bg-transparent">
                    <Link
                      to={`editar/${pro.id}`}
                      className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                    >
                      Editar
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 hover:bg-transparent">
                    <Link
                      to=""
                      onClick={() => {
                        preguntar(pro.id)
                      }}
                      className="flex items-center flex-1 p-2 text-gray-300 transition-colors rounded-lg hover:bg-secondary-900 gap-x-4"
                    >
                      Eliminar
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}

          <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-0 content_buttons ">
            <p className="ml-1 text-md"> {totalRegistros} Registros </p>
            <Paginacion
              totalPosts={totalPosts}
              cantidadRegistros={cantidadRegistros}
              paginaActual={paginaActual}
              setpaginaActual={setpaginaActual}
            />
          </div>
        </div>
          )}
    </>
  )
}
