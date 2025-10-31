import { Metadata } from "next";
import { Banner } from "../_components/estructura/Banner";
import AboutSection from "../_components/secciones/NosotrosSeccion";
export const metadata: Metadata = {
  title:
    "Nosotros | Grupo Fanoa - Empresa de Stands y Carpintería Personalizada",
  description:
    "Conoce a Grupo Fanoa, empresa líder en fabricación de stands de diseño y carpintería de madera personalizada en Madrid. Comprometidos con la calidad y la innovación.",
  keywords: [
    "empresa de stands en Madrid",
    "fabricación de stands de diseño",
    "carpintería de madera personalizada",
    "diseño y montaje de stands",
    "Grupo Fanoa Madrid",
  ],
  openGraph: {
    title: "Grupo Fanoa | Empresa de Stands y Carpintería Personalizada",
    description:
      "Fabricación de stands de diseño y carpintería personalizada. Grupo Fanoa: experiencia, compromiso y excelencia artesanal.",
    url: "https://grupofanoa.com/nosotros",
    siteName: "Grupo Fanoa",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://www.grupofanoa.com/assets/images/slides/slide1.webp",
        width: 1200,
        height: 630,
        alt: "Equipo de trabajo de Grupo Fanoa en taller de carpintería",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Grupo Fanoa - Stands y Carpintería en Madrid",
    description:
      "Somos una empresa especializada en stands feriales y carpintería personalizada. Conoce nuestra historia y compromiso.",
    images: ["https://www.grupofanoa.com/assets/images/slides/slide1.webp"],
  },
  alternates: {
    canonical: "https://grupofanoa.com/nosotros",
  },
};

export default function page() {
  return (
    <>
      <Banner title="Nosotros" id="nosotros" />
      <AboutSection />
    </>
  );
}
