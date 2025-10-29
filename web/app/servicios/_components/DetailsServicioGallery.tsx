"use client";
import React, { useEffect, useState } from "react";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

export const DetailsServicioGallery = ({ alias }: { alias: "first" | "second" }) => {
  const config = useConfig();
  const { categorias } = (config as unknown as ConfigResponse).data || {};
  const [, setScrollY] = useState(0);
  const [, setSelectedImage] = useState<number | null>(null);

  let serviceData;

  if (alias === "first" && categorias?.[0]) {
    serviceData = {
      ...categorias[0],
      proyectos: categorias[0].proyectos.map((proyecto) => ({
        ...proyecto,
        imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${proyecto.imagen}`,
      })),
    };
  } else if (alias === "second" && categorias?.[1]) {
    serviceData = {
      ...categorias[1],
      proyectos: categorias[1].proyectos.map((proyecto) => ({
        ...proyecto,
        imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${proyecto.imagen}`,
      })),
    };
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500 ">Portafolio</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary font-sans mt-4">
            Proyectos Destacados
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData?.proyectos.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelectedImage(Number(image.createdAt))}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image.imagen})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xl">+</span>
                  </div>
                  <p className="text-white font-semibold">{image.titulo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
