import adminApi from "../../../../api/admin.api";
export interface ServicioEditableResponse {
  id: string;
  titulo: string;
  descripcion: string;
  componente1: string;
  componente2: string;
  componente3: string;
  componente4: string;
  createdAt: string;
  updatedAt: string;
}

export const getServicioEditableAction = async () => {
  const { data } = await adminApi.get<ServicioEditableResponse[]>("/seditable");
  return data.length > 0 ? data[0] : null;
};
