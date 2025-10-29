import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

export interface BannerSecundarioResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

const { VITE_API_DEFAULT } = getEnvs();

export const getAllBannerSecundarioAction = async (): Promise<BannerSecundarioResponse[]> => {
  const { data } = await adminApi.get<BannerSecundarioResponse[]>("/bsecundarios");
  return data.map((data) => ({
    ...data,
    imagen: `${VITE_API_DEFAULT}/uploads/banners-secundarios/${data.imagen}`,
  }));
};
