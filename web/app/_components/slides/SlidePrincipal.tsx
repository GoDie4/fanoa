/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse, GeneralData } from "@/models/generalData";

// interface Stand {
//   title: string;
//   description: string;
//   image: string;
//   ctaText: string;
//   ctaLink: string;
// }

// const standsData: Stand[] = [
//   {
//     title: "Somos Grupo Fanoa",
//     description:
//       "Aceptamos el reto de tu proyecto. Nos encargamos de todo el proceso, para que no tengas que preocuparte por nada y hagas realidad tus ideas con resultados de alto nivel y una ejecución impecable.",
//     image: "/assets/images/slides/slide1.webp",
//     ctaText: "Conócenos Más",
//     ctaLink: "/nosotros",
//   },
//   {
//     title: "Stands para Ferias",
//     description:
//       "Diseñamos, fabricamos y montamos stands para ferias, congresos, eventos y exposiciones a nivel nacional e internacional. Cuidamos cada detalle para reflejar la esencia de tu marca con impacto y profesionalismo.",
//     image: "/assets/images/slides/slide2.webp",
//     ctaText: "Solicitar Cotización",
//     ctaLink: "/contacto",
//   },
//   {
//     title: "Mobiliario de Madera",
//     description:
//       "Somos especialistas en carpintería de madera para proyectos de reformas y diseños personalizados. Creamos mobiliario funcional y estético que combina calidad artesanal y diseño contemporáneo.",
//     image: "/assets/images/slides/slide3.webp",
//     ctaText: "Ver Galería",
//     ctaLink: "/galeria",
//   },
// ];

export default function StandShowcaseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const config = useConfig();
  const { banners } = (config as unknown as ConfigResponse).data;

  const standsData = banners.map((banner) => ({
    ...banner,
    imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/banners-principales/${banner.imagen}`,
  }));

  // useEffect(() => {
  //   console.log({ standsData });
  // }, []);

  const autoplayDuration = 6000;

  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((curr) => (curr + 1) % standsData.length);
          return 0;
        }
        return prev + 100 / (autoplayDuration / 50);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused, currentIndex]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % standsData.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + standsData.length) % standsData.length);
    setProgress(0);
  };

  // Animación de panel lateral que se construye
  const panelVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      scaleX: 0,
      originX: dir > 0 ? 0 : 1,
    }),
    center: {
      x: 0,
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      scaleX: 0,
      originX: dir > 0 ? 1 : 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Animación de imagen con efecto construcción
  const imageVariants = {
    enter: {
      scale: 1.3,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Animación de contenido con entrada escalonada
  const contentVariants = {
    enter: {
      y: 100,
      opacity: 0,
    },
    center: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Barras estructurales
  //   const barVariants = {
  //     enter: {
  //       scaleY: 0,
  //       opacity: 0,
  //     },
  //     center: (i: number) => ({
  //       scaleY: 1,
  //       opacity: 0.15,
  //       transition: {
  //         delay: 0.2 + i * 0.08,
  //         duration: 0.6,
  //         ease: "easeOut",
  //       },
  //     }),
  //   };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-morado/40 pt-[151px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div key={currentIndex} custom={direction} className="absolute inset-0">
          <motion.div
            //@ts-ignore
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={standsData[currentIndex]?.imagen}
              alt={standsData[currentIndex]?.titulo}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent"></div>
          </motion.div>

          {/* Barras estructurales animadas */}
          {/* <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                //@ts-ignore
                variants={barVariants}
                initial="enter"
                animate="center"
                className="absolute bottom-0 bg-gradient-to-t from-blue-500 to-purple-500"
                style={{
                  left: `${i * 8.33}%`,
                  width: "2px",
                  height: "100%",
                  originY: 1,
                }}
              />
            ))}
          </div> */}

          {/* Panel decorativo lateral */}
          <motion.div
            custom={direction}
            //@ts-ignore
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            style={{ originX: 0 }}
          />

          {/* Contenido principal */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4  md:px-14">
              <div className="max-w-3xl">
                {/* Línea decorativa */}
                <motion.div
                  custom={0}
                  //@ts-ignore
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex items-center gap-4 mb-6"
                ></motion.div>

                {/* Título */}
                <motion.h1
                  custom={1}
                  //@ts-ignore
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-4xl md:text-6xl lg:text-7xl font-black font-sans text-white uppercase mb-6 leading-tight"
                >
                  {(() => {
                    const title = standsData[currentIndex]?.titulo;
                    const words = title?.split(" ");
                    const lastWord = words?.pop(); // Saca la última palabra
                    const firstPart = words?.join(" ");

                    return (
                      <>
                        {firstPart} <span className="text-secondary">{lastWord}</span>
                      </>
                    );
                  })()}
                </motion.h1>

                {/* Descripción */}
                <motion.p
                  custom={2}
                  //@ts-ignore
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-xl  text-gray-100 mb-8  text-justify max-w-2xl"
                >
                  {standsData[currentIndex]?.descripcion}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  custom={3}
                  //@ts-ignore
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Link
                    href={standsData[currentIndex]?.enlace ?? '#'}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white text-lg rounded-full transition-all duration-300 group"
                  >
                    {standsData[currentIndex]?.textoBoton}
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Elemento decorativo inferior */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{ originX: 0.5 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2   cursor-pointer p-2  rounded-full transition-all duration-300 group z-20 "
        aria-label="Anterior"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-2 cursor-pointer rounded-full transition-all duration-300 group z-20  "
        aria-label="Siguiente"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores inferiores */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {standsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Ir al slide ${index + 1}`}
          >
            <div
              className={`relative transition-all duration-300 ${
                currentIndex === index ? "w-16 h-3" : "w-3 h-3 hover:w-4"
              }`}
            >
              {/* Fondo */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white/30 backdrop-blur-md"
                    : "bg-white/20 backdrop-blur-md group-hover:bg-white/30"
                }`}
              ></div>

              {/* Barra de progreso */}
              {currentIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  style={{ originX: 0 }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Contador de slides */}
      <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 text-white font-mono text-lg z-20">
        <span className="text-3xl font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="text-white/50"> / {String(standsData.length).padStart(2, "0")}</span>
      </div>

      {/* Indicador de pausa */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 md:bottom-24 right-6 md:right-12   rounded-full text-white text-sm flex items-center gap-2  z-20"
          >
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <div className="w-1 h-4 bg-primary rounded-full"></div>
            </div>
            <span className="font-semibold">Pausado</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto de viñeta */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
}
