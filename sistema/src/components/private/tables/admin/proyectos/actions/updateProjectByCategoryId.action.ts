import adminApi from "../../../../api/admin.api";

export const updateProjectByIdAction = async (id: string, data: FormData) => {
  data.append("_method", "PUT");
  const response = await adminApi.post(`/proyectos/${id}`, data);
  return response.data;
};
