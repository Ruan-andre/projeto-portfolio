"use client";
import {
  urlReposGames,
  urlReposGamesFeatured,
} from "@/constants/urlsApiGithub";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";

const Games = () => {
  const [reposGames, setReposGames] = useState<GithubProjectsData[]>([]);
  const [reposGamesFeatured, setReposGamesFeatured] = useState<GithubProjectsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {reposGames.length > 0 || reposGamesFeatured.length > 0 ? (
        <ProjectsCards
          title="Projetos de Jogos"
          items={reposGames}
          featuredItems={reposGamesFeatured}
        />
      ) : (
        <NoProjectsFound />
      )}
    </>
  );
};

export default Games;
