"use client";

import NoProjectsFound from "@/components/NoProjectsFound";
import SkeletonProjects from "@/components/skeletons/projects";
import { urlReposAcademics, urlReposAcademicsFeatured } from "@/constants/urlsApiGithub";
import { useSkeleton } from "@/context/SkeletonContext";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useEffect, useState } from "react";

const Academics = () => {
  const [reposAcademics, setReposAcademics] = useState<GithubProjectsData[]>([]);
  const [reposAcademicsFeatured, setReposAcademicsFeatured] = useState<GithubProjectsData[]>([]);
  const { isLoading, setIsLoading } = useSkeleton();
  useEffect(() => {
    async function fetchData() {
      try {
        setReposAcademics(await getDataRepo(urlReposAcademics));
        setReposAcademicsFeatured(await getDataRepo(urlReposAcademicsFeatured));
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <SkeletonProjects />;
  }

  return (
    <>
      {reposAcademics.length > 0 || reposAcademicsFeatured.length > 0 ? (
        <ProjectsCards
          title="Projetos de Jogos"
          items={reposAcademics}
          featuredItems={reposAcademicsFeatured}
        />
      ) : (
        <NoProjectsFound />
      )}
    </>
  );
};

export default Academics;
