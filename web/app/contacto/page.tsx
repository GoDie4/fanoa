import { Banner } from "../_components/estructura/Banner";
import ContactSection from "../_components/secciones/ContactoSeccion";

export default function page() {
  return (
    <>
      <Banner title="Contacto" id="contacto" />
      <ContactSection renderTitle={false} />
    </>
  );
}
