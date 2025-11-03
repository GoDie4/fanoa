import axios from "axios";

interface PoliticaData {
  titulo: string;
  descripcion: string;
}

export const updatePoliticaAction = async (id: string, values: PoliticaData) => {
  try {
    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/politicas/${id}`, values);
    return data;
  } catch (error: any) {
    // console.error("Error en updatePoliticaAction:", error.response?.data || error.message);
    throw error;
  }
};
