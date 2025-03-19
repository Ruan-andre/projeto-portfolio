"use client";

import { Icon } from "@/assets/icons";
import ContactCardProps from "@/interfaces/ContactCardProps";
import Link from "next/link";
// import { useModal } from "@/context/GenericPopupMessageContext";

const ContactCard = ({
  iconName,
  title,
  info,
  href,
  iconSize,
}: ContactCardProps) => {
  // const { openModal } = useModal();

  const handleClick = async (e: React.MouseEvent) => {
    if (info && !href) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(info);
        // openModal();
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
      <Icon icon={iconName} width={iconSize || 70} height={iconSize || 70} />
      <p className="text-[2rem]">{title}</p>
      {info && <small className="text-[1.5rem]">{info}</small>}
    </Link>
  );
};

export default ContactCard;
