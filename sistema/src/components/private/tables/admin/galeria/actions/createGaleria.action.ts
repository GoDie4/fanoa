import adminApi from "../../../../api/admin.api";

export interface GaleriaResponse {
  id: string;
  imagen1: string;
  createdAt: string;
  updatedAt: string;
}

export const createGaleriaAction = async (data: FormData) => {
  const galeria = await adminApi.post<GaleriaResponse>("/galeria", data);
  return galeria.data;
};
