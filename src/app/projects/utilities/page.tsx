"use client";
import { urlReposUtilities, urlReposUtilitiesFeatured } from "@/constants/urlsApiGithub";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useState, useEffect } from "react";
import { useSkeleton } from "@/context/SkeletonContext";
import SkeletonProjects from "@/components/skeletons/projects";

const Utilities = () => {
  const [reposGames, setReposGames] = useState({} as GithubProjectsData[]);
  const [reposGamesFeatured, setReposGamesFeatured] = useState({} as GithubProjectsData[]);
  const { isLoading, setIsLoading } = useSkeleton();

  useEffect(() => {
    async function fetchData() {
      setReposGames(await getDataRepo(urlReposUtilities));
      setReposGamesFeatured(await getDataRepo(urlReposUtilitiesFeatured));
      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <SkeletonProjects />;
  } else {
    setIsLoading(true);
  }

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
