import { getEnvs } from "../../../../../helper/getEnvs";
import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

const { VITE_API_DEFAULT } = getEnvs();

export const getAllServicioCategoria = async (): Promise<ServicioCategoriaResponse[]> => {
  const response = await adminApi.get<ServicioCategoriaResponse[]>("/scategorias");

  return response.data.map((data) => ({
    ...data,
    imagen: `${VITE_API_DEFAULT}/uploads/servicio_categoria/${data.imagen}`,
  }));
};
