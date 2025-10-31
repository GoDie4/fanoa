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
    formData.append("_method", "PUT");
  const response = await adminApi.post<BannerPrincipalResponse>(`/bprincipales/${id}`, formData);
  return response.data;
};
