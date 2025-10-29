import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

export const deleteServicioCategoria = async (
  id: string
): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.delete<ServicioCategoriaResponse>(
    `/scategorias/${id}`,
  );
  return response.data;
};
