"use client";
import React, { useEffect, useState } from "react";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const config = useConfig();
  const { politicas } = (config as unknown as ConfigResponse).data;

  useEffect(() => {
    if (politicas.length > 0) {
      setActiveSection(politicas[0].id);

      console.log({politicas});
      // Obtener la última fecha de actualización
      const latestDate = politicas
        .map((p) => new Date(p.updatedAt))
        .sort((a, b) => b.getTime() - a.getTime())[0];

      setLastUpdated(
        latestDate.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    }
  }, [politicas]);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 lg:py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* 📚 Sidebar de navegación */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-4">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-sm uppercase tracking-wider text-gray-800 font-semibold mb-4">
                    Índice de Contenidos
                  </h3>
                  <nav className="space-y-2">
                    {politicas.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveSection(p.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === p.id
                            ? "bg-primary text-white font-semibold"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {p.titulo}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* 💬 Tarjeta de contacto */}
                <div className="bg-primary rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">¿Tienes dudas?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Contacta con nuestro Delegado de Protección de Datos
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">📧</span>
                      <span>info@grupofanoa.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">📍</span>
                      <span>C/Hierro nº 25 – POL. IND. BORONDO 28510, Campo Real, Madrid.</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* 📄 Contenido principal */}
            <main className="lg:col-span-8">
              {/* Última actualización */}
              {lastUpdated && (
                <p className="mb-6 text-gray-500 text-sm">
                  Última actualización: <span className="font-medium">{lastUpdated}</span>
                </p>
              )}

              <div className="space-y-12">
                {politicas.map((p) => (
                  <article
                    key={p.id}
                    id={p.id}
                    className={`transition-all duration-500 ${
                      activeSection === p.id ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-primary transition-colors duration-300">
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                        {p.titulo}
                      </h2>

                      {/* Renderiza el HTML del backend */}
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: p.descripcion }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
