import adminApi from "../../../../api/admin.api";

export interface MarcaResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

export const updateMarcaAction = async (id: string, formData: FormData) => {
  const response = await adminApi.put<MarcaResponse>(`/feria/${id}`, formData);
  return response.data;
};