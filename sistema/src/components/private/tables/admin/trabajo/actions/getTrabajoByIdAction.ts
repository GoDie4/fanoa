import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import { TrabajoResponse } from "../interface/trabajo.interface";

const { VITE_API_DEFAULT } = getEnvs();

export const getTrabajoByIdAction = async (id: string) => {
  const response = await adminApi.get<TrabajoResponse>(`/trabajo/${id}`);
  const trabajo = response.data;

  return {
    ...trabajo,
    imagen: `${VITE_API_DEFAULT}/uploads/trabajo/${trabajo.imagen}`,
  };
};
