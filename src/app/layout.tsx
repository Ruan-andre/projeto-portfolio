import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContactCard from "@/components/ContactCard";
import { GenericPopupMessageProvider } from "@/context/GenericPopupMessageContext";

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
  // const { openModal } = useModal();

  return (
    <html lang="pt-BR">
      <GenericPopupMessageProvider>
        <body className={`${inter.className} relative min-h-screen pt-[3rem]`}>
          {children}
          <footer className="absolute left-0 right-0 bottom-0 bg-background">
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
                  iconName="logos:google-gmail"
                  title="E-mail"
                  info="ruan.fullstack@gmail.com"
                />
              </div>
            </section>
            <p className="text-[1.6rem] text-center mb-[2rem] mt-[2rem]">
              © André Ruan | 2025
            </p>
          </footer>
        </body>
      </GenericPopupMessageProvider>
    </html>
  );
}
