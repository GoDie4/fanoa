import axios from "axios";

interface PoliticaData {
  titulo: string;
  descripcion: string;
}

export const createPoliticaAction = async (values: PoliticaData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/politicas`, values);
    return data;
  } catch (error: any) {
    // console.error("Error en createPoliticaAction:", error.response?.data || error.message);
    throw error;
  }
};
