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
    default: "Grupo Fanoa | Fabricación y Diseño de Stands en Madrid",
    template: "%s | Grupo Fanoa",
  },
  description:
    "Grupo Fanoa, especialistas en fabricación, diseño y montaje de stands feriales en Madrid. Proyectos llave en mano con carpintería y acabados profesionales.",
  keywords: [
    "fabricación de stands en Madrid",
    "diseño de stands para ferias",
    "montaje de stands feriales",
    "stands llave en mano",
    "empresa de stands en Madrid",
    "carpintería personalizada",
    "Grupo Fanoa",
  ],
  authors: [{ name: "Grupo Fanoa" }],
  creator: "Grupo Fanoa",
  publisher: "Grupo Fanoa",
  metadataBase: new URL("https://grupofanoa.com"),

  openGraph: {
    title: "Grupo Fanoa | Expertos en Stands Feriales en Madrid",
    description:
      "Fabricación y montaje de stands feriales en Madrid. Grupo Fanoa ofrece soluciones llave en mano con carpintería de alta calidad y diseño personalizado.",
    url: "https://grupofanoa.com",
    siteName: "Grupo Fanoa",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://www.grupofanoa.com/assets/images/slides/slide1.webp",
        width: 1200,
        height: 630,
        alt: "Diseño y fabricación de stands feriales en Madrid | Grupo Fanoa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Grupo Fanoa | Diseño y Montaje de Stands en Madrid",
    description:
      "Fabricamos stands feriales en Madrid con diseño personalizado y carpintería de precisión. Soluciones llave en mano para ferias y eventos.",
    images: [
      "https://www.grupofanoa.com/assets/images/slides/slide1.webp",
    ],
    creator: "@grupofanoa",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://grupofanoa.com",
  },

  category: "Fabricación y diseño de stands en Madrid",

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
      <body
        className={`${encodeSans.variable} ${geistMono.variable} antialiased`}
      >
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
