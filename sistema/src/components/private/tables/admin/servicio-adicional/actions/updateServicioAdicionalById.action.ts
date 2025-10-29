import adminApi from "../../../../api/admin.api";

export const updateServicioAdicionalByIdAction = async (id: string, data: FormData) => {
  const response = await adminApi.put(`/sadicionales/${id}`, data);
  return response.data;
};
