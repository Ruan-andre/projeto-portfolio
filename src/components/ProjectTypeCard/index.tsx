import CardData from "@/interfaces/CardData";
import { Icon } from "../../../public/assets/icons";
import Image from "next/image";
import Link from "next/link";

const ProjectTypeCard = (data: CardData) => {
  return (
    <Link href={data.href} className="project-type-card hover:custom-shadow">
      <div className="w-full h-[80%] rounded-[4rem] overflow-hidden flex items-center justify-center">
        <Image
          className="w-full h-full object-cover"
          width={760}
          height={480}
          src={data.imgSrc}
          alt={data.title}
        />
      </div>
      <div className="pl-[5rem] max-sm:pl-[0] flex  items-center gap-[3rem]">
        {data.icon && (
          <div>
            <Icon icon={data.icon} width={data?.iconSize || "35"} height={data?.iconSize || "35"} />
          </div>
        )}
        <div>
          <h3 className="text-[3rem] font-light opacity-80">{data.title}</h3>
          <p className="text-[1.5rem] font-thin">{data.aboutCard}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectTypeCard;
