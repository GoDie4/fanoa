import adminApi from "../../../../api/admin.api";

export interface GaleriaResponse {
  id: string;
  imagen1: string;
  createdAt: string;
  updatedAt: string;
}

export const updateGaleriaAction = async (id: string, formData: FormData) => {
  const response = await adminApi.put<GaleriaResponse>(`/galeria/${id}`, formData);
  return response.data;
};
