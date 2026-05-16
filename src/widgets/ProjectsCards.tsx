"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectsCardsProps from "@/interfaces/ProjectsCardsProps";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@iconify/react";

const ProjectsCards = ({ title, items, featuredItems }: ProjectsCardsProps) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  // Remove duplicatas caso a API retorne projetos iguais nas duas listas
  const allCombined = [...featuredItems];
  items.forEach((item) => {
    if (!allCombined.some((f) => f.name === item.name)) {
      allCombined.push(item);
    }
  });

  const displayedItems = showAll ? allCombined : featuredItems;

  function handleClickShowAll(): void {
    setShowAll(!showAll);
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-[6.4rem] border-b border-border pb-[2.4rem]">
        <h2 className="text-[3rem] md:text-[3.6rem] uppercase tracking-tighter flex items-center gap-[1.6rem]">
          <Icon icon="ph:projector-screen-bold" className="text-special" />
          {title}
        </h2>
      </div>

      <div className="projects-grid">
        {displayedItems.map((item) => (
          <ProjectCard
            key={item.name}
            html_url={item.html_url}
            name={item.name}
            description={item.description}
            created_at={item.created_at}
          />
        ))}
      </div>

      <div className="mt-[8rem] flex justify-center">
        <button
          onClick={() => handleClickShowAll()}
          className="bg-white/5 border border-border px-[4.8rem] py-[1.6rem] rounded-full font-black text-[1.4rem] uppercase tracking-[0.3rem] hover:border-special hover:text-special transition-all shadow-2xl"
        >
          {showAll ? t("VER MENOS", "SEE LESS") : t("VER TODOS", "SEE ALL")}
        </button>
      </div>
    </section>
  );
};

export default ProjectsCards;
