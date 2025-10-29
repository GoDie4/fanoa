"use client";
import React, { useState } from "react";

interface Section {
  id: string;
  title: string;
  content: string[];
}

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduccion");

  const sections: Section[] = [
    {
      id: "introduccion",
      title: "1. Introducción",
      content: [
        "En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD), y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos sobre nuestra política de protección de datos.",
        "El responsable del tratamiento de sus datos personales es [NOMBRE DE LA EMPRESA], con domicilio en [DIRECCIÓN COMPLETA], CIF [NÚMERO], inscrita en el Registro Mercantil de [CIUDAD].",
        "Puede contactar con nuestro Delegado de Protección de Datos en: dpo@empresa.com",
      ],
    },
    {
      id: "datos-recopilados",
      title: "2. Datos Personales que Recopilamos",
      content: [
        "Recopilamos y tratamos las siguientes categorías de datos personales:",
        "• Datos de identificación: nombre, apellidos, DNI/NIE, fecha de nacimiento",
        "• Datos de contacto: dirección postal, correo electrónico, teléfono",
        "• Datos económicos: información de facturación y pago",
        "• Datos de navegación: dirección IP, cookies, datos de geolocalización",
        "• Datos comerciales: historial de pedidos, preferencias de productos",
        "Los datos proporcionados deberán ser veraces, exactos y actuales. El usuario será el único responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionarse como consecuencia del incumplimiento de tal obligación.",
      ],
    },
    {
      id: "finalidad",
      title: "3. Finalidad y Legitimación del Tratamiento",
      content: [
        "Sus datos personales serán tratados con las siguientes finalidades:",
        "• Gestión de su solicitud de información o presupuesto (base legal: ejecución de contrato)",
        "• Prestación de servicios contratados (base legal: ejecución de contrato)",
        "• Gestión administrativa, contable y fiscal (base legal: obligación legal)",
        "• Envío de comunicaciones comerciales (base legal: consentimiento del usuario)",
        "• Mejora de nuestros servicios y experiencia de usuario (base legal: interés legítimo)",
        "No se tomarán decisiones automatizadas en base a los datos proporcionados.",
      ],
    },
    {
      id: "conservacion",
      title: "4. Plazo de Conservación",
      content: [
        "Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.",
        "• Datos de clientes: Durante la relación contractual y hasta 6 años después de finalizada (obligaciones fiscales y mercantiles)",
        "• Datos de prospectos: Hasta que solicite su supresión o transcurran 3 años sin actividad",
        "• Datos de empleados: Durante la relación laboral y hasta 4 años después (obligaciones laborales y de Seguridad Social)",
        "Una vez cumplidos los plazos, los datos serán eliminados de forma segura o anonimizados para fines estadísticos.",
      ],
    },
    {
      id: "destinatarios",
      title: "5. Destinatarios de los Datos",
      content: [
        "Sus datos personales no serán cedidos a terceros, salvo en los siguientes casos:",
        "• Obligación legal: Agencia Tributaria, Seguridad Social, organismos judiciales",
        "• Prestadores de servicios: Proveedores de hosting, servicios de email marketing, plataformas de pago, gestorías (siempre bajo acuerdos de confidencialidad y tratamiento de datos)",
        "• Transferencias internacionales: En caso de utilizar servicios de proveedores fuera del EEE, garantizamos que cumplen con las decisiones de adecuación de la Comisión Europea o han suscrito las Cláusulas Contractuales Tipo.",
        "Todos nuestros proveedores han sido seleccionados cumpliendo con los requisitos del RGPD y tienen implementadas las medidas de seguridad adecuadas.",
      ],
    },
    {
      id: "derechos",
      title: "6. Derechos del Usuario",
      content: [
        "Como titular de los datos, usted tiene derecho a:",
        "• Derecho de acceso: Conocer qué datos tratamos sobre usted",
        "• Derecho de rectificación: Solicitar la corrección de datos inexactos",
        "• Derecho de supresión: Solicitar la eliminación de sus datos cuando ya no sean necesarios",
        "• Derecho a la limitación del tratamiento: Solicitar la restricción del tratamiento en determinadas circunstancias",
        "• Derecho a la portabilidad: Recibir sus datos en formato estructurado y de uso común",
        "• Derecho de oposición: Oponerse al tratamiento de sus datos",
        "• Derecho a no ser objeto de decisiones individuales automatizadas",
        "Para ejercer estos derechos, puede dirigirse por escrito a: [DIRECCIÓN DE LA EMPRESA] o mediante correo electrónico a: protecciondatos@empresa.com, adjuntando copia de su DNI o documento identificativo equivalente.",
        "Asimismo, le informamos de su derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.",
      ],
    },
    {
      id: "seguridad",
      title: "7. Medidas de Seguridad",
      content: [
        "Hemos implementado las medidas técnicas y organizativas adecuadas para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado:",
        "• Cifrado SSL/TLS en todas las comunicaciones",
        "• Sistemas de firewall y antivirus actualizados",
        "• Control de acceso mediante autenticación de dos factores",
        "• Copias de seguridad periódicas y cifradas",
        "• Auditorías de seguridad regulares",
        "• Formación continua del personal en protección de datos",
        "• Protocolos de respuesta ante brechas de seguridad",
        "En caso de producirse una brecha de seguridad que suponga un riesgo para sus derechos y libertades, serán notificados en un plazo máximo de 72 horas.",
      ],
    },
    {
      id: "cookies",
      title: "8. Política de Cookies",
      content: [
        "Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, realizar análisis de uso del sitio y mostrar publicidad personalizada.",
        "Puede configurar o rechazar el uso de cookies en cualquier momento a través de nuestra herramienta de gestión de cookies o configurando su navegador.",
        "Para más información, consulte nuestra Política de Cookies detallada.",
        "Utilizamos los siguientes tipos de cookies:",
        "• Cookies técnicas: Necesarias para el funcionamiento del sitio",
        "• Cookies analíticas: Google Analytics (anonimizadas)",
        "• Cookies de personalización: Guardan preferencias del usuario",
        "• Cookies publicitarias: Con su consentimiento expreso",
      ],
    },
    {
      id: "menores",
      title: "9. Menores de Edad",
      content: [
        "Los servicios ofrecidos a través de este sitio web están dirigidos exclusivamente a personas mayores de 14 años.",
        "Si es menor de 14 años, necesitará el consentimiento de sus padres o tutores para proporcionarnos datos personales.",
        "Si tenemos conocimiento de que se han recabado datos de un menor sin el debido consentimiento, procederemos a eliminarlos de inmediato.",
        "Los padres o tutores pueden ejercer los derechos de los menores bajo su tutela contactando con nosotros.",
      ],
    },
    {
      id: "modificaciones",
      title: "10. Modificaciones",
      content: [
        "Nos reservamos el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas, jurisprudenciales, así como a prácticas de la industria.",
        "Cualquier modificación será comunicada con antelación suficiente y publicada en esta misma página web.",
        "Le recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información.",
        "Última actualización: " +
          new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
      ],
    },
    {
      id: "legislacion",
      title: "11. Legislación Aplicable",
      content: [
        "La presente Política de Privacidad se rige por la legislación española y europea vigente en materia de protección de datos:",
        "• Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)",
        "• Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD)",
        "• Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)",
        "Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten expresamente a la jurisdicción de los Juzgados y Tribunales de [CIUDAD], renunciando expresamente a cualquier otro fuero que pudiera corresponderles.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Hero */}
      {/* <section className="relative bg-black py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white">
              RGPD Compliant
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Transparencia total sobre cómo protegemos y tratamos tus datos
            personales de acuerdo con el RGPD y la legislación española vigente.
          </p>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="py-16 lg:py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-4">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-sm uppercase tracking-wider text-gray-800 font-semibold mb-4">
                    Índice de Contenidos
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-primary text-white font-semibold"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Contact Card */}
                <div className="bg-primary rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">¿Tienes dudas?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Contacta con nuestro Delegado de Protección de Datos
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">📧</span>
                      <span>info@grupofanoa.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">📍</span>
                      <span>C/Hierro nº 25 – POL. IND. BORONDO 28510, Campo Real, Madrid.</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:col-span-8">
              <div className="space-y-12">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className={`transition-all duration-500 ${
                      activeSection === section.id
                        ? "opacity-100"
                        : "opacity-60"
                    }`}
                  >
                    <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-primary transition-colors duration-300">
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                        {section.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        {section.content.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

            </main>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default PrivacyPolicyPage;
