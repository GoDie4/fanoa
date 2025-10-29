"use client";

import { ConfigResponse } from "@/models/generalData";
import { useConfig } from "../../../_context/ConfigContext";

export const AdditionalService = () => {
  const config = useConfig();
  const { categorias } = (config as unknown as ConfigResponse).data;

  const serviceData = categorias[1] && {
    ...categorias[1],
    serviciosAdicionales: categorias[1]?.serviciosAdicionales.map((s) => ({
      ...s,
      imagen: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/servicio_adicional/${s.imagen}`,
    })),
  };

  // useEffect(() => {
  //   console.log(categorias[0]);
  // }, []);

  if (!serviceData) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Qué Incluye</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary font-sans uppercase mt-4 leading-tight">
            {serviceData.miniTitulo}
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed mt-6 max-w-3xl mx-auto">
            {serviceData.miniDescripcion}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-6 max-w-3xl mx-auto">
            Tenemos presencia <strong>nacional e internacional.</strong>
          </p>
        </div>

        {/* Grid de Servicios Adicionales */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
            serviceData.serviciosAdicionales.length < 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
        >
          {serviceData.serviciosAdicionales.map((servicio, index) => (
            <div
              key={servicio.id}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-500 cursor-pointer hover:shadow-2xl"
            >
              {/* Imagen de fondo */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-7xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 absolute top-4 right-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="w-12 h-1 bg-primary mb-3 group-hover:w-20 transition-all duration-500"></div>
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:translate-y-[-4px] transition-transform duration-500">
                    {servicio.titulo}
                  </h3>
                </div>
              </div>

              <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
