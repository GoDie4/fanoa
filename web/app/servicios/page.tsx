import { Metadata } from "next";
import { Banner } from "../_components/estructura/Banner";
import { WhySection } from "../_components/secciones/nosotros/WhySection";
import ServicesSection from "../_components/secciones/ServiciosSeccion";
export const metadata: Metadata = {
  title: "Servicios | Grupo Fanoa - Diseño y Montaje de Stands en Madrid",
  description:
    "Ofrecemos servicios de diseño, fabricación y montaje de stands para ferias, además de carpintería a medida y muebles personalizados en Madrid.",
  keywords: [
    "diseño y montaje de stands para ferias",
    "stands llave en mano",
    "carpintería a medida",
    "fabricación de muebles en Madrid",
    "montaje de stands nacionales e internacionales",
  ],
  openGraph: {
    title: "Servicios | Grupo Fanoa - Stands Feriales y Carpintería",
    description:
      "Diseño y montaje de stands, carpintería personalizada y muebles a medida. Grupo Fanoa combina creatividad y precisión técnica.",
    url: "https://grupofanoa.com/servicios",
    siteName: "Grupo Fanoa",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://www.grupofanoa.com/assets/images/slides/slide2.webp",
        width: 1200,
        height: 630,
        alt: "Montaje de stands feriales y carpintería personalizada en Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | Grupo Fanoa - Stands y Carpintería Profesional",
    description:
      "Expertos en diseño y fabricación de stands feriales, carpintería y mobiliario a medida. Conoce nuestros servicios personalizados.",
    images: ["https://www.grupofanoa.com/assets/images/slides/slide2.webp"],
  },
  alternates: {
    canonical: "https://grupofanoa.com/servicios",
  },
};

export default function page() {
  return (
    <>
      <Banner title="Servicios" id="servicios" />
      <ServicesSection />
      <WhySection />
    </>
  );
}
