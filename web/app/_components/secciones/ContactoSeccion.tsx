/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";

import { LucideIcon, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";
import { RenderPresentation } from "./contacto/RenderPresentation";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: string;
}

const ContactSection = ({ renderTitle = true }: { renderTitle?: boolean }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const config = useConfig();
  const { configuracion } = (config as unknown as ConfigResponse).data;
  //@ts-ignore
  const contacto = configuracion?.[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Procesar datos de contacto dinámicos
  const contactData = useMemo(() => {
    if (!contacto) return null;

    const contactInfo: ContactInfo[] = [];

    // Correos (máximo 3)
    const correos = contacto.correos.sort((a: any, b: any) => a.position - b.position).slice(0, 3);

    correos.forEach((correo: any) => {
      contactInfo.push({
        icon: Mail,
        title: correo.descripcion || "Email",
        value: correo.correo,
        link: `mailto:${correo.correo}`,
      });
    });

    // Teléfonos (máximo 3)
    const numeros = contacto.numeros.sort((a: any, b: any) => a.position - b.position).slice(0, 3);

    numeros.forEach((numero: any) => {
      contactInfo.push({
        icon: Phone,
        title: "Teléfono",
        value: numero.numero,
        link: `tel:${numero.numero.replace(/\s/g, "")}`,
      });
    });

    // Dirección
    if (contacto.direccion1) {
      contactInfo.push({
        icon: MapPin,
        title: "Ubicación",
        value: contacto.direccion1,
      });
    }

    // Horario
    if (contacto.horario) {
      contactInfo.push({
        icon: Clock,
        title: "Horario",
        value: contacto.horario,
      });
    }

    return {
      contactInfo,
      socialLinks: [
        ...(contacto.facebook
          ? [
              {
                name: "Facebook",
                icon: Facebook,
                href: contacto.facebook,
              },
            ]
          : []),
        ...(contacto.instagram
          ? [
              {
                name: "Instagram",
                icon: Instagram,
                href: contacto.instagram,
              },
            ]
          : []),
      ],
    };
  }, [contacto]);

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Mensaje enviado con éxito!");
  };

  return (
    <div className=" py-20 bg-white ">
      <div className="container mx-auto mb-8 px-4 md:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${renderTitle ? "block" : ""}`}
        >
          <RenderPresentation />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 mx-auto lg:grid-cols-2 lg:gap-16 max-w-7xl">
          {/* Formulario */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
            <h2 className="text-2xl text-center mb-4 font-semibold">Pide tu presupuesto</h2>
            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 transition-colors duration-300 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-3 transition-colors duration-300 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 transition-colors duration-300 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="+51 999 999 999"
                  />
                </div>
              </div>

              {/* Empresa */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Empresa</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full px-4 py-3 transition-colors duration-300 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              {/* Mensaje */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Mensaje *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 transition-colors duration-300 border-2 border-gray-200 rounded-lg resize-none focus:border-primary focus:outline-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-gray-200 text-primary focus:ring-primary"
                />
                <label className="text-sm text-gray-700">
                  Acepto la <span className="font-bold">política de privacidad</span>
                </label>
              </div>
              {/* Botón */}
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 font-bold text-white transition-all duration-300 rounded-lg shadow-lg bg-primary hover:bg-primary/90 hover:shadow-xl"
              >
                Enviar mensaje
              </motion.button>
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-2 space-y-8 lg:order-2"
          >
            {/* Tarjetas de información */}
            {contactData?.contactInfo && contactData.contactInfo.length > 0 ? (
              <div className="space-y-4">
                {contactData.contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 transition-colors duration-300 bg-gray-50 rounded-xl hover:bg-gray-100"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-start gap-4 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="transition-transform duration-300 text-primary group-hover:scale-110">
                          <info.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-gray-600 transition-colors duration-300 group-hover:text-primary">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="text-primary">
                          <info.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-gray-600">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No hay información de contacto disponible</p>
              </div>
            )}

            {/* Redes sociales */}
            {contactData?.socialLinks && contactData.socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-8 rounded-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-800">Síguenos en redes</h3>
                <div className="flex gap-4">
                  {contactData.socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-12 h-12 transition-colors duration-300 rounded-lg bg-white/20 hover:bg-white/30"
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.4467803855523!2d-3.3732961166091076!3d40.33243388717554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42410045c977bd%3A0xed718f50ac317bf9!2sGrupo%20Fanoa%20SL!5e0!3m2!1ses!2spe!4v1761159860737!5m2!1ses!2spe"
        width="100%"
        height="550"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactSection;
