import adminApi from "../../../../api/admin.api";

export const deleteGaleriaAction = async (id: string): Promise<void> => {
  await adminApi.delete(`/galeria/${id}`);
};
