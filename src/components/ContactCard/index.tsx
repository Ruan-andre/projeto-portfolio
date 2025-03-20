"use client";

import { Icon } from "@/assets/icons";
import ContactCardProps from "@/interfaces/ContactCardProps";
import Link from "next/link";
import { useGenericModal } from "@/context/GenericPopupMessageContext";

const ContactCard = ({
  iconName,
  title,
  info,
  href,
  iconSize,
}: ContactCardProps) => {
  const { openModal } = useGenericModal();

  const handleClick = async (e: React.MouseEvent) => {
    if (info && !href) {
      e.preventDefault();
      try {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobile) {
          window.location.href = `mailto:${info}`;
        } else {
          await navigator.clipboard.writeText(info);
          openModal({ content: <h1>Texto copiado!</h1> });
        }
      } catch (err) {
        console.error("Falha ao copiar:", err);
      }
    }
  };

  return (
    <Link
      href={href || "#contacts"}
      target={href ? "_blank" : ""}
      className="flex flex-col items-center justify-center gap-[1rem] hover-transform-scale"
      onClick={handleClick}
    >
      <Icon icon={iconName} width={iconSize || 35} height={iconSize || 35} />
      <p className="text-[2rem]">{title}</p>
      {info && <p className="text-[1.5rem]">{info}</p>}
    </Link>
  );
};

export default ContactCard;
