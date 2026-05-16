"use client";

import { Icon } from "@iconify/react";
import Technologies from "@/types/Technologies";

interface ProjectTechnologiesProps {
  techs: Technologies[] | undefined;
  variant?: "minimal" | "badges";
}

const ProjectTechnologies = ({ techs, variant = "minimal" }: ProjectTechnologiesProps) => {
  if (variant === "badges") {
    return (
      <div className="flex flex-wrap gap-4">
        {techs?.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 group hover:border-special/50 transition-all cursor-default"
          >
            <Icon icon={item.iconName} className="text-[2.8rem] group-hover:scale-110 transition-transform" />
            <span className="text-[1.3rem] font-bold uppercase tracking-wider text-gray-300 group-hover:text-special transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {techs?.map((item, index) => (
        <div key={index} data-title={item.name} className="personalized-title hover-transform-scale">
          <Icon icon={item.iconName} className="text-[2rem] md:text-[2.4rem]" />
        </div>
      ))}
    </>
  );
};

export default ProjectTechnologies;
