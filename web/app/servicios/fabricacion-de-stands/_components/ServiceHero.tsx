"use client";

import { ConfigResponse, GeneralData } from "@/models/generalData";
import { useConfig } from "../../../_context/ConfigContext";

export const ServiceHero = () => {
  const config = useConfig();
  const { categorias } = (config as unknown as ConfigResponse).data;

  const serviceData = categorias[0] && {
    ...categorias[0],
    imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/servicio_categoria/${categorias[0].imagen}`,
  };

  if (!serviceData) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Imagen de fondo con parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${serviceData.imagen})`,
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>

      {/* Contenido */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl">
          <div className="overflow-hidden">
            <p className="text-white/70 text-sm uppercase tracking-[0.4em] mb-4 animate-fade-in">
              {serviceData.subtitulo}
            </p>
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-white font-sans tracking-tight leading-none">
            {serviceData.titulo}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-8">
            {serviceData.descripcion}
          </p>

          {/* Indicador de scroll */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
