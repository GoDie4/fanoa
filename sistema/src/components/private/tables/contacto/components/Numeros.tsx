import React, { type SetStateAction } from 'react'

export interface NumerosItem {
  numero: string
  position: number
}

export const Numeros = ({
  numeros,
  setNumeros
}: {
  numeros: NumerosItem[]
  setNumeros: React.Dispatch<SetStateAction<NumerosItem[]>>
}): JSX.Element => {
  const handleAddNumero = (): void => {
    if (numeros.length < 3) {
      setNumeros((prevNume) => [
        ...prevNume,
        { numero: '', position: prevNume.length + 1 }
      ])
    }
  }

  const handleNumeroChange = (index: number, numero: string): void => {
    const newNumeros = [...numeros]
    newNumeros[index].numero = numero
    setNumeros(newNumeros)
  }

  const eliminarItemPorIndex = (index: number): void => {
    const updatedNumeros = numeros
      .filter((_, i) => i !== index)
      .map((item, idx) => ({
        ...item,
        position: idx + 1 // Reasigna posiciones
      }))
    setNumeros(updatedNumeros)
  }

  const handlePositionChange = (index: number, newPosition: number): void => {
    const updatedNumeros = [...numeros]
    const [movedItem] = updatedNumeros.splice(index, 1) // Elimina el elemento de la posición original
    updatedNumeros.splice(newPosition - 1, 0, movedItem) // Inserta en la nueva posición

    // Reasigna la posición para cada elemento en base a su índice
    const reorderedNumeros = updatedNumeros.map((item, idx) => ({
      ...item,
      position: idx + 1
    }))

    setNumeros(reorderedNumeros)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full gap-4 mt-8 mb-0 sm:mb-1">
        <h2 className="text-2xl font-bold text-left text-tercero ">Números</h2>
        {numeros.length < 6 && (
          <button
            type="button"
            className="flex p-2 text-sm text-white bg-blue-500 rounded-lg h-fit w-fit"
            onClick={handleAddNumero}
          >
            Añadir número
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between mt-5 mb-6">
        {numeros.map((numero, index) => (
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
              <label className="text-white">
                Número {numero.position}
              </label>
              <div className="flex items-center w-full gap-4">
                <input
                  type="text"
                  value={numero.numero}
                  onChange={(e) => {
                    handleNumeroChange(index, e.target.value)
                  }}
                  className="w-4/5 pt-2 pb-2 pl-2 mt-2 placeholder-gray-400 border border-black rounded-md outline-none focus:border-black bg-secondary-900"
                />
                <select
                  value={numero.position}
                  onChange={(e) => {
                    handlePositionChange(index, parseInt(e.target.value, 10))
                  }}
                  className="w-1/5 py-2 pl-2 mt-2 border border-black rounded-md outline-none md:py-3 bg-secondary-900"
                >
                  {Array.from({ length: numeros.length }, (_, i) => i + 1).map(
                    (pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Numeros
