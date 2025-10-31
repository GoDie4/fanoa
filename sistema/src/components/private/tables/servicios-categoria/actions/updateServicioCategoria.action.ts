import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

export const updateServicioCategoria = async (
  id: string,
  formData: FormData
): Promise<ServicioCategoriaResponse> => {
  formData.append("_method", "PUT");
  const response = await adminApi.post<ServicioCategoriaResponse>(
    `/scategorias/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
