import adminApi from "../../../../api/admin.api";

export const createBannerSecundarioAction = async (formData: FormData) => {
  const { data } = await adminApi.post("/bsecundarios", formData);
  return data;
};
