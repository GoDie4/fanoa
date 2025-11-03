import type { Metadata } from "next";
import { Encode_Sans_Semi_Expanded, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/estructura/Header";
import Footer from "./_components/estructura/Footer";
import Script from "next/script";
import { ConfigProvider } from "./_context/ConfigContext";

const encodeSans = Encode_Sans_Semi_Expanded({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-encode",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grupo Fanoa | Fabricación de Stands Feriales y Carpintería Personalizada",
    template: "%s | Grupo Fanoa",
  },
  description:
    "En Grupo Fanoa transformamos ideas en realidades. Somos especialistas en stands feriales, carpintería y ebanistería de alta calidad, ofreciendo proyectos personalizados en madera con acabados profesionales.",
  keywords: [
    "stands feriales",
    "carpintería a medida",
    "ebanistería",
    "diseño de stands",
    "fabricación de stands",
    "muebles de madera personalizados",
    "Grupo Fanoa",
  ],
  authors: [{ name: "Grupo Fanoa" }],
  creator: "Grupo Fanoa",
  publisher: "Grupo Fanoa",
  metadataBase: new URL("https://grupofanoa.com"), // cambia si tu dominio es distinto
  openGraph: {
    title: "Grupo Fanoa | Expertos en Stands Feriales y Carpintería de Alta Calidad",
    description:
      "Fabricamos stands feriales y proyectos en madera personalizados. Grupo Fanoa: compromiso, diseño y excelencia artesanal.",
    url: "https://grupofanoa.com",
    siteName: "Grupo Fanoa",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://fanoa.exportando.online/assets/images/slides/slide1.webp", // coloca la imagen real de portada
        width: 1200,
        height: 630,
        alt: "Stands feriales y carpintería personalizada | Grupo Fanoa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Fanoa | Fabricación de Stands y Carpintería Personalizada",
    description:
      "Expertos en stands feriales, carpintería y ebanistería. En Grupo Fanoa convertimos tus ideas en realidades tangibles.",
    images: ["https://fanoa.exportando.online/assets/images/slides/slide1.webp"], // igual que el Open Graph
    creator: "@grupofanoa", // cambia si tienes Twitter
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://grupofanoa.com",
  },
  category: "Construcción y diseño de stands",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// async function getConfig() {
//   try {
//     console.log(process.env.NEXT_PUBLIC_API_URL)
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bprincipales`, {
//       next: {
//         revalidate: 3600,
//       },
//     });

//     const data = await res.json()

//     console.log('Datos parseados:', data)

//     if (!res.ok) {
//       throw new Error("Error al obtener configuración");
//     }

//     return data
//   } catch (error) {
//     console.error("Error fetching config:", error);
//   }
// }
async function getConfig() {
  try {
    // Fetch directo a tu backend
    const res = await fetch("https://api2.grupofanoa.com/api/v1/general", {
      next: { revalidate: 100 },
    });
    console.log({ res });

    if (!res.ok) throw new Error("Error al obtener configuración");

    const data = await res.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configData = await getConfig();
  return (
    <html lang="es">
      <body className={`${encodeSans.variable} ${geistMono.variable} antialiased`}>
        <head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-6B6H190P8N`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6B6H190P8N', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </head>
        <ConfigProvider data={configData}>
          <Header />
          {children}
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
