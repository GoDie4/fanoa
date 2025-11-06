"use client";

import { useConfig } from "../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

// const politicas = [
//   {
//     id: "aviso-legal",
//     titulo: "Aviso Legal",
//     descripcion: `
//       <p>Este es un ejemplo de contenido de Aviso Legal. Aquí irá el texto completo del aviso.</p>
//     `,
//   },
//   {
//     id: "politica-privacidad",
//     titulo: "Política de Privacidad",
//     descripcion: `
//       <p>Este es un ejemplo de contenido de Política de Privacidad. Aquí irá la descripción completa.</p>
//     `,
//   },
//   {
//     id: "cookies",
//     titulo: "Política de Cookies",
//     descripcion: `
//       <p>Este es un ejemplo de contenido de Política de Cookies. Aquí irá la descripción completa.</p>
//     `,
//   },
// ];

export default function AvisoLegalPage() {
  const config = useConfig();
  const { politicas } = (config as unknown as ConfigResponse).data;

  const avisoLegal = politicas.at(-1);

  // const [lastUpdated] = useState("5 de noviembre de 2025");

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 lg:py-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 📄 Contenido principal */}
          <main className="lg:col-span-8">
            {/* {lastUpdated && (
              <p className="mb-6 text-gray-500 text-sm">
                Última actualización: <span className="font-medium">{lastUpdated}</span>
              </p>
            )} */}

            <div className="space-y-12">
              {/* {politicas.map((p) => ( */}
              <article
                /* key={p.id} id={p.id} */ className={"transition-all duration-500 opacity-100"}
              >
                <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-primary transition-colors duration-300">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                    {avisoLegal?.titulo}
                  </h2>

                  {/* Renderiza el HTML del backend */}
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: avisoLegal?.descripcion as string }}
                  />
                </div>
              </article>
              {/* ))} */}
            </div>
          </main>
          {/* </div> */}
        </div>
      </section>
    </div>
  );
}
