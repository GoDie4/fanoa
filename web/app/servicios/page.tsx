import { Banner } from "../_components/estructura/Banner";
import { WhySection } from "../_components/secciones/nosotros/WhySection";
import ServicesSection from "../_components/secciones/ServiciosSeccion";

export default function page() {
  return (
    <>
      <Banner title="Servicios" id="servicios" />
      <ServicesSection />
      <WhySection />
    </>
  );
}
