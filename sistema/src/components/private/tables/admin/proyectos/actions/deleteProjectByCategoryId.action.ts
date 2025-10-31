import adminApi from "../../../../api/admin.api";
import type { ProyectoResponse } from "../../proyectos/interfaces/project.response";

export const deleteProject = async (id: string): Promise<ProyectoResponse> => {
  const response = await adminApi.post<ProyectoResponse>(`/proyectos/${id}`);
  return response.data;
};
