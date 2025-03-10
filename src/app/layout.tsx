import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VerticalNavigation from "@/components/vertical-navigation";
import { Icon } from "../assets/icons";
import ContactCard from "@/components/contactCard";

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
      <body className={`${inter.className} relative min-h-screen pt-[3rem]`}>
        <header className="fixed z-10 left-25 top-30">
          <VerticalNavigation>
            <Icon
              icon="ic:round-home"
              width="35"
              height="35"
              dataTitle="Inicio"
              href="#presentation"
            />
            <Icon
              href="#projects"
              icon="fluent:tabs-16-filled"
              width="35"
              height="35"
              dataTitle="Projetos"
            />
            <Icon
              icon="fa6-solid:code"
              href="#skills"
              width="35"
              height="35"
              dataTitle="Habilidades"
            />
            <Icon
              href="#contacts"
              icon="uiw:mail"
              width="35"
              height="35"
              dataTitle="Contato"
            />
          </VerticalNavigation>
        </header>
        <main className="container max-w-[80%] mx-auto grid grid-cols-4 items-center gap-y-[9rem] pt-[2rem] pb-[10rem]">
          {children}
        </main>
        <footer className="absolute left-0 right-0 bg-background">
          <section id="contacts" className="col-span-4 text-center">
            <h3 className="text-[4rem] pb-[4rem] font-semibold">Contatos</h3>
            <div className="flex items-center justify-center gap-[17rem] bg-shadow-brown-red p-[4rem]">
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
              <ContactCard
                href="mailto:andreruan80@gmail.com"
                iconName="logos:google-gmail"
                title="E-mail"
                info="andreruan80@gmail.com"
              />
            </div>
          </section>
          <p className="text-[1.6rem] text-center mb-[2rem] mt-[2rem]">
            © André Ruan | 2025
          </p>
        </footer>
      </body>
    </html>
  );
}
