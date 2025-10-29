import { User } from "../../../context/AuthProvider";
import authApi from "../api/auth.api";

interface LoginResponse {
  user: User;
  token: string;
}

export const loginAction = async (email: string, password: string) => {
  const response = await authApi.post<LoginResponse>("/login", {
    email: email,
    contraseña: password,
  });

  return response.data;
};
