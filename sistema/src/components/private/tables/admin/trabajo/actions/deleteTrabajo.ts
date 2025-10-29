import adminApi from "../../../../api/admin.api";
import type { ProyectoResponse } from "../../proyectos/interfaces/project.response";

export const deleteTrabajo = async (id: string): Promise<ProyectoResponse> => {
  const response = await adminApi.delete<ProyectoResponse>(`/trabajo/${id}`);
  return response.data;
};
