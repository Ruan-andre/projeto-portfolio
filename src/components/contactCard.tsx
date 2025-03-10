import { Icon } from "@/assets/icons";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContactCard = (props: any) => {
  return (
    <Link
      href={props.href}
      target="_blank"
      className="flex flex-col items-center justify-center gap-[1rem] hover:transition-transform hover:scale-125"
    >
      <Icon
        icon={props.iconName}
        width={props?.iconSize || "70"}
        height={props?.iconSize || "70"}
      />
      <p className="text-[2rem]">{props.title}</p>
      <small className="text-[1.5rem]">{props.info}</small>
    </Link>
  );
};

export default ContactCard;
