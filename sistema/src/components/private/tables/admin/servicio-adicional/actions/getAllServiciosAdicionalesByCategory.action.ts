import { getEnvs } from "../../../../../../helper/getEnvs";
import adminApi from "../../../../api/admin.api";
import { ProyectoResponse } from "../../proyectos/interfaces/project.response";

const { VITE_API_DEFAULT } = getEnvs();

export const getAllServiciosAdicionalesByCategoryAction = async (id: string) => {
  const allServicios = await adminApi.get<ProyectoResponse[]>(`/sadicionales?categoriaId=${id}`);
  return allServicios.data.map((servicio) => ({
    ...servicio,
    imagen: `${VITE_API_DEFAULT}/uploads/servicio_adicional/${servicio.imagen}`,
  }));
};
