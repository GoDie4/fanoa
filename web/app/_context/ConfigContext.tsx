// app/_context/ConfigContext.tsx
"use client";

// import { BannersDatabase } from "@/models/Banners";
import { GeneralData } from "@/models/generalData";
import { createContext, useContext, ReactNode } from "react";

interface ConfigData {
  data: GeneralData[];
}

const ConfigContext = createContext<ConfigData | null>(null);

export function ConfigProvider({ children, data }: { children: ReactNode; data: ConfigData }) {
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig debe usarse dentro de ConfigProvider");
  }
  return context;
}
