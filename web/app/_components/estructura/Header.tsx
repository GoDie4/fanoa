/* eslint-disable @next/next/no-img-element */
"use client";
import { useContacto } from "@/hooks/useContacto";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const { contacto, loading } = useContacto();

  // console.log(contacto);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "INICIO", href: "/" },
    { name: "NOSOTROS", href: "/nosotros" },
    { name: "SERVICIOS", href: "/servicios", hasDropdown: true },
    { name: "GALERÍA", href: "/galeria" },
    { name: "CONTACTO", href: "/contacto" },
  ];

  const serviciosSubmenu = [
    { name: "Fabricación de Stands", href: "/servicios/fabricacion-de-stands" },
    {
      name: "Carpintería y Ebanistería",
      href: "/servicios/carpinteria-y-ebanisteria",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Top Info Bar with Gradient */}
      <div
        className={`w-full hidden md:flex items-center bg-gradient-to-r from-primary min-h-[45px]  to-morado py-1 ${
          isScrolled ? "-mt-[45px]" : ""
        } transition-all duration-300`}
      >
        <div className="container px-6 md:px-14 mx-auto">
          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-0">
            {/* Left Side - Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs lg:justify-start lg:gap-6 lg:text-sm">
              {/* 📞 Teléfono */}
              {contacto ? (
                <a
                  href={`tel:${contacto?.numeros.find((n) => n.position === 1)?.numero ?? ""}`}
                  className="flex items-center gap-2 transition-colors text-white/90 hover:text-cyan-300 group"
                >
                  <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">
                    {contacto?.numeros.find((n) => n.position === 1)?.numero ?? ""}
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-white/20" />
                  <div className="h-3 rounded w-28 bg-white/20" />
                </div>
              )}

              {/* 📧 Correo */}
              {contacto ? (
                <a
                  href={`mailto:${contacto?.correos.find((c) => c.position === 1)?.correo ?? ""}`}
                  className="flex items-center gap-2 transition-colors text-white/90 hover:text-cyan-300 group"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="hidden font-medium sm:inline">
                    {contacto?.correos.find((c) => c.position === 1)?.correo ?? ""}
                  </span>
                  <span className="font-medium sm:hidden">Email</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-white/20" />
                  <div className="h-3 rounded w-36 bg-white/20" />
                </div>
              )}

              {/* 📍 Dirección */}
              {contacto ? (
                <div className="items-center hidden gap-2 md:flex text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{contacto?.direccion1}</span>
                </div>
              ) : (
                <div className="items-center hidden gap-2 md:flex animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-white/20" />
                  <div className="h-3 rounded w-52 bg-white/20" />
                </div>
              )}
            </div>

            {/* Right Side - Social Media */}
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-medium text-white/70 lg:inline">Síguenos:</span>
              <div className="flex items-center gap-2">
                {loading ? (
                  // 💨 Skeletons de carga
                  <>
                    <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
                    <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
                  </>
                ) : (
                  <>
                    {contacto?.facebook && (
                      <a
                        href={contacto.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/10 hover:bg-secondary group"
                      >
                        <Facebook className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
                      </a>
                    )}

                    {contacto?.instagram && (
                      <a
                        href={contacto.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/10 hover:bg-secondary group"
                      >
                        <Instagram className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Header with Diagonal Design */}
      <div className={`relative  bg-white ${isScrolled ? "" : ""} transition-all duration-300`}>
        {/* Content */}
        <div className="container relative px-6 md:px-14 py-4 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group">
              <Link href={"/"}>
                <img
                  src="/assets/images/logo/logo.png"
                  alt=""
                  className={`block w-[240px] md:w-[320px] `}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="items-center hidden space-x-1 lg:flex">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className={`relative px-5 py-2 font-semibold text-sm text-gray-800 tracking-wide group overflow-hidden flex items-center gap-1 ${
                          isScrolled ? "" : ""
                        }`}
                      >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-secondary">
                          {item.name}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                        <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 -skew-x-12 bg-white/10 group-hover:scale-x-100"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </Link>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                          isServicesOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }`}
                      >
                        {serviciosSubmenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-6 py-3 font-medium text-gray-700 transition-all duration-200 border-b border-gray-100 hover:bg-primary hover:text-white last:border-b-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative px-5 py-2 font-semibold text-gray-800 text-sm tracking-wide group overflow-hidden ${
                        isScrolled ? "" : ""
                      }`}
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-secondary">
                        {item.name}
                      </span>
                      <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 -skew-x-12 bg-white/10 group-hover:scale-x-100"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-12 h-12 flex items-center justify-center ${
                isScrolled ? "bg-primary/10" : "bg-white/10"
              }  rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-primary" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-primary" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-primary-300/30 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="px-6 py-4 mx-auto space-y-2 max-w-7xl">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 font-semibold text-gray-800 transition-all duration-300 border-l-4 border-transparent rounded-lg hover:bg-cyan-400/20 hover:border-cyan-400"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Mobile Submenu */}
                  <div
                    className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                      isMobileServicesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {serviciosSubmenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                        className="block px-4 py-2 font-medium text-gray-600 transition-all duration-200 rounded-lg hover:bg-primary/10 hover:text-primary"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 font-semibold text-gray-800 transition-all duration-300 border-l-4 border-transparent rounded-lg hover:bg-cyan-400/20 hover:translate-x-2 hover:border-cyan-400"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <button className="w-full px-6 py-3 mt-4 font-bold text-white transition-all duration-300 rounded-lg shadow-lg bg-primary hover:shadow-cyan-400/50">
            COTIZAR AHORA
          </button>
        </nav>
      </div>
    </header>
  );
};
