"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/LanguageContext";
import SkillTooltip from "@/components/SkillTooltip";
import { skillsData } from "@/constants/skillsData";

const Expertise = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Back-end & APIs",
      icon: "si:server-line",
      skills: [
        ...skillsData.languages.filter((s) => ["C#"].includes(s.title)),
        ...skillsData.frameworks.filter((f) =>
          [".NET", "Entity Framework Core", "Camunda BPM"].includes(f.title),
        ),
        ...skillsData.platforms.filter((p) => ["Node.js"].includes(p.title)),
      ],
    },
    {
      title: "Client-Side & UI",
      icon: "ph:browsers-bold",
      skills: [
        ...skillsData.languages.filter((s) => ["JavaScript", "TypeScript"].includes(s.title)),
        ...skillsData.frontend,
        ...skillsData.frameworks.filter((f) => ["React", "Next.js", "Electron"].includes(f.title)),
      ],
    },
    {
      title: t("Dados & Storage", "Data & Storage"),
      icon: "ph:database-bold",
      skills: skillsData.databases,
    },
    {
      title: t("DevOps & Ferramentas", "DevOps & Tools"),
      icon: "ph:wrench-bold",
      skills: [
        ...skillsData.platforms.filter((p) => ["Docker"].includes(p.title)),
        ...skillsData.versionControl,
      ],
    },
  ];

  return (
    <section id="skills" className="bg-card/40 border-y border-border py-[9.6rem] mt-32">
      <div className="max-w-512 mx-auto px-6">
        <h2 className="text-[2.4rem] font-bold mb-[6.4rem] text-center text-gray-500 uppercase tracking-widest flex items-center justify-center gap-[1.6rem]">
          <Icon icon="ph:cpu-bold" className="text-special text-[3.6rem]" />
          {t("Expertise Técnica", "Technical Expertise")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[4.8rem] lg:gap-16">
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col gap-[3.2rem]">
              <h3 className="text-special font-medium text-[2.0rem] border-b border-border pb-[1.6rem] flex items-center gap-[0.8rem] uppercase tracking-tight">
                <Icon icon={category.icon} /> {category.title}
              </h3>
              <ul className="flex flex-col gap-8">
                {category.skills.map((skill) => (
                  <li key={skill.title} className="w-full">
                    <SkillTooltip text={skill.text} url={skill.url}>
                      <div className="tech-item-container w-fit">
                        <Icon icon={skill.icon} className="text-[3.2rem] shrink-0" />
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
