import adminApi from "../../../../api/admin.api";

export interface GaleriaResponse {
  id: string;
  imagen1: string;
  createdAt: string;
  updatedAt: string;
}

export const updateGaleriaAction = async (id: string, formData: FormData) => {
  formData.append("_method", "PUT");
  const response = await adminApi.post<GaleriaResponse>(
    `/galeria/${id}`,
    formData
  );
  return response.data;
};
