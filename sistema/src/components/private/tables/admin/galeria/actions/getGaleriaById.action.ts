import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

const { VITE_API_DEFAULT } = getEnvs();

export interface GaleriaResponse {
  id: string;
  imagen1: string;
  createdAt: string;
  updatedAt: string;
}

export const getGaleriaById = async (id: string): Promise<GaleriaResponse> => {
  const response = await adminApi.get<GaleriaResponse>(`/galeria/${id}`);
  return {
    ...response.data,
    imagen1: `${VITE_API_DEFAULT}/uploads/galeria/${response.data.imagen1}`,
  };
};
