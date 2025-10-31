import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

export const deleteServicioCategoria = async (id: string): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.post<ServicioCategoriaResponse>(`/scategorias/${id}`);
  return response.data;
};
