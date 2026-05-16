"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/LanguageContext";
import SkillTooltip from "@/components/SkillTooltip";
import { skillsData } from "@/constants/skillsData";

const Expertise = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Back-end",
      icon: "ph:server-bold",
      skills: skillsData.languages
        .filter((s) => ["C#", "Node.js", "JavaScript"].includes(s.title))
        .concat(skillsData.frameworks.filter((f) => f.title === ".NET")),
    },
    {
      title: "Front-end",
      icon: "ph:browsers-bold",
      skills: skillsData.frontend,
    },
    {
      title: t("Dados", "Data"),
      icon: "ph:database-bold",
      skills: skillsData.databases,
    },
    {
      title: t("Ferramentas", "Tools"),
      icon: "ph:wrench-bold",
      skills: (skillsData.versionControl || []).concat(skillsData.platforms || []).slice(0, 4),
    },
  ];

  return (
    <section id="skills" className="bg-card/40 border-y border-border py-[9.6rem] mt-[8rem]">
      <div className="max-w-[128rem] mx-auto px-6">
        <h2 className="text-[2.4rem] font-bold mb-[6.4rem] text-center text-gray-500 uppercase tracking-widest flex items-center justify-center gap-[1.6rem]">
          <Icon icon="ph:cpu-bold" className="text-special text-[3.6rem]" />
          {t("Expertise Técnica", "Technical Expertise")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[4.8rem] lg:gap-[4rem]">
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col gap-[3.2rem]">
              <h3 className="text-special font-medium text-[2.4rem] border-b border-border pb-[1.6rem] flex items-center gap-[0.8rem] uppercase tracking-tight">
                <Icon icon={category.icon} /> {category.title}
              </h3>
              <ul className="flex flex-col gap-[2rem]">
                {category.skills.map((skill) => (
                  <li key={skill.title} className="w-full">
                    <SkillTooltip text={skill.text} url={skill.url}>
                      <div className="tech-item-container w-fit">
                        <Icon icon={skill.icon} className="text-[3.6rem] shrink-0" />
                        <span className="text-[1.8rem]">{skill.title}</span>
                      </div>
                    </SkillTooltip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
