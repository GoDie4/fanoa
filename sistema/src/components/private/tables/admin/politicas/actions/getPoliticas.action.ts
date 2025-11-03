import axios from "axios";

export const getPoliticasAction = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/politicas`);
    return data;
  } catch (error) {
    // console.error("Error en getPoliticasAction:", error);
    return null;
  }
};
