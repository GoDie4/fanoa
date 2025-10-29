import axios from "axios";
import { getEnvs } from "../../../helper/getEnvs";

const { VITE_API_URL } = getEnvs();

const adminApi = axios.create({
  baseURL: VITE_API_URL,
});

// adminApi.interceptors.request.use((config) => {
//   config.headers["Content-Type"] = "multipart/form-data";

//   return config;
// });

export default adminApi;
