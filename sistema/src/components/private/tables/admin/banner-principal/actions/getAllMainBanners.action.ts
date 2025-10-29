import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

export interface BannerPrincipalResponse {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  textoBoton: string;
  createdAt: string;
  updatedAt: string;
}

const { VITE_API_DEFAULT } = getEnvs();

export const getAllMainBannersAction = async () => {
  const allMainBanners = await adminApi.get<BannerPrincipalResponse[]>("/bprincipales");

  return allMainBanners.data.map((banner) => ({
    ...banner,
    imagen: `${VITE_API_DEFAULT}/uploads/banners-principales/${banner.imagen}`,
  }));
};
