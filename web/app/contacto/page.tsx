import { Metadata } from "next";
import { Banner } from "../_components/estructura/Banner";
import ContactSection from "../_components/secciones/ContactoSeccion";
export const metadata: Metadata = {
    title: "Contacto | Grupo Fanoa - Empresa de Stands y Carpintería en Madrid",
    description:
      "Ponte en contacto con Grupo Fanoa para tu próximo proyecto de stands o carpintería personalizada. Asesoría directa y presupuestos sin compromiso.",
    keywords: [
      "contacto Grupo Fanoa",
      "empresa de stands en Madrid",
      "carpintería muebles a medida",
      "fabricación de stands para ferias",
      "carpintería de madera en Madrid",
    ],
    openGraph: {
      title: "Contacto | Grupo Fanoa - Fabricación de Stands y Carpintería",
      description:
        "Contáctanos para diseñar y fabricar tu stand o proyecto de carpintería a medida. Grupo Fanoa: soluciones profesionales en Madrid.",
      url: "https://grupofanoa.com/contacto",
      siteName: "Grupo Fanoa",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: "https://www.grupofanoa.com/assets/images/slides/slide1.webp",
          width: 1200,
          height: 630,
          alt: "Contacto con Grupo Fanoa para proyectos de stands y carpintería",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contacto | Grupo Fanoa - Stands y Carpintería Personalizada",
      description:
        "Comunícate con Grupo Fanoa para proyectos de carpintería y stands feriales. Atención profesional en toda España.",
      images: ["https://www.grupofanoa.com/assets/images/slides/slide1.webp"],
    },
    alternates: {
      canonical: "https://grupofanoa.com/contacto",
    },
  };
  
export default function page() {
  return (
    <>
      <Banner title="Contacto" id="contacto" />
      <ContactSection renderTitle={false} />
    </>
  );
}
