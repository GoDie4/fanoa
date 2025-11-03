import adminApi from "../../../../api/admin.api";

export const updateBannerSecundarioAction = async (
  id: string,
  formData: FormData
): Promise<void> => {
    formData.append("_method", "PUT");
  await adminApi.post(`/bsecundarios/${id}`, formData);
};
