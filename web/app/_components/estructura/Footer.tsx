/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { redirigirWhatsApp } from "@/utils/redirectToWhatsapp";

import { useContacto } from "@/hooks/useContacto";
import { FloatingWhatsApp } from "react-floating-whatsapp";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Navegación",
    links: [
      { title: "Inicio", href: "/" },
      { title: "Nosotros", href: "/nosotros" },
      { title: "Servicios", href: "/servicios" },
      { title: "Galería", href: "/galeria" },
      { title: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Servicios",
    links: [
      {
        title: "Fabricación de Stands ",
        href: "/servicios/fabricacion-de-stands",
      },
      {
        title: "Carpintería y Ebanistería",
        href: "/servicios/carpinteria-y-ebanisteria",
      },
    ],
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { contacto, loading } = useContacto();

  // Procesar datos de contacto - Ya vienen parseados del hook
  const contactData = useMemo(() => {
    if (!contacto) return null;

    return {
      numeros: contacto.numeros
        .sort((a, b) => a.position - b.position)
        .slice(0, 3),
      correos: contacto.correos
        .sort((a, b) => a.position - b.position)
        .slice(0, 3),
      direccion: contacto.direccion1,
      whatsapp: contacto.whatsapp,
      socialLinks: [
        ...(contacto.facebook
          ? [
              {
                name: "Facebook",
                icon: Facebook,
                href: contacto.facebook,
                color: "hover:bg-blue-600",
              },
            ]
          : []),
        ...(contacto.instagram
          ? [
              {
                name: "Instagram",
                icon: Instagram,
                href: contacto.instagram,
                color: "hover:bg-pink-600",
              },
            ]
          : []),
      ],
    };
  }, [contacto]);

  return (
    <footer className="relative overflow-hidden text-gray-300 bg-primary-950">
      {/* Decorative Background Elements */}

      {/* Main Footer Content */}
      <div className="container relative px-4 md:px-14 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Section - 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-5"
          >
            {/* Logo and Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/logo/logo_white.png"
                  alt=""
                  className="block w-[260px]"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-200">
                Transformamos tus ideas en stands únicos que capturan la esencia
                de tu marca. Diseño, innovación y calidad en cada proyecto.
              </p>
            </div>

            {/* CTA Box */}
            <div className="p-6 space-y-3 border bg-gradient-to-br from-primary/10 to-primary/5 border-primary rounded-xl">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white">
                  ¿Listo para tu próximo evento?
                </h4>
              </div>
              <p className="text-sm text-gray-400">
                Conversemos sobre tu proyecto y hagamos realidad tu stand ideal
              </p>
              <button
                onClick={() =>
                  redirigirWhatsApp(
                    contactData?.whatsapp || "+34614122826",
                    "Hola estoy interesado en sus servicios"
                  )
                }
                disabled={loading}
                className="inline-block w-full px-6 py-3 font-bold text-center transition-all duration-300 bg-white rounded-lg cursor-pointer text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cargando..." : "Solicitar Cotización"}
              </button>
            </div>
          </motion.div>

          {/* Links Sections - 4 columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {footerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="pl-3 text-base font-bold tracking-wide text-white uppercase border-l-4 border-secondary">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-gray-200 transition-colors duration-300 hover:text-secondary group"
                      >
                        <span className="transition-opacity duration-300 opacity-0 text-secondary group-hover:opacity-100">
                          →
                        </span>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact & Social - 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-3"
          >
            <div>
              <h4 className="pl-3 mb-4 text-base font-bold tracking-wide text-white uppercase border-l-4 border-secondary">
                Contacto
              </h4>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                </div>
              ) : contactData ? (
                <div className="space-y-3">
                  {/* Correos */}
                  {contactData.correos.length > 0 &&
                    contactData.correos.map((item, index) => (
                      <a
                        key={`correo-${index}`}
                        href={`mailto:${item.correo}`}
                        className="flex items-start gap-3 p-2 transition-all duration-300 rounded-lg group"
                      >
                        <span className="flex-shrink-0 text-xl text-white">
                          <Mail />
                        </span>
                        <div>
                          <p className="text-xs text-gray-200 uppercase">
                            {item.descripcion || "Email"}
                          </p>
                          <p className="text-sm text-gray-300 transition-colors group-hover:text-primary">
                            {item.correo}
                          </p>
                        </div>
                      </a>
                    ))}

                  {/* Teléfonos */}
                  {contactData.numeros.length > 0 &&
                    contactData.numeros.map((item, index) => (
                      <a
                        key={`tel-${index}`}
                        href={`tel:${item.numero.replace(/\s/g, "")}`}
                        className="flex items-start gap-3 p-2 transition-all duration-300 rounded-lg group"
                      >
                        <span className="flex-shrink-0 text-xl text-white">
                          <Phone />
                        </span>
                        <div>
                          <p className="text-xs text-gray-200 uppercase">
                            Teléfono
                          </p>
                          <p className="text-sm text-gray-300 transition-colors group-hover:text-primary">
                            {item.numero}
                          </p>
                        </div>
                      </a>
                    ))}

                  {/* Dirección */}
                  {contactData.direccion && (
                    <div className="flex items-start gap-3 p-2">
                      <span className="flex-shrink-0 text-xl text-white">
                        <MapPin />
                      </span>
                      <div>
                        <p className="text-xs text-gray-200 uppercase">
                          Ubicación
                        </p>
                        <p className="text-sm text-gray-300">
                          {contactData.direccion}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No hay datos de contacto disponibles
                </p>
              )}
            </div>

            {/* Social Media */}
            <div>
              <p className="mb-3 text-sm font-semibold text-white">
                Síguenos en redes
              </p>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-secondary animate-spin" />
                  <span className="text-sm text-gray-400">Cargando...</span>
                </div>
              ) : contactData?.socialLinks &&
                contactData.socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {contactData.socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-11 h-11 bg-secondary rounded-lg flex items-center justify-center ${social.color} transition-all duration-300 shadow-lg`}
                      aria-label={social.name}
                    >
                      <span className="text-xl">
                        <social.icon className="" />
                      </span>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No hay redes sociales disponibles
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-600 bg-primary-950">
        <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
            <p className="text-gray-200">
              © {currentYear} Grupo Fanoa - Todos los derechos reservados
            </p>
            <div className="flex items-center w-fit gap-4">
              <p>
                <Link href={"/politica-de-privacidad"}>
                  Política de privacidad
                </Link>
              </p>
              <p>
                <Link href={"/politica-de-privacidad"}>Aviso Legal</Link>
              </p>
            </div>

            <div className="flex gap-6 text-gray-200">
              <p className="flex items-center gap-1">
                Design by:{" "}
                <a
                  href="https://logosperu.com.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/images/logo/lp.svg"
                    alt=""
                    className="block w-[18px]"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed z-50 flex items-center justify-center text-white transition-all duration-300 rounded-full shadow-2xl cursor-pointer bottom-8 right-24 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 hover:shadow-primary/50 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <span className="text-2xl group-hover:animate-bounce">↑</span>
      </motion.button>

      {/* Floating WhatsApp */}
      <FloatingWhatsApp
        phoneNumber={contactData?.whatsapp || "+34614122826"}
        accountName={"Grupo Fanoa"}
        avatar={"/assets/images/logo/ico.png"}
        statusMessage="En línea"
        chatMessage="¡Hola! Déjanos tu consulta"
        placeholder="Escribe un mensaje"
        notification
        notificationSound
      />
    </footer>
  );
};

export default Footer;
