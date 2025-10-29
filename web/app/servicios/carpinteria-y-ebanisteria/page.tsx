/* eslint-disable @next/next/no-img-element */
import { Mail, Phone } from "lucide-react";
import { DetailsServicioGallery } from "../_components/DetailsServicioGallery";
import Link from "next/link";
import { ServiceHero } from "./_components/ServiceHero";
import { AdditionalService } from "./_components/AdditionalService";
import { ServiceProcess } from "./_components/ServiceProcess";

interface Feature {
  title: string;
  image: string;
}

export interface ServiceData {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: Feature[];
  process: ProcessStep[];
  benefits: Benefit[];
  gallery: GalleryImage[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

// Datos de ejemplo - puedes cambiarlos por los reales
// const serviceData: ServiceData = {
//   id: 2,
//   title: "Carpintería y Ebanistería",
//   subtitle: "Artesanía en madera de alta calidad",
//   heroImage: "/assets/images/servicios/servicio2.webp",
//   description:
//     "Especialistas en la fabricación de muebles y estructuras de madera a medida. Combinamos técnicas tradicionales de ebanistería con tecnología moderna para crear piezas únicas que perduran en el tiempo. Cada proyecto es una obra de arte funcional.",
//   features: [
//     {
//       title: "Muebles a medida",
//       image: "/assets/images/features/feature4.webp",
//     },
//     {
//       title: "Muebles de oficina",
//       image: "/assets/images/features/feature5.webp",
//     },
//     {
//       title: "Muebles de cocina",
//       image: "/assets/images/features/feature6.webp",
//     },
//     {
//       title: "Mueble de baño",
//       image: "/assets/images/features/feature7.webp",
//     },
//     {
//       title: "Escaleras y barandillas",
//       image: "/assets/images/features/feature8.webp",
//     },
//     {
//       title: "Puertas de entrada y de paso",
//       image: "/assets/images/features/feature9.webp",
//     },
//     {
//       title: "Armarios y vestidores",
//       image: "/assets/images/features/feature10.webp",
//     },
//     {
//       title: "Suelos, tarimas y parquets",
//       image: "/assets/images/features/feature11.webp",
//     },
//   ],
//   process: [
//     {
//       number: "01",
//       title: "Consulta y Diseño",
//       description:
//         "Nos reunimos contigo para entender tu visión, estilo y necesidades específicas. Adaptamos los planos de tu proyecto para que visualices el resultado final antes de iniciar la producción.",
//       image: "/assets/images/procesos/proceso4.webp",
//     },
//     {
//       number: "02",
//       title: "Selección de Materiales",
//       description:
//         "Trabajamos con maderas nobles y certificadas: roble, nogal, cedro, caoba y más. Te asesoramos en la mejor elección según durabilidad, estética y presupuesto.",
//       image: "/assets/images/procesos/proceso5.webp",
//     },
//     {
//       number: "03",
//       title: "Fabricación Artesanal",
//       description:
//         "Nuestros maestros ebanistas trabajan cada pieza con precisión milimétrica, combinando herramientas manuales tradicionales con maquinaria CNC de última generación para garantizar calidad y exactitud.",
//       image: "/assets/images/procesos/proceso6.webp",
//     },
//     {
//       number: "04",
//       title: "Acabado e Instalación",
//       description:
//         "Aplicamos tratamientos de protección, barnices, lacas o aceites naturales según el uso previsto. Realizamos la instalación in situ con cuidado extremo y ajustes finales para una integración perfecta en tu espacio.",
//       image: "/assets/images/procesos/proceso7.webp",
//     },
//   ],
//   benefits: [
//     {
//       title: "Maestría Comprobada",
//       description: "Más de 20 años de experiencia en carpintería fina y ebanistería de alto nivel.",
//     },
//     {
//       title: "Materiales Premium",
//       description:
//         "Solo trabajamos con maderas nobles seleccionadas y certificadas sosteniblemente.",
//     },
//     {
//       title: "Garantía Extendida",
//       description:
//         "Todos nuestros trabajos cuentan con garantía de 5 años en estructura y acabados.",
//     },
//     {
//       title: "Servicio Personalizado",
//       description: "Desde el diseño hasta la instalación, cada proyecto recibe atención exclusiva.",
//     },
//   ],
//   gallery: [
//     {
//       id: 1,
//       url: "/assets/images/galeria/galeria10.webp",
//       title: "Stand Corporativo Tech",
//     },
//     {
//       id: 2,
//       url: "/assets/images/galeria/galeria12.webp",
//       title: "Espacio Interactivo",
//     },
//     {
//       id: 3,
//       url: "/assets/images/galeria/galeria13.webp",
//       title: "Stand Minimalista",
//     },
//     {
//       id: 4,
//       url: "/assets/images/galeria/galeria14.webp",
//       title: "Diseño Modular",
//     },
//     {
//       id: 5,
//       url: "/assets/images/galeria/galeria15.webp",
//       title: "Stand Premium",
//     },
//     {
//       id: 6,
//       url: "/assets/images/galeria/galeria11.webp",
//       title: "Evento Corporativo",
//     },
//   ],
// };

const ServiceDetailView: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section con Parallax */}
      <ServiceHero />

      {/* Features Section */}
      <AdditionalService />

      {/* Process Timeline */}
      <ServiceProcess />

      {/* Gallery Section */}
      <DetailsServicioGallery alias="first" />

      {/* Benefits Section */}
      {/* <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
              Por Qué Elegirnos
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-8 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-300">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Final */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
              Siguiente Paso
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black max-w-2xl mx-auto text-primary font-sans leading-tight">
            ¿Hablamos de tu proyecto?
          </h2>

          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Cuéntanos tu visión y te enviaremos una propuesta personalizada en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={"/contacto"}
              className="group px-10 py-3 bg-primary text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center gap-3">
                Solicitar Cotización
                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </span>
            </Link>

            <Link
              href={"/galeria"}
              className="px-10 py-3 bg-transparent text-black font-bold text-lg rounded-full border-2 border-black/20 hover:border-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Ver más proyectos
            </Link>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <span>
                  <Mail className="text-primary" />
                </span>
              </div>
              <span>info@grupofanoa.com</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <span>
                  <Phone className="text-primary" />
                </span>
              </div>
              <span>+34 614 122 826</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailView;
