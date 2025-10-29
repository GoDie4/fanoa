/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WhySection } from "./nosotros/WhySection";

const AboutSection: React.FC = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);

  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });
  const isCommitmentInView = useInView(commitmentRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="bg-white">
      {/* Información de la Empresa */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 50 }}
            animate={
              isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Columna Izquierda - Texto */}
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInfoInView ? { width: 64 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-[2px] bg-secondary"
                />
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black text-primary uppercase leading-[0.9] tracking-tight">
                  Nosotros
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-base lg:text-lg leading-relaxed">
                <p>
                  En Grupo Fanoa, somos especialistas en materializar ideas y
                  convertirlas en realidades tangibles. Desde nuestros inicios,
                  nos hemos dedicado con pasión y profesionalismo a la
                  fabricación de stands feriales, así como a la carpintería y
                  ebanistería de alta calidad. Con una trayectoria de varios
                  años en el sector, hemos consolidado nuestro lugar como
                  referentes en el diseño y creación de proyectos personalizados
                  en madera.
                </p>
                <p>
                  Nuestro equipo está compuesto por artesanos y profesionales
                  altamente cualificados que comparten un compromiso
                  inquebrantable con la excelencia. En Grupo Fanoa, entendemos
                  que cada proyecto es único, y trabajamos de la mano con
                  nuestros clientes para garantizar que cada detalle refleje su
                  visión y necesidades.
                </p>
                <p className="font-bold text-secondary">
                  Nuestras especialidades son los stands feriales, carpintería y
                  ebanistería de precisión.
                </p>
              </div>
            </div>

            {/* Columna Derecha - Imagen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInfoInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="max-h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/nosotros/nosotros.webp"
                  alt="Nuestro equipo"
                  className="w-full h-full object-cover "
                />
              </div>
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <WhySection />

      {/* Compromiso y Confianza */}
      <section
        ref={commitmentRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isCommitmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isCommitmentInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/nosotros/nosotros2.webp"
                  alt="Compromiso y confianza"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent rounded-2xl flex items-end p-8">
                <p className="text-white text-2xl font-bold">
                  Tu éxito, nuestro compromiso
                </p>
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                isCommitmentInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-10"
            >
              <div>
                <div className="h-[2px] w-16 bg-secondary mb-4" />
                <h2 className="text-4xl md:text-5xl font-sans font-black text-primary uppercase leading-tight">
                  Nuestro compromiso y{" "}
                  <span className="text-secondary">su confianza</span>
                </h2>
              </div>

              {/* Bloque 1 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold  text-gray-950">
                  Nuestro compromiso
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Es llevar a cabo de principio a fin cualquier proyecto en
                  madera y fabricación de stands feriales, sin sorpresas. Todo
                  está incluido y detallado, asegurando un proceso transparente
                  en cada etapa hasta su finalización.
                </p>
              </div>

              {/* Bloque 2 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold  text-gray-950">
                  Su confianza
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Entendemos la dificultad de elegir a la empresa adecuada para
                  materializar sus proyectos. Por eso, le pedimos que confíe en
                  nosotros: nos encargamos de convertir su visión en realidad,
                  cuidando cada detalle con profesionalismo y dedicación.
                </p>
              </div>

              {/* Iconos o valores */}
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  "Puntualidad garantizada",
                  "Calidad certificada",
                  "Soporte constante",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
