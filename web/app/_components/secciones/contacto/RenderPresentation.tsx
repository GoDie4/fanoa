"use client";
import React from "react";
import { useConfig } from "../../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

export const RenderPresentation = () => {
  const config = useConfig();
  const { contacto } = (config as unknown as ConfigResponse).data;

  return (
    <>
      <h2 className="text-4xl max-w-4xl mx-auto  md:text-5xl font-sans font-black text-primary uppercase leading-[0.9] tracking-tight">
        {contacto[0]?.titulo}
      </h2>
      <p className="max-w-4xl mx-auto mt-4 text-lg text-gray-600">{contacto[0]?.descripcion}</p>
    </>
  );
};
