"use client";
import React from "react";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: "small" | "medium" | "large";
  overlay?: boolean;
  overlayOpacity?: number;
  id: "nosotros" | "servicios" | "galeria" | "contacto";
}

export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  height = "large",
  overlay = true,
  overlayOpacity = 0.5,
  id,
}) => {
  const config = useConfig();
  const { bannersSecundarios } = (config as unknown as ConfigResponse).data;

  let backgroundImage: string = "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200";

  if (id === "nosotros") {
    backgroundImage = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/banners-secundarios/${bannersSecundarios[0]?.imagen}`;
  } else if (id === "servicios") {
    backgroundImage = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/banners-secundarios/${bannersSecundarios[1]?.imagen}`;
  } else if (id === "galeria") {
    backgroundImage = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/banners-secundarios/${bannersSecundarios[2]?.imagen}`;
  } else if (id === "contacto") {
    backgroundImage = `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/banners-secundarios/${bannersSecundarios[3]?.imagen}`;
  }

  console.log({ backgroundImage });

  const heightClasses = {
    small: "h-48",
    medium: "h-64 md:h-80",
    large: "h-96 md:h-[460px]",
  };

  const overlayStyle = overlay
    ? {
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      }
    : {};

  return (
    <div className="relative w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className={`relative ${heightClasses[height]} w-full bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay oscuro */}
        {overlay && <div className="absolute inset-0" style={overlayStyle} />}

        {/* Contenido del banner */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-sans">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-lg text-white md:text-xl lg:text-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
