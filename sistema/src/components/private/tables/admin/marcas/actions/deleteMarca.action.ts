import adminApi from "../../../../api/admin.api";

export const deleteMarcaAction = async (id: string): Promise<void> => {
  await adminApi.post(`/feria/${id}`);
};
