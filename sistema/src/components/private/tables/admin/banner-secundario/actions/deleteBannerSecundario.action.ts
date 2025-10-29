import adminApi from "../../../../api/admin.api";

export const deleteBannerSecundarioAction = async (id: string) => {
  await adminApi.delete(`/bsecundarios/${id}`);
};
