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

export const createMainBannersAction = async (data: FormData) => {
  const mainBanners = await adminApi.post<BannerPrincipalResponse>("/bprincipales", data);

  return mainBanners.data;
};
