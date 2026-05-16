import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GenericPopupMessageProvider } from "@/context/GenericPopupMessageContext";
import { SkeletonProvider } from "@/context/SkeletonContext";
import GenericPopupMessage from "@/components/GenericPopupMessage";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "@/components/Footer";

import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Portfólio | André Ruan - Desenvolvedor Full Stack",
  description: "Portfólio pessoal de André Ruan",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <LanguageProvider>
        <GenericPopupMessageProvider>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <SkeletonProvider>
              <body className={`${inter.className} antialiased`}>
                {children}
                <GenericPopupMessage />
                <Footer />
              </body>
            </SkeletonProvider>
          </SkeletonTheme>
        </GenericPopupMessageProvider>
      </LanguageProvider>
    </html>
  );
}
