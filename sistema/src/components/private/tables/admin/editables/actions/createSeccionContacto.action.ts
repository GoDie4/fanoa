import adminApi from "../../../../api/admin.api";
import type { SeccionContactoResponse } from "./getSeccionContacto.action";

export const createSeccionContactoAction = async (
  data: Omit<SeccionContactoResponse, "id" | "createdAt" | "updatedAt">
): Promise<SeccionContactoResponse> => {
  const response = await adminApi.post<SeccionContactoResponse>("/contacto", data);
  return response.data;
};
