import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContactCard from "@/components/ContactCard";
import { GenericPopupMessageProvider } from "@/context/GenericPopupMessageContext";
import GenericPopupMessage from "@/components/GenericPopupMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio | André Ruan - Desenvolvedor Full Stack",
  description: "Portfólio pessoal de André Ruan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <GenericPopupMessageProvider>
        <body className={`${inter.className} relative min-h-screen pt-[3rem]`}>
          {children}
          <GenericPopupMessage />
          <footer className="relative bg-background w-full mt-[10rem] top-[100%]">
            <h3 className="text-[4rem] pb-[4rem] pr-[7rem] max-sm:pr-0 font-semibold text-center">
              Contatos
            </h3>
            <section id="contacts" className="col-span-4 flex flex-col">
              <div className="contacts bg-shadow-brown-red">
                <ContactCard
                  href="https://github.com/ruan-andre"
                  iconName="mdi:github"
                  title="Github"
                  info="@ruan-andre"
                />
                <ContactCard
                  href="https://www.linkedin.com/in/andr%C3%A9-ruan-554854250/"
                  iconName="devicon:linkedin"
                  title="Linkedin"
                />
                <ContactCard iconName="logos:google-gmail" title="E-mail" info="ruan.fullstack@gmail.com" />
              </div>
            </section>
            <p className="text-[1.6rem] text-center mb-[2rem] mt-[2rem]">© André Ruan | 2025</p>
          </footer>
        </body>
      </GenericPopupMessageProvider>
    </html>
  );
}
