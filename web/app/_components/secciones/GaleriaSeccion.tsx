/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GridGaleria } from "./galeria/GridGaleria";

export interface GalleryImage {
  id: number;
  url: string;
  span: string;
  animationType: "wave" | "reveal" | "fragment" | "elastic";
  nombre?: string
}

// const images: GalleryImage[] = [
//   {
//     id: 1,
//     url: "/assets/images/galeria/galeria1.webp",
//     span: "col-span-2 row-span-3 md:col-span-2 md:row-span-4",
//     animationType: "wave",
//   },
//   {
//     id: 2,
//     url: "/assets/images/galeria/galeria2.webp",
//     span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
//     animationType: "reveal",
//   },
//   {
//     id: 3,
//     url: "/assets/images/galeria/galeria3.webp",
//     span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
//     animationType: "fragment",
//   },
//   {
//     id: 4,
//     url: "/assets/images/galeria/galeria4.webp",
//     span: "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
//     animationType: "elastic",
//   },
 
//   {
//     id: 7,
//     url: "/assets/images/galeria/galeria7.webp",
//     span: "col-span-2 row-span-3 md:col-span-2 md:row-span-4",
//     animationType: "fragment",
//   },
//   {
//     id: 8,
//     url: "/assets/images/galeria/galeria8.webp",
//     span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
//     animationType: "elastic",
//   },
//   {
//     id: 9,
//     url: "/assets/images/galeria/galeria9.webp",
//     span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
//     animationType: "wave",
//   },
// ];

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ image, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });


  
  const getAnimationVariants = () => {
    switch (image.animationType) {
      case "wave":
        return {
          hidden: {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            filter: "hue-rotate(90deg)",
          },
          visible: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            filter: "hue-rotate(0deg)",
            transition: {
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: index * 0.08,
            },
          },
        };
      case "reveal":
        return {
          hidden: {
            clipPath: "circle(0% at 50% 50%)",
            filter: "blur(20px) brightness(0.3)",
          },
          visible: {
            clipPath: "circle(150% at 50% 50%)",
            filter: "blur(0px) brightness(1)",
            transition: {
              duration: 1,
              ease: "easeOut",
              delay: index * 0.08,
            },
          },
        };
      case "fragment":
        return {
          hidden: {
            clipPath:
              "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            filter: "saturate(0) contrast(2)",
          },
          visible: {
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 25%, 100% 50%, 100% 75%, 100% 100%, 50% 100%, 0% 100%)",
            filter: "saturate(1) contrast(1)",
            transition: {
              duration: 1.3,
              ease: [0.87, 0, 0.13, 1],
              delay: index * 0.08,
            },
          },
        };
      case "elastic":
        return {
          hidden: {
            scale: 0,
            rotate: -180,
            filter: "brightness(0)",
          },
          visible: {
            scale: 1,
            rotate: 0,
            filter: "brightness(1)",
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 0.8,
              delay: index * 0.08,
            },
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${image.span} relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300`}
      //@ts-ignore
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.img
        src={`${image.url}`}
        alt={`Gallery image ${image.id}`}
        className="object-cover w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hover:opacity-100" />
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen py-20 bg-white ">
      <div className="container  px-4 md:px-14 mx-auto mb-20">
        <div className="grid items-end grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <div className="overflow-hidden"></div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-primary font-sans uppercase  leading-[0.9] tracking-tight">
              Galería
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-[2px] w-16 bg-secondary"></div>
              <span className="font-mono text-sm text-gray-700">
                Nuestros trabajos
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4">
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-800 lg:text-lg">
                Stands y experiencias que elevan la presencia de tu marca
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full cursor-pointer border-primary hover:bg-primary hover:text-white group">
                  <span className="text-lg duration-300 animate-bounce">
                    ↓
                  </span>
                </div>
                <span className="text-sm text-gray-800">
                  Descubre nuestros proyectos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto overflow-hidden">
        <GridGaleria/>
      </div>
    </div>
  );
};

export default Gallery;
