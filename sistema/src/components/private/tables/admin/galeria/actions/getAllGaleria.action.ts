import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";

export interface GaleriaResponse {
  id: string;
  imagen1: string;
  createdAt: string;
  updatedAt: string;
}

const { VITE_API_DEFAULT } = getEnvs();

export const getAllGaleriaAction = async () => {
  const allGaleria = await adminApi.get<GaleriaResponse[]>("/galeria");

  return allGaleria.data.map((galeria) => ({
    ...galeria,
    imagen1: `${VITE_API_DEFAULT}/uploads/galeria/${galeria.imagen1}`,
  }));
};
