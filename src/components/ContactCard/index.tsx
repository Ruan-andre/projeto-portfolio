"use client";

import { Icon } from "@iconify/react";
import ContactCardProps from "@/interfaces/ContactCardProps";
import { useGenericModal } from "@/context/GenericPopupMessageContext";
import { useLanguage } from "@/context/LanguageContext";

const ContactCard = ({ iconName, title, info, href }: ContactCardProps) => {
  const { openModal } = useGenericModal();
  const { t } = useLanguage();

  const handleClick = async (e: React.MouseEvent) => {
    if (info && !href) {
      e.preventDefault();
      try {
        const isEmail = title.toLowerCase().includes("e-mail") || title.toLowerCase().includes("email");
        if (isEmail) {
          await navigator.clipboard.writeText(info);
          openModal({
            content: t("E-mail copiado!", "Email copied!"),
          });
        }
      } catch (err) {
        console.error("Falha ao copiar:", err);
      }
    }
  };

  const Content = (
    <div className="flex flex-col items-center gap-[2rem] p-[4rem] bg-card/50 rounded-[4rem] border border-border hover:border-special transition-all group w-full h-full cursor-pointer shadow-xl">
      <Icon
        icon={iconName}
        className="text-[6rem] text-gray-600 group-hover:text-special transition-colors"
      />
      <span className="text-[2.4rem] font-medium uppercase tracking-tight text-white group-hover:text-special transition-colors">
        {title}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-full">
        {Content}
      </a>
    );
  }

  return (
    <div onClick={handleClick} className="w-full">
      {Content}
    </div>
  );
};

export default ContactCard;
