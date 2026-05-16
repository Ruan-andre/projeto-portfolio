"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import { useProjectsModal } from "@/context/ProjectsModalContext";
import JsonContentType from "@/types/JsonContentType";
import Technologies from "@/types/Technologies";
import ProjectTechnologies from "../ProjectTechnologies";
import SkeletonProjects from "../skeletons/projects";

const ProjectCard = ({ name, html_url, description, created_at }: GithubProjectsData) => {
  const [jsonContent, setjsonContent] = useState<JsonContentType | null>(null);
  const [technologies, setTechnologies] = useState<Technologies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal } = useProjectsModal();

  const projectName = name.replaceAll("-", " ").toUpperCase();

  const createdAt = useMemo(() => {
    return new Date(created_at).toISOString().split("T")[0];
  }, [created_at]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/repo-content?repo=${encodeURIComponent(name)}`);

        if (response.ok) {
          const data = await response.json();

          if (!data.url_video) return;

          setjsonContent(data);

          if (data.processedTechnologies) {
            setTechnologies(data.processedTechnologies);
          }
        }
      } catch (error) {
        console.error("Error fetching repository content:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [name]);

  if (!jsonContent?.url_video) return null;
  if (isLoading) {
    return (
      <div className="animate-fadeIn">
        <SkeletonProjects />
      </div>
    );
  }

  if (!jsonContent) {
    return null;
  }

  return (
    <div
      className="project-card animate-fadeIn"
      onClick={() => {
        openModal({
          html_url: html_url,
          name: projectName,
          description: description,
          created_at: createdAt,
          urlVideo: jsonContent.url_video,
          linkedin: jsonContent.url_linkedin,
          liveProject: jsonContent.url_live_project,
          languages: technologies,
        });
      }}
    >
      <Image
        src={jsonContent.url_cover}
        alt={`Imagem do projeto ${projectName}`}
        className="project-card-image"
        width={500}
        height={280}
        priority
      />

      <div className="project-card-overlay p-[2.4rem]">
        <h5 className="text-[2.4rem] text-white mb-[1.6rem] uppercase text-center">{projectName}</h5>
        <div className="flex justify-center gap-[1.2rem] bg-black/40 backdrop-blur-md px-[1.6rem] py-[0.8rem] rounded-full border border-white/10">
          <ProjectTechnologies techs={technologies} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
