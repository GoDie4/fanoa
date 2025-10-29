import adminApi from "../../../../api/admin.api";

export interface SeccionContactoResponse {
  id: string;
  titulo: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export const getSeccionContactoAction = async (): Promise<SeccionContactoResponse | null> => {
  const response = await adminApi.get<SeccionContactoResponse[]>("/contacto");
  const secciones = response.data;
  return secciones.length > 0 ? secciones[0] : null;
};
