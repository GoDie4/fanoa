/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

// interface Service {
//   id: number;
//   title: string;
//   subtitle: string;
//   description: string;
//   ctaText: string;
//   imageUrl: string;
// }

// const servicesData: Service[] = [
//   {
//     id: 1,
//     title: "Fabricación de Stands",
//     subtitle: "Diseño, producción y montaje integral",
//     description:
//       "Transformamos ideas en espacios que comunican. Nos especializamos en el diseño, fabricación y montaje de stands para ferias, congresos y exposiciones, tanto nacionales como internacionales. Ofrecemos un servicio completo y personalizado, con entrega 'llave en mano', para que vivas la experiencia sin preocuparte por los detalles.",
//     ctaText: "Solicitar cotización",
//     imageUrl: "/assets/images/servicios/servicio1.webp",
//   },
//   {
//     id: 2,
//     title: "Carpintería y Ebanistería",
//     subtitle: "Madera que inspira confianza y estilo",
//     description:
//       "Creamos mobiliario y estructuras únicas con acabados de precisión artesanal. Fabricamos puertas, escaleras, pasamanos, armarios, mostradores y más, adaptándonos a cualquier necesidad de diseño interior o comercial. También realizamos instalación de suelos en madera, tarimas y parquet, con cobertura nacional e internacional.",
//     ctaText: "Conocer más",
//     imageUrl: "/assets/images/servicios/servicio2.webp",
//   },
// ];

const highlightWords = (text: string, words: string[]): React.ReactNode[] => {
  // Escapamos las palabras para regex
  const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // Creamos regex con global y case insensitive
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

  // Separamos el texto usando el regex
  const parts = text?.split(regex);

  return parts?.map((part, index) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    )
  );
};

const ServicesSection: React.FC = () => {
  const config = useConfig();
  const { categorias, servicioEditables } = (config as unknown as ConfigResponse).data;

  // useEffect(() => {
  //   console.log(servicioEditables[0].componente1.split(" ")[1]);
  // }, []);

  const servicesData = categorias.map((categoria) => ({
    ...categoria,
    imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/servicio_categoria/${categoria.imagen}`,
  }));

  // useEffect(() => {
  //   console.log(!servicioEditables[0].componente4);
  // }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD") // separa los acentos de las letras
      .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
      .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres especiales
      .trim() // elimina espacios al inicio y final
      .replace(/\s+/g, "-") // reemplaza espacios por guiones
      .replace(/-+/g, "-"); // evita guiones repetidos
  };

  const componentes = [
    servicioEditables[0]?.componente1,
    servicioEditables[0]?.componente2,
    servicioEditables[0]?.componente3,
    servicioEditables[0]?.componente4,
  ].filter((c) => c && c.trim() !== ""); // solo cuenta los que tienen texto

  const gridCols =
    componentes.length === 4
      ? "lg:grid-cols-4"
      : componentes.length === 3
      ? "lg:grid-cols-3"
      : componentes.length === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1";

  return (
    <section className="min-h-screen  py-20  bg-white">
      <div className="container mx-auto mb-20 px-4 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Columna izquierda - Número grande */}

          {/* Columna central - Título principal */}
          <div className="lg:col-span-6 space-y-4">
            <div className="overflow-hidden"></div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-primary font-sans uppercase  leading-[0.9] tracking-tight">
              {servicioEditables[0]?.titulo}
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-[2px] w-16 bg-secondary"></div>
              <span className="text-morado text-sm font-mono">¿Qué hacemos?</span>
            </div>
          </div>

          {/* Columna derecha - Descripción vertical */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="space-y-6">
              <p className="text-gray-800 text-base lg:text-lg leading-relaxed">
                {/* Experiencias visuales que transforman marcas en referentes de la industria. Tenemos
                presencia <strong>nacional</strong> o <strong>internacional</strong>. */}
                {highlightWords(servicioEditables[0]?.descripcion, ["nacional", "internacional"])}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group">
                  <span className="text-lg  duration-300 animate-bounce">↓</span>
                </div>
                <span className="text-sm text-gray-800">Explora nuestro portafolio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior con stats */}
        <div className="mt-12 pt-8 border-t border-primary/50">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${gridCols}  
            gap-6 text-center`}
          >
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">
                {servicioEditables[0]?.componente1.split(" ")[0]}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-800">
                {servicioEditables[0]?.componente1.split(" ").slice(1, 3).join(" ")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">
                {servicioEditables[0]?.componente2.split(" ")[0]}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-800">
                {servicioEditables[0]?.componente2.split(" ").slice(1, 3).join(" ")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">
                {servicioEditables[0]?.componente3.split(" ")[0]}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-800">
                {servicioEditables[0]?.componente3.split(" ").slice(1, 3).join(" ")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">
                {servicioEditables[0]?.componente4.split(" ")[0]}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-800">
                {servicioEditables[0]?.componente4.split(" ").slice(1, 3).join(" ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container   px-4 md:px-14 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl p-6 overflow-hidden shadow-lg  w-full transition-all duration-300 hover:shadow-2xl"
          >
            {/* Image Section */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={service.imagen}
                alt={service.titulo}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 text-center">
              {/* Title */}
              <h3 className="text-3xl font-bold text-primary font-sans mb-2 uppercase tracking-wide">
                {service.titulo}
              </h3>

              {/* Decorative Line */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-secondary rounded-full" />
              </div>

              {/* Description */}
              <p className="text-gray-800 text-justify text-base leading-relaxed mb-6 px-2">
                {service.descripcion}
              </p>

              {/* CTA Button */}
              <Link
                href={`/servicios/${generateSlug(service.titulo)}`}
                className={`w-full block  py-4 px-6 bg-primary text-white font-semibold rounded-2xl uppercase tracking-wide transition-all duration-300  hover:bg-secondary`}
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
