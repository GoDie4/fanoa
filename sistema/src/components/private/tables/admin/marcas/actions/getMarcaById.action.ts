import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

const { VITE_API_DEFAULT } = getEnvs();

export interface MarcaResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

export const getMarcaById = async (id: string): Promise<MarcaResponse> => {
  const response = await adminApi.get<MarcaResponse>(`/feria/${id}`);
  return {
    ...response.data,
    imagen: `${VITE_API_DEFAULT}/uploads/feria/${response.data.imagen}`,
  };
};
