import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

export interface BannerSecundarioResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

const { VITE_API_DEFAULT } = getEnvs();

export const getOneBannerSecundarioAction = async (
  id: string
): Promise<BannerSecundarioResponse> => {
  const { data } = await adminApi.get<BannerSecundarioResponse>(`/bsecundarios/${id}`);
  return {
    ...data,
    imagen: `${VITE_API_DEFAULT}/uploads/banners-secundarios/${data.imagen}`,
  };
};
