import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/AppProviders";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Historias Bíblicas - Biblioteca Digital Cinematográfica",
  description: "Explora, lee, escucha y aprende las historias más importantes de la Biblia con una experiencia interactiva y cinematográfica.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#120D09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${jakarta.variable}`}>
      <body className="bg-[#120D09] text-[#F8F2E8] antialiased bg-particles min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
