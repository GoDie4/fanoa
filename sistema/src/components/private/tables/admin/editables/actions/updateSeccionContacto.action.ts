import adminApi from "../../../../api/admin.api";
import type { SeccionContactoResponse } from "./getSeccionContacto.action";

export const updateSeccionContactoAction = async (
  id: string,
  data: Omit<SeccionContactoResponse, "id" | "createdAt" | "updatedAt">
): Promise<SeccionContactoResponse> => {
    
  const response = await adminApi.post<SeccionContactoResponse>(`/contacto/${id}`, data);
  return response.data;
};
