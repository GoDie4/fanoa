 

import { Mail, Phone } from "lucide-react";
import { DetailsServicioGallery } from "../_components/DetailsServicioGallery";
import Link from "next/link";
import { ServiceHero } from "./_components/ServiceHero";
import { AdditionalService } from "./_components/AdditionalService";
import { ServiceProcess } from "./_components/ServiceProcess";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Fabricación de Stands | Grupo Fanoa - Diseño y Montaje Profesional",
    description:
      "Fabricamos stands de diseño personalizados para ferias y eventos. En Grupo Fanoa ofrecemos soluciones llave en mano con montaje nacional e internacional.",
    keywords: [
      "fabricación de stands de diseño",
      "diseño y montaje de stands para ferias",
      "stands llave en mano",
      "empresa de stands en Madrid",
      "montaje de stands nacionales e internacionales",
    ],
    openGraph: {
      title: "Fabricación de Stands | Grupo Fanoa - Stands de Diseño en Madrid",
      description:
        "Diseñamos y fabricamos stands feriales personalizados. Grupo Fanoa ofrece servicio integral: diseño, producción y montaje de stands llave en mano.",
      url: "https://grupofanoa.com/servicios/fabricacion-de-stands",
      siteName: "Grupo Fanoa",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: "https://www.grupofanoa.com/assets/images/servicios/servicio1.webp",
          width: 1200,
          height: 630,
          alt: "Fabricación de stands de diseño y montaje ferial en Madrid",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fabricación de Stands | Grupo Fanoa - Diseño y Montaje Llave en Mano",
      description:
        "Expertos en fabricación y montaje de stands para ferias. Grupo Fanoa ofrece soluciones creativas, personalizadas y de alta calidad.",
      images: [
        "https://www.grupofanoa.com/assets/images/servicios/servicio1.webp",
      ],
    },
    alternates: {
      canonical: "https://grupofanoa.com/servicios/fabricacion-de-stands",
    },
  };
  
// Datos de ejemplo - puedes cambiarlos por los reales
// const serviceData: ServiceData = {
//   id: 1,
//   title: "Fabricación de Stands",
//   subtitle: "Espacios que cuentan historias",
//   heroImage: "/assets/images/servicios/servicio1.webp",
//   description:
//     "Ofrecemos servicios de diseño, fabricación y montaje de stands para ferias y congresos tanto nacionales como internacionales. Nos encargamos de todo el proceso, para que no tengas que preocuparte por nada. Convertimos tus ideas en realidades con un servicio integral, sin sorpresas y con resultados garantizados.",
//   features: [
//     {
//       title: "Stands de diseño",
//       image: "/assets/images/features/feature1.webp",
//     },
//     {
//       title: "Stands Modulares",
//       image: "/assets/images/features/feature2.webp",
//     },
//     {
//       title: "Stands promocionales",
//       image: "/assets/images/features/feature3.webp",
//     },
//   ],
//   process: [
//     {
//       number: "01",
//       title: "Diseño Personalizado",
//       description:
//         "Nuestro equipo de diseño trabajará contigo para entender tus necesidades y requisitos, creando bocetos y renders 3D exclusivos para tu stand. Este servicio inicial es completamente gratuito y sin compromiso, porque creemos en el valor de nuestras propuestas.",
//       image: "/assets/images/procesos/proceso1.webp",
//     },
//     {
//       number: "02",
//       title: "Fabricación",
//       description:
//         "Una vez aprobado el diseño, comenzamos con la fabricación. Seleccionamos los materiales más adecuados y construimos la estructura del stand, incorporando elementos gráficos, audiovisuales y decorativos para crear un espacio que destaque.",
//       image: "/assets/images/procesos/proceso2.webp",
//     },
//     {
//       number: "03",
//       title: "Montaje de Stands",
//       description:
//         "Realizamos el montaje directamente en el lugar del evento, transportando todos los materiales necesarios, incluyendo iluminación, decoración y mobiliario. Nuestro personal cualificado garantiza: solución de montajes complejos, resolución de imprevistos, instalaciones en tiempo récord, con todas las garantías de calidad. Al finalizar el evento, también nos encargamos del desmontaje, asegurando el máximo aprovechamiento de los materiales y el cumplimiento de las normativas.",
//       image: "/assets/images/procesos/proceso3.webp",
//     },
//   ],
//   benefits: [
//     {
//       title: "Experiencia Comprobada",
//       description: "Más de 150 stands exitosos en ferias nacionales e internacionales.",
//     },
//     {
//       title: "Equipo Multidisciplinario",
//       description: "Arquitectos, diseñadores y productores trabajando en tu proyecto.",
//     },
//     {
//       title: "Tecnología de Punta",
//       description: "Renders fotorrealistas y recorridos virtuales antes de producir.",
//     },
//     {
//       title: "Servicio Integral",
//       description: "Desde el diseño hasta el desmontaje, nos encargamos de todo.",
//     },
//   ],
//   gallery: [
//     {
//       id: 1,
//       url: "/assets/images/galeria/galeria1.webp",
//       title: "Stand Corporativo Tech",
//     },
//     {
//       id: 2,
//       url: "/assets/images/galeria/galeria2.webp",
//       title: "Espacio Interactivo",
//     },
//     {
//       id: 3,
//       url: "/assets/images/galeria/galeria3.webp",
//       title: "Stand Minimalista",
//     },
//     {
//       id: 4,
//       url: "/assets/images/galeria/galeria4.webp",
//       title: "Diseño Modular",
//     },
//     {
//       id: 5,
//       url: "/assets/images/galeria/galeria9.webp",
//       title: "Stand Premium",
//     },
//     {
//       id: 6,
//       url: "/assets/images/galeria/galeria8.webp",
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
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Qué Incluye</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary font-sans uppercase mt-4 leading-tight">
              SERVICIOS QUE OFRECEMOS
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mt-6 max-w-3xl mx-auto">
              Nuestro servicio integral cubre cada aspecto del proyecto, desde la conceptualización
              hasta la ejecución final.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mt-6 max-w-3xl mx-auto">
              Tenemos presencia <strong>nacional e internacional.</strong>
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2  gap-6 ${
              serviceData.features.length < 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {serviceData.features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-500 cursor-pointer hover:shadow-2xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-7xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 absolute top-4 right-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative">
                    <div className="w-12 h-1 bg-primary mb-3 group-hover:w-20 transition-all duration-500"></div>
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:translate-y-[-4px] transition-transform duration-500">
                      {feature.title}
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
      </section> */}
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
              href={"/galeria/stands"}
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
