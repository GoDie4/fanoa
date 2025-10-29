import React, { type SetStateAction } from 'react'

export interface CorreosItem {
  correo: string
  descripcion: string
  position: number
}
export const Correos = ({
  correos,
  setCorreos
}: {
  correos: CorreosItem[]
  setCorreos: React.Dispatch<SetStateAction<CorreosItem[]>>
}): JSX.Element => {
  const handleAddCorreo = (): void => {
    if (correos.length < 3) {
      setCorreos((prevCorreo) => [
        ...prevCorreo,
        { correo: '', position: prevCorreo.length + 1, descripcion: '' }
      ])
    }
  }

  const handleCorreoChange = (index: number, correo: string): void => {
    const newCorreo = [...correos]
    newCorreo[index].correo = correo
    setCorreos(newCorreo)
  }

  const handleDescripcionChange = (
    index: number,
    descripcion: string
  ): void => {
    const newCorreo = [...correos]
    newCorreo[index].descripcion = descripcion
    setCorreos(newCorreo)
  }

  const eliminarItemPorIndex = (index: number): void => {
    const updatedCorreos = correos
      .filter((_, i) => i !== index)
      .map((item, idx) => ({
        ...item,
        position: idx + 1 // Reasigna posiciones
      }))
    setCorreos(updatedCorreos)
  }

  const handlePositionChange = (index: number, newPosition: number): void => {
    const updatedCorreos = [...correos]
    const [movedItem] = updatedCorreos.splice(index, 1) // Elimina el elemento de la posición original
    updatedCorreos.splice(newPosition - 1, 0, movedItem) // Inserta en la nueva posición

    // Reasigna la posición para cada elemento en base a su índice
    const reorderedCorreos = updatedCorreos.map((item, idx) => ({
      ...item,
      position: idx + 1
    }))

    setCorreos(reorderedCorreos)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full gap-4 mb-0 sm:mb-1">
        <h2 className="text-2xl font-bold text-left text-tercero ">Correos</h2>
        {correos.length < 6 && (
          <button
            type="button"
            className="flex p-2 text-sm text-white bg-blue-500 rounded-lg h-fit w-fit"
            onClick={handleAddCorreo}
          >
            Añadir correo
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between mt-5 mb-12">
        {correos.map((correo, index) => (
          <div
            key={index}
            className="flex    w-full lg:w-[49%] flex-col mb-2 border-secondary-900 relative"
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  eliminarItemPorIndex(index)
                }}
                className="absolute top-0 right-0 text-red-500 underline"
              >
                Eliminar
              </button>
            )}
            <div className="flex flex-col mb-2">
              <label className="text-white">Correo {correo.position}</label>
              <div className="flex flex-col items-center w-full gap-4">
                <input
                  type="text"
                  value={correo.descripcion}
                  className="w-full pt-2 pb-2 pl-2 mt-2 placeholder-gray-400 border border-black rounded-md outline-none focus:border-black bg-secondary-900"
                  onChange={(e) => { handleDescripcionChange(index, e.target.value) }
                  }
                />
                <div className="flex items-center w-full gap-4">
                  <input
                    type="text"
                    value={correo.correo}
                    onChange={(e) => {
                      handleCorreoChange(index, e.target.value)
                    }}
                    className="w-4/5 pt-2 pb-2 pl-2 mt-2 placeholder-gray-400 border border-black rounded-md outline-none focus:border-black bg-secondary-900"
                  />
                  <select
                    value={correo.position}
                    onChange={(e) => {
                      handlePositionChange(index, parseInt(e.target.value, 10))
                    }}
                    className="w-1/5 py-2 pl-2 mt-2 border border-black rounded-md outline-none md:py-3 bg-secondary-900"
                  >
                    {Array.from(
                      { length: correos.length },
                      (_, i) => i + 1
                    ).map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Correos
