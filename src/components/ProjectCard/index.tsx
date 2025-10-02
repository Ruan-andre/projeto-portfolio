"use client";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
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

  if (isLoading || !jsonContent) {
    return <SkeletonProjects />;
  }

  return (
    <div
      className="project"
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
        className="project-cover"
        width={515}
        height={500}
        priority
      />
      <div className="cover">
        <div>
          <p className="text-[3rem] max-sm:text-[1.5rem]">{projectName}</p>
          <div className="flex justify-center gap-[1rem]">
            <ProjectTechnologies techs={technologies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
