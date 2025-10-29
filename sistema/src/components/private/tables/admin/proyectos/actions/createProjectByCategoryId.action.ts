import adminApi from "../../../../api/admin.api";

export const createProjectByCategoryIdAction = async (data: FormData) => {
  const response = await adminApi.post("/proyectos", data);

  return response.data;
};
