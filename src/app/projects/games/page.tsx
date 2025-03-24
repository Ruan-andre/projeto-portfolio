"use client";
import { urlReposGames, urlReposGamesFeatured } from "@/constants/urlsApiGithub";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useState, useEffect } from "react";
import { useSkeleton } from "@/context/SkeletonContext";
import SkeletonProjects from "@/components/skeletons/projects";

const Games = () => {
  const [reposGames, setReposGames] = useState<GithubProjectsData[]>([]);
  const [reposGamesFeatured, setReposGamesFeatured] = useState<GithubProjectsData[]>([]);
  const { isLoading, setIsLoading } = useSkeleton();

  useEffect(() => {
    async function fetchData() {
      try {
        setReposGames(await getDataRepo(urlReposGames));
        setReposGamesFeatured(await getDataRepo(urlReposGamesFeatured));
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <SkeletonProjects />;

  return (
    <>
      {reposGames.length > 0 || reposGamesFeatured.length > 0 ? (
        <ProjectsCards title="Projetos de Jogos" items={reposGames} featuredItems={reposGamesFeatured} />
      ) : (
        <NoProjectsFound />
      )}
    </>
  );
};

export default Games;
