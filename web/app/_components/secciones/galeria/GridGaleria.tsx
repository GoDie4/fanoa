/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const proyectosStands = proyectos.filter((p: any) =>
    normalize(p.categoria?.titulo || "")
      .toLowerCase()
      .includes("stands")
  );

  const proyectosCarpinteria = proyectos.filter((p: any) =>
    normalize(p.categoria?.titulo || "")
      .toLowerCase()
      .includes("carpinteria")
  );

  // Patrón dinámico de animaciones
  const animationPattern: GalleryImage["animationType"][] = [
    "wave",
    "reveal",
    "fragment",
    "elastic",
  ];

  const mapToGalleryImages = (proyectosArray: any[]) =>
    proyectosArray.map((item, index) => ({
      id: item.id,
      url: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${item.imagen}`,
      nombre: item.nombre || item.titulo || "",
      span: "col-span-1 row-span-2",
      animationType: animationPattern[index % animationPattern.length],
    }));

  const imagesStands = mapToGalleryImages(proyectosStands);
  const imagesCarpinteria = mapToGalleryImages(proyectosCarpinteria);

  if (!filtro) {
    return (
      <div className="space-y-16">
        {/* Bloque Stands */}
        {imagesStands.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary font-sans uppercase leading-tight tracking-tight mb-6">
              Fabricación de Stands
            </h2>
            <div className="grid grid-cols-3 auto-rows-[150px] gap-4">
              {imagesStands.map((image, index) => (
                <GalleryItem key={image.id} image={image} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Bloque Carpintería */}
        {imagesCarpinteria.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary font-sans uppercase leading-tight tracking-tight mb-6">
              Carpintería y Ebanistería
            </h2>
            <div className="grid grid-cols-3 auto-rows-[150px] gap-4">
              {imagesCarpinteria.map((image, index) => (
                <GalleryItem key={image.id} image={image} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Filtro aplicado
  const proyectosFiltrados = proyectos.filter((p: any) =>
    normalize(p.categoria?.titulo || "")
      .toLowerCase()
      .includes(normalize(filtro.toLowerCase()))
  );

  const imagesFiltered = mapToGalleryImages(proyectosFiltrados);

  return imagesFiltered.length > 0 ? (
    <div className="grid grid-cols-3 auto-rows-[150px] gap-4">
      {imagesFiltered.map((image, index) => (
        <GalleryItem key={image.id} image={image} index={index} />
      ))}
    </div>
  ) : (
    <p className="col-span-full text-center text-gray-600 text-lg py-20">
      No se encontraron proyectos.
    </p>
  );
};
