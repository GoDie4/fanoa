import adminApi from "../../../api/admin.api";
import type { ServicioCategoriaResponse } from "../interfaces/servicio-cateogira.response";

// interface ServicioCategoriaRequest {
//   titulo: string;
//   subtitulo: string;
//   descripcion: string;
//   imagen: string;
//   miniTitulo: string;
//   miniDescripcion: string;
// }

export const postServicioCategoria = async (data: FormData): Promise<ServicioCategoriaResponse> => {
  const response = await adminApi.post<ServicioCategoriaResponse>("/scategorias", data);
  return response.data;
};
