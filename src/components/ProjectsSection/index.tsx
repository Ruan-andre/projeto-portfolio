"use client";

import ProjectsCards from "@/widgets/ProjectsCards";
import { useLanguage } from "@/context/LanguageContext";
import GithubProjectsData from "@/interfaces/GithubProjectsData";

interface ProjectsSectionProps {
  featuredProjects: GithubProjectsData[];
  allProjects: GithubProjectsData[];
}

const ProjectsSection = ({ featuredProjects, allProjects }: ProjectsSectionProps) => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="max-w-[128rem] mx-auto px-6 py-[8rem]">
      <ProjectsCards 
        title={t("Projetos em destaque", "Featured Projects")}
        featuredItems={featuredProjects}
        items={allProjects}
      />
    </section>
  );
};

export default ProjectsSection;
