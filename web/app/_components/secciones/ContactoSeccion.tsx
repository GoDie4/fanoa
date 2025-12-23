/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha"; // Importar ReCAPTCHA

import { LucideIcon, Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";
import { RenderPresentation } from "./contacto/RenderPresentation";
import { useConfig } from "../../_context/ConfigContext";
import { ConfigResponse } from "@/models/generalData";
import { Global } from "@/utils/global";

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: string;
}

const ContactSection = ({ renderTitle = true }: { renderTitle?: boolean }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const config = useConfig();
  const { configuracion } = (config as unknown as ConfigResponse).data;
  //@ts-ignore
  const contacto = configuracion?.[0];

  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Procesar datos de contacto dinámicos
  const contactData = useMemo(() => {
    if (!contacto) return null;
    const contactInfo: ContactInfo[] = [];

    const correos =
      contacto.correos
        ?.sort((a: any, b: any) => a.position - b.position)
        .slice(0, 3) || [];
    correos.forEach((correo: any) => {
      contactInfo.push({
        icon: Mail,
        title: correo.descripcion || "Email",
        value: correo.correo,
        link: `mailto:${correo.correo}`,
      });
    });

    const numeros =
      contacto.numeros
        ?.sort((a: any, b: any) => a.position - b.position)
        .slice(0, 3) || [];
    numeros.forEach((numero: any) => {
      contactInfo.push({
        icon: Phone,
        title: "Teléfono",
        value: numero.numero,
        link: `tel:${numero.numero.replace(/\s/g, "")}`,
      });
    });

    if (contacto.direccion1)
      contactInfo.push({
        icon: MapPin,
        title: "Ubicación",
        value: contacto.direccion1,
      });
    if (contacto.horario)
      contactInfo.push({
        icon: Clock,
        title: "Horario",
        value: contacto.horario,
      });

    return {
      contactInfo,
      socialLinks: [
        ...(contacto.facebook
          ? [{ name: "Facebook", icon: Facebook, href: contacto.facebook }]
          : []),
        ...(contacto.instagram
          ? [{ name: "Instagram", icon: Instagram, href: contacto.instagram }]
          : []),
      ],
    };
  }, [contacto]);

  // --- LÓGICA DE VALIDACIÓN ---
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email no válido";
    }
    if (!formData.message.trim())
      newErrors.message = "El mensaje no puede estar vacío";
    if (!formData.privacyPolicy)
      newErrors.privacyPolicy = "Debes aceptar la política";
    if (!captchaToken) newErrors.captcha = "Por favor, completa el captcha";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 2. Definir el endpoint (Cámbialo por tu URL real)

      const response = await fetch(`${Global.url}/contacto/enviarForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          correo: formData.email,
          telefono: formData.phone,
          empresa: formData.company,
          mensaje: formData.message,
          recaptchaToken: captchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }

      alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        privacyPolicy: false,
      });

      // Resetear ReCAPTCHA visualmente
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (error: unknown) {
      console.error("Error al enviar el formulario:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo conectar con el servidor. Inténtalo más tarde.";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto mb-8 px-4 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${renderTitle ? "block" : "hidden"}`}
        >
          <RenderPresentation />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 mx-auto lg:grid-cols-2 lg:gap-16 max-w-7xl">
          {/* Formulario */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8 }}
            className="order-1"
          >
            <h2 className="text-2xl text-center mb-6 font-semibold">
              Pide tu presupuesto
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-primary"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-primary"
                    }`}
                    placeholder="+51 999 999 999"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Mensaje *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.privacyPolicy}
                    onChange={(e) =>
                      handleChange("privacyPolicy", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-200 text-primary"
                  />
                  <label className="text-sm text-gray-700">
                    Acepto la{" "}
                    <span className="font-bold">política de privacidad</span>
                  </label>
                </div>
                {errors.privacyPolicy && (
                  <p className="text-red-500 text-xs">{errors.privacyPolicy}</p>
                )}

                {/* --- COMPONENTE RECAPTCHA --- */}
                <div className="flex flex-col">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LdptTUqAAAAAEN7szwumM1ksjY_WBlDGfSv6PPq" // Reemplaza con tu site key
                    onChange={onCaptchaChange}
                  />
                  {errors.captcha && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.captcha}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                disabled={isSubmitting}
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-lg shadow-lg bg-primary hover:bg-primary/90 transition-all ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Enviar mensaje"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={
              isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.8 }}
            className="order-2 space-y-8"
          >
            {contactData?.contactInfo && contactData.contactInfo.length > 0 ? (
              <div className="space-y-4">
                {contactData.contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInfoInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
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
                        <div className="text-primary group-hover:scale-110 transition-transform">
                          <info.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-gray-900">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 group-hover:text-primary transition-colors">
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
                          <h3 className="mb-1 font-semibold text-gray-900">
                            {info.title}
                          </h3>
                          <p className="text-gray-600">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No hay información disponible
              </p>
            )}

            {contactData?.socialLinks && contactData.socialLinks.length > 0 && (
              <motion.div className="p-8 rounded-xl bg-gray-50">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Síguenos en redes
                </h3>
                <div className="flex gap-4">
                  {contactData.socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm"
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15605.44!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAwJzAwLjAiUyA3N8KwMDAnMDAuMCJX!5e0!3m2!1ses!2spe!4v1"
        width="100%"
        height="550"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ContactSection;
