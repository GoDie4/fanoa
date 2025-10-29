import { getEnvs } from "../../../../../helper/getEnvs";
import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

const { VITE_API_DEFAULT } = getEnvs();


export const getServicioCategoriaById = async (
  id: string
): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.get<ServicioCategoriaResponse>(`/scategorias/${id}`);
  return {
    ...response.data,
    imagen: `${VITE_API_DEFAULT}/uploads/servicio_categoria/${response.data.imagen}`
  }
};
