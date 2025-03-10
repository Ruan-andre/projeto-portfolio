import CardData from "@/interfaces/cardData";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const Card = (data: CardData) => {
  debugger;
  return (
    <div className="flex flex-col w-[70rem] h-[48rem] gap-y-[1.5rem] border-8 bg-gray-900 border-gray-900 rounded-[4rem] backdrop-blur-lg shadow-lg shadow-black/100 hover:custom-shadow">
      <Image
        className="rounded-[4rem]"
        width={760}
        height={480}
        src={data.imgSrc}
        alt={data.title}
      />
      <div className="pl-[5rem] flex  items-center gap-[3rem]">
        {data.icon && (
          <div>
            <Icon icon={data.icon} width="35" height="35" />
          </div>
        )}
        <div>
          <h3 className="text-[3rem] font-light">{data.title}</h3>
          <p className="text-[1.5rem] font-thin">{data.aboutCard}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
