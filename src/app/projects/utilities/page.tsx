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
  const [reposUtilities, setReposUtilities] = useState<GithubProjectsData[]>([]);
  const [reposUtilitiesFeatured, setReposUtilitiesFeatured] = useState<GithubProjectsData[]>([]);
  const { isLoading, setIsLoading } = useSkeleton();

  useEffect(() => {
    async function fetchData() {
      setReposUtilities(await getDataRepo(urlReposUtilities));
      setReposUtilitiesFeatured(await getDataRepo(urlReposUtilitiesFeatured));
      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <SkeletonProjects />;

  return (
    <>
      {((reposUtilities.length > 0 || reposUtilitiesFeatured.length > 0) && (
        <ProjectsCards
          title="Projetos de Utilitários"
          items={reposUtilities}
          featuredItems={reposUtilitiesFeatured}
        />
      )) || <NoProjectsFound />}
    </>
  );
};
export default Utilities;
