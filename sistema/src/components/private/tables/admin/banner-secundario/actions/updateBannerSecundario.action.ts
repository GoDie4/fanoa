import adminApi from "../../../../api/admin.api";

export const updateBannerSecundarioAction = async (
  id: string,
  formData: FormData
): Promise<void> => {
  await adminApi.put(`/bsecundarios/${id}`, formData);
};
