import { Banner } from "../../_components/estructura/Banner";
import Gallery from "../../_components/secciones/GaleriaSeccion";

interface Props {
  params: {
    nombre: string;
  };
}

export default function GaleriaFiltradaPage({ params }: Props) {
  return (
    <>
      <Banner title={`Galería`} id="galeria" />
      <Gallery filtro={params?.nombre} />
    </>
  );
}
