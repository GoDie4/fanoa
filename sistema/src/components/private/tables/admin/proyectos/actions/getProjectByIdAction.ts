import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import type { ProyectoResponse } from "../interfaces/project.response";

const { VITE_API_DEFAULT } = getEnvs();

export const getProjectByIdAction = async (id: string) => {
  const response = await adminApi.get<ProyectoResponse>(`/proyectos/${id}`);
  const project = response.data;

  return {
    ...project,
    imagen: `${VITE_API_DEFAULT}/uploads/proyecto/${project.imagen}`,
  };
};
