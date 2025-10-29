import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

export const updateServicioCategoria = async (
  id: string,
  formData: FormData
): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.put<ServicioCategoriaResponse>(`/scategorias/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
