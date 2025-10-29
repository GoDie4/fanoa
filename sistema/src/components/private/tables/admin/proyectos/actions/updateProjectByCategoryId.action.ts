import adminApi from "../../../../api/admin.api";

export const updateProjectByIdAction = async (id: string, data: FormData) => {
  const response = await adminApi.put(`/proyectos/${id}`, data);
  return response.data;
};
