import adminApi from "../../../../api/admin.api";
import { ServicioEditableResponse } from "./getServicioEditable.action";

export const updateServicioEditableAction = async (
  id: string,
  body: Omit<ServicioEditableResponse, "id" | "createdAt" | "updatedAt">
) => {
  const { data } = await adminApi.put<ServicioEditableResponse>(`/seditable/${id}`, body);
  return data;
};
