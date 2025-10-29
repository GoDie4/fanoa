import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

export interface MarcaResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

const { VITE_API_DEFAULT } = getEnvs();

export const getAllMarcasAction = async () => {
  const allMarcas = await adminApi.get<MarcaResponse[]>("/feria");

  return allMarcas.data.map((marca) => ({
    ...marca,
    imagen: `${VITE_API_DEFAULT}/uploads/feria/${marca.imagen}`,
  }));
};
