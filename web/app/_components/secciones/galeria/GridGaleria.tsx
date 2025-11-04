/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { GalleryImage, GalleryItem } from "../GaleriaSeccion";
// import { ConfigResponse } from "@/models/generalData";
// import { useConfig } from "../../../_context/ConfigContext";

// interface Props {
//   filtro?: string;
// }

// export const GridGaleria: React.FC<Props> = ({ filtro })=> {
//   const pattern: Pick<GalleryImage, "span" | "animationType">[] = [
//     {
//       span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
//       animationType: "wave",
//     },
//     {
//       span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
//       animationType: "reveal",
//     },
//     {
//       span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
//       animationType: "fragment",
//     },
//     {
//       span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3",
//       animationType: "elastic",
//     },
//     {
//       span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
//       animationType: "fragment",
//     },
//     {
//       span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
//       animationType: "elastic",
//     },
//     {
//       span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
//       animationType: "wave",
//     },
//   ];

//   const config = useConfig();
//   const { proyectos } = (config as unknown as ConfigResponse).data;
//   function normalize(str: string) {
//     return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
//   }

//   const proyectosFiltrados = filtro
//     ? proyectos.filter((p: any) => {
//         const tituloCategoria = p.categoria?.titulo ? normalize(p.categoria.titulo.toLowerCase()) : "";
//         const filtroNormalizado = normalize(filtro.toLowerCase());
//         return tituloCategoria.includes(filtroNormalizado);
//       })
//     : proyectos;

//   const images: GalleryImage[] = proyectosFiltrados.map((item: any, index: number) => {
//     const patternItem = pattern[index % pattern.length];
//     return {
//       id: item.id,
//       url: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${item.imagen}`,
//       nombre: item.nombre || item.titulo || "",
//       span: patternItem.span,
//       animationType: patternItem.animationType,
//     };
//   });

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-4 md:gap-5">
//       {images.length > 0 ? (
//         images.reverse().map((image, index) => (
//           <GalleryItem key={image.id} image={image} index={index} />
//         ))
//       ) : (
//         <p className="col-span-full text-center text-gray-600 text-lg py-20">
//           No se encontraron proyectos.
//         </p>
//       )}
//     </div>
//   );
// };

import React from "react";
import { GalleryImage, GalleryItem } from "../GaleriaSeccion";
import { ConfigResponse } from "@/models/generalData";
import { useConfig } from "../../../_context/ConfigContext";

interface Props {
  filtro?: string;
}

export const GridGaleria: React.FC<Props> = ({ filtro }) => {
  const config = useConfig();
  const { proyectos } = (config as unknown as ConfigResponse).data;

  function normalize(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const proyectosFiltrados = filtro
    ? proyectos.filter((p: any) => {
        const tituloCategoria = p.categoria?.titulo
          ? normalize(p.categoria.titulo.toLowerCase())
          : "";
        const filtroNormalizado = normalize(filtro.toLowerCase());
        return tituloCategoria.includes(filtroNormalizado);
      })
    : proyectos;

  // Ajuste dinámico de columnas según cantidad de imágenes
  let cols = 2;
  if (proyectosFiltrados.length > 6) cols = 4;
  else if (proyectosFiltrados.length > 3) cols = 3;

  // Patrón base (spans grandes solo si hay espacio)
  const basePattern: Pick<GalleryImage, "span" | "animationType">[] = [
    { span: "col-span-2 row-span-2", animationType: "wave" },
    { span: "col-span-1 row-span-2", animationType: "reveal" },
    { span: "col-span-1 row-span-2", animationType: "fragment" },
    { span: "col-span-1 row-span-2", animationType: "elastic" },
    { span: "col-span-2 row-span-2", animationType: "fragment" },
    { span: "col-span-1 row-span-2", animationType: "elastic" },
    { span: "col-span-1 row-span-2", animationType: "wave" },
  ];

  const images: GalleryImage[] = proyectosFiltrados.map((item: any, index: number) => {
    const patternItem = basePattern[index % basePattern.length];
    let span = patternItem.span;

    if (span.includes("col-span-2") && cols < 4) {
      span = "col-span-1 row-span-2";
    }

    return {
      id: item.id,
      url: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${item.imagen}`,
      nombre: item.nombre || item.titulo || "",
      span,
      animationType: patternItem.animationType,
    };
  });

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-${cols} md:grid-cols-${cols} auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-4 md:gap-5 grid-flow-dense`}
    >
      {images.length > 0 ? (
        images.map((image, index) => (
          <GalleryItem key={image.id} image={image} index={index} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600 text-lg py-20">
          No se encontraron proyectos.
        </p>
      )}
    </div>
  );
};
