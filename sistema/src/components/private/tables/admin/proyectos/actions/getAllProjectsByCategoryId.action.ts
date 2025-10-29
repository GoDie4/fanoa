import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import type { ProyectoResponse } from "../interfaces/project.response";

const { VITE_API_DEFAULT } = getEnvs();

export const getAllProjectsByCategoryIdAction = async (id: string) => {
  const allProjects = await adminApi.get<ProyectoResponse[]>(`/proyectos?categoriaId=${id}`);
  return allProjects.data.map((project) => ({
    ...project,
    imagen: `${VITE_API_DEFAULT}/uploads/proyecto/${project.imagen}`,
  }));
};
