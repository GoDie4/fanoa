"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

interface FeriaLogo {
  id: number;
  nombre: string;
  logo: string;
  año?: string;
}

// Logos de ferias - reemplaza con tus datos reales
// const feriasLogos: FeriaLogo[] = [
//   {
//     id: 1,
//     nombre: "Salón del gas renova",
//     logo: "/assets/images/ferias/feria1.jpg",
//     año: "2025",
//   },
//   {
//     id: 2,
//     nombre: "Faco Elche",
//     logo: "/assets/images/ferias/feria2.png",
//     año: "2025",
//   },
//   {
//     id: 3,
//     nombre: "Smagua",
//     logo: "/assets/images/ferias/feria3.png",
//     año: "2025",
//   },
//   {
//     id: 4,
//     nombre: "FYCMA",
//     logo: "/assets/images/ferias/feria4.png",
//     año: "2025",
//   },
//   {
//     id: 5,
//     nombre: "Fruit Attraction",
//     logo: "/assets/images/ferias/feria5.png",
//     año: "2025",
//   },
//   {
//     id: 6,
//     nombre: "NeutraCeticals",
//     logo: "/assets/images/ferias/feria6.png",
//     año: "2025",
//   },
//   {
//     id: 7,
//     nombre: "Fitur",
//     logo: "/assets/images/ferias/feria7.png",
//     año: "2025",
//   },
//   {
//     id: 8,
//     nombre: "Ifema Madrid",
//     logo: "/assets/images/ferias/feria8.png",
//     año: "2025",
//   },
// ];

const FeriasCarousel: React.FC = () => {
  const config = useConfig();
  const { ferias } = (config as unknown as ConfigResponse).data;

  const feriasLogos = ferias.map((feria) => ({
    ...feria,
    imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/feria/${feria.imagen}`,
  }));

  // useEffect(() => {
  //   console.log(feriasLogos);
  // }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const itemsPerView = 4; // Cuántos logos mostrar a la vez en desktop
  const totalSlides = Math.ceil(ferias.length / itemsPerView);

  // Rotación automática cada 3 segundos
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  //   const goToSlide = (index: number) => {
  //     setCurrentIndex(index);
  //     setIsAutoPlaying(false);
  //     setTimeout(() => setIsAutoPlaying(true), 5000);
  //   };

  //   const goToPrevious = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
  //     );
  //     setIsAutoPlaying(false);
  //     setTimeout(() => setIsAutoPlaying(true), 5000);
  //   };

  //   const goToNext = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
  //     );
  //     setIsAutoPlaying(false);
  //     setTimeout(() => setIsAutoPlaying(true), 5000);
  //   };

  return (
    <div className="w-full bg-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-14">
        {/* Carousel Container */}
        <div className="relative">
          {/* Logos Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
                >
                  {feriasLogos
                    .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                    .map((feria) => (
                      <div
                        key={feria.id}
                        className="group relative bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]"
                      >
                        {/* Logo Container */}
                        <div className="w-full h-24 flex items-center justify-center mb-4  transition-all duration-300">
                          <img
                            src={feria.imagen}
                            alt="feria"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        {/* Nombre de la feria */}
                        {/* <h3 className="text-center font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 mb-1">
                          {feria.nombre}
                        </h3>

                        {feria.año && (
                          <span className="text-sm text-gray-500">
                            {feria.año}
                          </span>
                        )} */}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Solo en desktop */}
          {/* {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-primary text-white items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10"
                aria-label="Anterior"
              >
                <span className="text-xl">←</span>
              </button>

              <button
                onClick={goToNext}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-primary text-white items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10"
                aria-label="Siguiente"
              >
                <span className="text-xl">→</span>
              </button>
            </>
          )} */}
        </div>

        {/* Dots Navigation */}
        {/* {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                  aria-label={`Ir al grupo ${index + 1}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-12 bg-primary"
                        : "w-8 bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                  {index === currentIndex && isAutoPlaying && (
                    <div
                      className="absolute top-0 left-0 h-2 bg-primary/50 rounded-full"
                      style={{
                        animation: "progress 3s linear",
                        width: "100%",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label={isAutoPlaying ? "Pausar" : "Reproducir"}
            >
              {isAutoPlaying ? (
                <span className="text-xs">⏸</span>
              ) : (
                <span className="text-xs">▶</span>
              )}
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FeriasCarousel;
