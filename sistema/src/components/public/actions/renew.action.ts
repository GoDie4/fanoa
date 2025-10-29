import { User } from "../../../context/AuthProvider";
import authApi from "../api/auth.api";

interface GenerateTokenResponse {
  user: User;
  token: string;
}

export const generateTokenAction = async () => {
  const response = await authApi.get<GenerateTokenResponse>("/renew");
  return response.data;
};
