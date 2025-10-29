import { Banner } from "../_components/estructura/Banner";
import Gallery from "../_components/secciones/GaleriaSeccion";

export default function page() {
  return (
    <>
      <Banner title="Galería" id="galeria" />
      <Gallery />
    </>
  );
}
