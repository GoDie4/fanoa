import adminApi from "../../../../api/admin.api";

export interface MarcaResponse {
  id: string;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

export const createMarcaAction = async (data: FormData) => {
  const marca = await adminApi.post<MarcaResponse>("/feria", data);
  return marca.data;
};
