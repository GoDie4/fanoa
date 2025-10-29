import adminApi from "../../../../api/admin.api";
import type { ProyectoResponse } from "../../proyectos/interfaces/project.response";

export const deleteServicioAdicional = async (id: string): Promise<ProyectoResponse> => {
  const response = await adminApi.delete<ProyectoResponse>(`/sadicionales/${id}`);
  return response.data;
};
