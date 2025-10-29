import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import { TrabajoResponse } from "../interface/trabajo.interface";

const { VITE_API_DEFAULT } = getEnvs();

export const getAllTrabajoByCategoryId = async (id: string) => {
  const allTrabajo = await adminApi.get<TrabajoResponse[]>(`/trabajo?categoriaId=${id}`);
  return allTrabajo.data.map((trabajo) => ({
    ...trabajo,
    imagen: `${VITE_API_DEFAULT}/uploads/trabajo/${trabajo.imagen}`,
  }));
};
