import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import { ProyectoResponse } from "../../proyectos/interfaces/project.response";

const { VITE_API_DEFAULT } = getEnvs();

export const getServicioAdicionalByIdAction = async (id: string) => {
  const response = await adminApi.get<ProyectoResponse>(`/sadicionales/${id}`);
  const servicio = response.data;

  return {
    ...servicio,
    imagen: `${VITE_API_DEFAULT}/uploads/servicio_adicional/${servicio.imagen}`,
  };
};
