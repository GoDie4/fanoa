/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { motion, useInView } from "framer-motion";

interface Properties {
  id: string;
  titulo: string;
  imagen: string;
  categoriaId: string;
  createdAt: string;
  updatedAt: string;
  categoria: any;
}

interface GaleriaStandsProps {
  stands: Properties[];
}

interface GalleryImage {
  id: string;
  url: string;
  span: string;
  animationType: "wave" | "reveal" | "fragment" | "elastic";
  nombre?: string;
}

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getAnimationVariants = () => {
    switch (image.animationType) {
      case "wave":
        return {
          hidden: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          visible: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transition: { duration: 1.2, delay: index * 0.08 },
          },
        };
      case "reveal":
        return {
          hidden: { clipPath: "circle(0% at 50% 50%)" },
          visible: {
            clipPath: "circle(150% at 50% 50%)",
            transition: { duration: 1, delay: index * 0.08 },
          },
        };
      case "fragment":
        return {
          hidden: { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
          visible: {
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 25%, 100% 50%, 100% 75%, 100% 100%, 50% 100%, 0% 100%)",
            transition: { duration: 1.3, delay: index * 0.08 },
          },
        };
      case "elastic":
        return {
          hidden: { scale: 0, rotate: -180 },
          visible: {
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 100, damping: 10, delay: index * 0.08 },
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${image.span} relative overflow-hidden rounded-lg bg-gray-200`}
      //@ts-ignore
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.img
        src={image.url}
        alt={image.nombre}
        className="object-cover w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hover:opacity-100" />
    </motion.div>
  );
};

export const GaleriaStands: React.FC<GaleriaStandsProps> = ({ stands }) => {
  // Patrón de spans y animaciones
  const pattern: Pick<GalleryImage, "span" | "animationType">[] = [
    { span: "col-span-2 row-span-2", animationType: "wave" },
    { span: "col-span-1 row-span-2", animationType: "reveal" },
    { span: "col-span-1 row-span-2", animationType: "fragment" },
    { span: "col-span-1 row-span-2", animationType: "elastic" },
  ];

  const images: GalleryImage[] = stands.map((stand, index) => {
    const patternItem = pattern[index % pattern.length];
    return {
      id: stand.id,
      url: `${process.env.NEXT_PUBLIC_API_URL_DEFAULT}/uploads/proyecto/${stand.imagen}`,
      nombre: stand.titulo,
      span: patternItem.span,
      animationType: patternItem.animationType,
    };
  });

  return (
    <div className="col-span-full">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary font-sans uppercase leading-tight tracking-tight">
        Fabricación de Stands
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]">
        {images.map((image, index) => (
          <GalleryItem key={image.id} image={image} index={index} />
        ))}
      </div>
    </div>
  );
};
