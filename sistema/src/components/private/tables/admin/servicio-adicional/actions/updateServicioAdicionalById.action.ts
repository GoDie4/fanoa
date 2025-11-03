import adminApi from "../../../../api/admin.api";

export const updateServicioAdicionalByIdAction = async (
  id: string,
  data: FormData
) => {
  data.append("_method", "PUT");

  const response = await adminApi.post(`/sadicionales/${id}`, data);
  return response.data;
};
