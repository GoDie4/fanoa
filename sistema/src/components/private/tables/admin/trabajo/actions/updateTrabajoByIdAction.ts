import adminApi from "../../../../api/admin.api";

export const updateTrabajoByIdAction = async (id: string, data: FormData) => {
  const response = await adminApi.put(`/trabajo/${id}`, data);
  return response.data;
};
