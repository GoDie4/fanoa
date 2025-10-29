import adminApi from "../../../../api/admin.api";

export interface BannerPrincipalResponse {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  textoBoton: string;
  createdAt: string;
  updatedAt: string;
}

export const updateMainBannersAction = async (id: string, formData: FormData) => {
  const response = await adminApi.put<BannerPrincipalResponse>(`/bprincipales/${id}`, formData);
  return response.data;
};
