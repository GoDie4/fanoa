import adminApi from "../../../../api/admin.api";

export const createServicioAdicionalByCategoryIdAction = async (data: FormData) => {
  const response = await adminApi.post("/sadicionales", data);
  return response.data;
};
