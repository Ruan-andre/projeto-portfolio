"use client";

import { useSkeleton } from "@/context/SkeletonContext";
import ContactCard from "../ContactCard";
import SkeletonFooter from "../skeletons/footer";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { isLoading } = useSkeleton();
  const { t } = useLanguage();

  if (isLoading) {
    return <SkeletonFooter />;
  }

  return (
    <footer id="contacts" className="py-[9.6rem] text-center bg-dark">
      <div className="max-w-[128rem] mx-auto px-6">
        <h2 className="text-[3.6rem] sm:text-[5rem] mb-[6.4rem] uppercase tracking-tighter text-white">
          {t("Contatos", "Contacts")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3.2rem] mb-[9.6rem]">
          <ContactCard
            iconName="mdi:github"
            title="GitHub"
            info="@ruan-andre"
            href="https://github.com/Ruan-andre"
          />
          <ContactCard
            iconName="mdi:linkedin"
            title="LinkedIn"
            info="André Ruan"
            href="https://www.linkedin.com/in/andr%C3%A9-ruan-554854250/"
          />
          <ContactCard iconName="logos:google-gmail" title="E-mail" info="ruan.fullstack@gmail.com" />
          <ContactCard
            iconName="skill-icons:discord"
            title="Discord"
            info="ruan.andre97"
            href="https://discordapp.com/users/798981432113365043"
          />
        </div>

        <p className="text-[1.6rem] text-gray-600 font-medium">
          &copy; {new Date().getFullYear()} André Ruan.{" "}
          {t("Todos os direitos reservados.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
