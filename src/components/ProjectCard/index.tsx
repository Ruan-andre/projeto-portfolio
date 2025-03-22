"use client";
import { getJsonContentRepo, getTechnologies } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProjectsModal } from "@/context/ProjectsModalContext";
import JsonContentType from "@/types/JsonContentType";
import Technologies from "@/types/Technologies";
import ProjectTechnologies from "../ProjectTechnologies";

const ProjectCard = ({ name, html_url, description, created_at }: GithubProjectsData) => {
  const [jsonContent, setjsonContent] = useState<JsonContentType | null>(null);
  const [technologies, setTechnologies] = useState<Technologies[]>([]);
  const { openModal } = useProjectsModal();
  const projectName = name.replaceAll("-", " ").toUpperCase();
  const createdAt = new Date(created_at).toLocaleDateString();

  useEffect(() => {
    async function fetchData() {
      const jsonRepoContent: JsonContentType = await getJsonContentRepo(name);
      setjsonContent(jsonRepoContent);

      if (jsonRepoContent?.technologies) {
        const techs = getTechnologies(jsonRepoContent.technologies);
        setTechnologies(techs as Technologies[]);
      }
    }

    fetchData();
  }, [name]);

  return (
    <>
      {name && jsonContent && (
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
              <p className="flex justify-center gap-[1rem]">
                <ProjectTechnologies techs={technologies} />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
