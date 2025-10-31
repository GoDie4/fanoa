import adminApi from "../../../../api/admin.api";

export const updateTrabajoByIdAction = async (id: string, data: FormData) => {
  data.append("_method", "PUT");
  const response = await adminApi.post(`/trabajo/${id}`, data);
  return response.data;
};
