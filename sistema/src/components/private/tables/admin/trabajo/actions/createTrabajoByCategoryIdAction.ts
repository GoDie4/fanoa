import adminApi from "../../../../api/admin.api";

export const createTrabajoByCategoryIdAction = async (data: FormData) => {
  const response = await adminApi.post("/trabajo", data);
  return response.data;
};
