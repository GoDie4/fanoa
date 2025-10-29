/* eslint-disable @typescript-eslint/no-explicit-any */
import { Global } from "@/utils/global";
import { useEffect, useState } from "react";

interface Numero {
  numero: string;
  position: number;
}

interface Correo {
  correo: string;
  descripcion: string;
  position: number;
}

interface Contacto {
  id: number;
  numeros: Numero[];
  correos: Correo[];
  direccion1: string;
  direccion2: string;
  direccion3: string;
  horario: string;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  twiter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  whatsapp?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const useContacto = () => {
  const [contacto, setContacto] = useState<Contacto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacto = async () => {
      try {
        const res = await fetch(
          `${Global.url}/oneConfi/1`
        );
        if (!res.ok) throw new Error("Error al obtener los datos de contacto");

        const data = await res.json();

        // ✅ Normalización de los campos que vienen como string JSON
        const numeros = JSON.parse(data.numeros || "[]");
        const correos = JSON.parse(data.correos || "[]");

        const contactoNormalizado: Contacto = {
          id: data.id,
          numeros,
          correos,
          direccion1: data.direccion1,
          direccion2: data.direccion2,
          direccion3: data.direccion3,
          horario: data.horario,
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          twiter: data.twiter,
          linkedin: data.linkedin,
          youtube: data.youtube,
          whatsapp: data.whatsapp,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        setContacto(contactoNormalizado);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchContacto();
  }, []);

  return { contacto, loading, error };
};
