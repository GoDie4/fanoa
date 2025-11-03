import { Metadata } from "next";
import { Banner } from "../_components/estructura/Banner";
import Gallery from "../_components/secciones/GaleriaSeccion";

export const metadata: Metadata = {
    title: "Galería | Grupo Fanoa - Stands y Carpintería en Madrid",
    description:
      "Explora nuestra galería de proyectos: stands feriales, carpintería de madera y muebles personalizados realizados por Grupo Fanoa en Madrid y toda España.",
    keywords: [
      "diseño de stands en Madrid",
      "carpintería de madera en Madrid",
      "montaje de stands feriales",
      "talleres de carpintería de madera",
      "fabricación de stands para ferias",
    ],
    openGraph: {
      title: "Galería | Grupo Fanoa - Proyectos en Madera y Stands",
      description:
        "Conoce nuestros proyectos de carpintería y stands feriales. Galería de trabajos realizados por Grupo Fanoa en ferias nacionales e internacionales.",
      url: "https://grupofanoa.com/galeria",
      siteName: "Grupo Fanoa",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: "https://www.grupofanoa.com/assets/images/slides/slide3.webp",
          width: 1200,
          height: 630,
          alt: "Galería de stands feriales y carpintería de madera en Madrid",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Galería | Grupo Fanoa - Diseño de Stands y Carpintería",
      description:
        "Inspírate con nuestros stands y trabajos de carpintería personalizados. Proyectos realizados con precisión y creatividad.",
      images: ["https://www.grupofanoa.com/assets/images/slides/slide3.webp"],
    },
    alternates: {
      canonical: "https://grupofanoa.com/galeria",
    },
  };
  

export default function page() {
  return (
    <>
      <Banner title="Galería" id="galeria" />
      <Gallery />
    </>
  );
}
