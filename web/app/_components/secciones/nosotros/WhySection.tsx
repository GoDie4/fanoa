"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { LucideIcon } from "lucide-react";

interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}
import { Diamond, Lightbulb, Handshake } from "lucide-react";

const whyChooseUs: WhyChooseItem[] = [
  //   {
  //     id: 1,
  //     title: "Experiencia",
  //     description:
  //       "Nuestra trayectoria nos respalda, con proyectos realizados para clientes de diversos sectores y exigencias.",
  //     icon: Award, // 🏆
  //   },
  {
    id: 2,
    title: "Calidad",
    description:
      "Sólo trabajamos con materiales de primera clase y prestamos atención a cada detalle para garantizar resultados excepcionales.",
    icon: Diamond, // ✨
  },
  {
    id: 3,
    title: "Innovación",
    description:
      "Nos mantenemos a la vanguardia en tendencias y tecnologías para ofrecer soluciones modernas y eficientes.",
    icon: Lightbulb, // 🤝
  },
  {
    id: 4,
    title: "Compromiso",
    description:
      "La satisfacción de nuestros clientes es nuestra prioridad. Nos esforzamos por superar sus expectativas en cada proyecto.",
    icon: Handshake, // 📊
  },
];

export const WhySection = () => {
  const whyRef = useRef<HTMLDivElement>(null);
  const isWhyInView = useInView(whyRef, { once: true, margin: "-100px" });

  return (
    <section ref={whyRef} className="py-20  ">
      <div className="container mx-auto px-4 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isWhyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-secondary" />
            <span className="text-sm font-mono text-gray-600">¿POR QUÉ NOSOTROS?</span>
            <div className="h-[2px] w-12 bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-primary uppercase">
            Por qué elegirnos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isWhyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="text-5xl mb-4  transition-transform duration-300">
                <item.icon className="w-12 h-12 text-primary transition-transform duration-300 " />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              <div className="mt-6 h-1 w-12 bg-secondary rounded-full group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
