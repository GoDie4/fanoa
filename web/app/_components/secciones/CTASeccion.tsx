/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface ProjectImage {
  id: number;
  url: string;
  alt: string;
}

// Array de imágenes de trabajos realizados
const projectImages: ProjectImage[] = [
  {
    id: 1,
    url: "/assets/images/cta/fondo1.webp",
    alt: "Stand de diseño moderno",
  },
  {
    id: 2,
    url: "/assets/images/cta/fondo2.webp",

    alt: "Producción audiovisual",
  },
  {
    id: 3,
    url: "/assets/images/cta/fondo3.webp",

    alt: "Evento corporativo",
  },

];

const CTASection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [_isZooming, setIsZooming] = useState(true);

  useEffect(() => {
    // Cambiar imagen cada 5 segundos
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      setIsZooming(true);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    // Resetear animación de zoom cuando cambia la imagen
    setIsZooming(true);
    const timer = setTimeout(() => setIsZooming(false), 100);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <section className="w-full relative overflow-hidden bg-black group">
      {/* Background Images con animación de zoom */}
      <div className="absolute inset-0">
        {projectImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center brightness-110 group-hover:brightness-125 transition-transform duration-[5000ms] ease-out ${
                index === currentImageIndex ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          </div>
        ))}
      </div>

      {/* Overlay oscuro */}

      {/* Gradient overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent"></div>

      {/* Contenido principal */}
      <div className="relative container mx-auto  px-4 md:px-14 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado izquierdo - Texto y CTA */}
          <div className="space-y-8 z-10">
            {/* Label superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white">
                Comencemos
              </span>
            </div>

            {/* Título impactante */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-sans text-white leading-[0.95] tracking-tight">
              ¿Listo para
              <br />
              <span className="italic font-light">marcar presencia?</span>
            </h2>

            <p className="text-xl text-white/80 leading-relaxed max-w-lg">
              Diseñamos, fabricamos y montamos stands y estructuras con
              precisión y estilo. Soluciones integrales que elevan la imagen de
              tu marca en cada evento.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={"/contacto"}
                className="flex items-center w-fit group/button relative px-10 py-3 bg-primary text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Iniciar proyecto
                  <span className="text-2xl group-hover/button:translate-x-2 text-secondary transition-transform duration-300">
                    →
                  </span>
                </span>
              </Link>

              <Link
                href={"/galeria"}
                className="block w-fit px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-full  transition-all duration-300 hover:bg-primary hover:text-white "
              >
                Ver portafolio
              </Link>
            </div>
          </div>

          {/* Lado derecho - Elemento visual decorativo */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:block">
            {/* Círculo grande decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border-2 border-white/20 backdrop-blur-md flex items-center justify-center">
              <div className="w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full border-2 border-white/20 backdrop-blur-md flex items-center justify-center">
                <div className="w-[210px] h-[210px] lg:w-[270px] lg:h-[270px] rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl lg:text-7xl font-black text-white">
                      24h
                    </div>
                    <div className="text-sm uppercase tracking-widest text-white/80">
                      Respuesta
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos flotantes decorativos */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 rotate-12 animate-pulse"></div>
            <div
              className="absolute bottom-16 left-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-bounce"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="absolute top-1/3 right-0 w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 -rotate-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
