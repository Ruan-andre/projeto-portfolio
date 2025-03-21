"use client";
import {
  urlReposUtilities,
  urlReposUtilitiesFeatured,
} from "@/constants/urlsApiGithub";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useState, useEffect } from "react";

const Utilities = () => {
  const [reposGames, setReposGames] = useState({} as GithubProjectsData[]);
  const [reposGamesFeatured, setReposGamesFeatured] = useState({} as GithubProjectsData[]);

  useEffect(() => {
    async function fetchData() {
      setReposGames(await getDataRepo(urlReposUtilities));
      setReposGamesFeatured(await getDataRepo(urlReposUtilitiesFeatured));
    }

    fetchData();
  }, []);

  return (
    <>
      {((reposGames.length > 0 || reposGamesFeatured.length > 0) && (
        <ProjectsCards
          title="Projetos de Utilitários"
          items={reposGames}
          featuredItems={reposGamesFeatured}
        />
      )) || <NoProjectsFound />}
    </>
  );
};
export default Utilities;
