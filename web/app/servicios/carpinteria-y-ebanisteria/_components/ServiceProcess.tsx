"use client";

import { useEffect } from "react";
import { useConfig } from "../../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

export const ServiceProcess = () => {
  const config = useConfig();
  const { categorias } = (config as unknown as ConfigResponse).data;

  // useEffect(() => {
  const serviceData = categorias[1]?.trabajos.map((trabajo) => ({
    ...trabajo,
    imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/trabajo/${trabajo.imagen}`,
  }));

  // useEffect(() => {
  //   console.log({ serviceData });
  // }, []);

  if (!serviceData) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Nuestro Proceso</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary font-sans mt-4">
            Cómo Trabajamos
          </h2>
        </div>

        <div className="space-y-16">
          {serviceData.map((trabajo, index) => (
            <div key={trabajo.id || index} className="group">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={`lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-9" : ""}`}>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={trabajo.imagen}
                      alt={trabajo.titulo || "Trabajo"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                      {trabajo.titulo}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                      {trabajo.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
