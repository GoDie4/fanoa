/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GalleryImage, GalleryItem } from "../GaleriaSeccion";
import { Global } from "@/utils/global";

export const GridGaleria = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${Global.url}/allServicios`);
        const data = await res.json();

        const normalized: GalleryImage[] = data.map(
          (item: any, index: number) => {
            const patternItem = pattern[index % pattern.length];
            return {
              id: item.id,
              url: item.imagen1,
              nombre: item.nombre,
              span: patternItem.span,
              animationType: patternItem.animationType,
            };
          }
        );

        setImages(normalized);
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Skeleton de carga (brillo animado)
  const Skeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-4 md:gap-5 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className={`${
            pattern[i % pattern.length].span
          } bg-gray-200 rounded-lg overflow-hidden relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      ))}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] gap-2 sm:gap-4 md:gap-5">
          {images
            .reverse()
            .map((image, index) => (
              <GalleryItem key={image.id} image={image} index={index} />
            ))}
        </div>
      )}
    </>
  );
};