import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

const { VITE_API_DEFAULT } = getEnvs();

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

export const getServicioCategoriaById = async (id: string): Promise<BannerPrincipalResponse> => {
  const response = await adminApi.get<BannerPrincipalResponse>(`/bprincipales/${id}`);
  return {
    ...response.data,
    imagen: `${VITE_API_DEFAULT}/uploads/banners-principales/${response.data.imagen}`,
  };
};
