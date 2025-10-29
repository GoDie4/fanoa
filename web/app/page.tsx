import ContactSection from "./_components/secciones/ContactoSeccion";
import CTASection from "./_components/secciones/CTASeccion";
import FeriasCarousel from "./_components/secciones/FeriasSeccion";
import Gallery from "./_components/secciones/GaleriaSeccion";
import { WhySection } from "./_components/secciones/nosotros/WhySection";
import ServicesSection from "./_components/secciones/ServiciosSeccion";
import StandShowcaseSlider from "./_components/slides/SlidePrincipal";

export default function Home() {
  return (
    <>
      <StandShowcaseSlider />
      <FeriasCarousel />
      <ServicesSection />
      <CTASection />
      <Gallery />
      <WhySection />
      <ContactSection />
    </>
  );
}
