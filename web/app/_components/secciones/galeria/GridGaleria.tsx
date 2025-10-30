/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GalleryImage, GalleryItem } from "../GaleriaSeccion";
import { ConfigResponse } from "@/models/generalData";
import { useConfig } from "../../../_context/ConfigContext";

export const GridGaleria = () => {
  const pattern: Pick<GalleryImage, "span" | "animationType">[] = [
    {
      span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
      animationType: "wave",
    },
    {
      span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      animationType: "reveal",
    },
    {
      span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      animationType: "fragment",
    },
    {
      span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3",
      animationType: "elastic",
    },
    {
      span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
      animationType: "fragment",
    },
    {
      span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      animationType: "elastic",
    },
    {
      span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      animationType: "wave",
    },
  ];

  const config = useConfig();
  const { galeria } = (config as unknown as ConfigResponse).data;

  const images: GalleryImage[] = galeria.map((item: any, index: number) => {
    const patternItem = pattern[index % pattern.length];
    return {
      id: item.id,
      url: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/galeria/${item.imagen}`,
      nombre: item.nombre || item.titulo || '',
      span: patternItem.span,
      animationType: patternItem.animationType,
    };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-4 md:gap-5">
      {images.reverse().map((image, index) => (
        <GalleryItem key={image.id} image={image} index={index} />
      ))}
    </div>
  );
};