import adminApi from "../../../../api/admin.api";
import { ServicioEditableResponse } from "./getServicioEditable.action";

export const createServicioEditableAction = async (
  body: Omit<ServicioEditableResponse, "id" | "createdAt" | "updatedAt">
) => {
  const { data } = await adminApi.post<ServicioEditableResponse>("/seditable", body);
  return data;
};
