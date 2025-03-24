"use client";
import { urlReposPersonal, urlReposPersonalFeatured } from "@/constants/urlsApiGithub";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useState, useEffect } from "react";
import { useSkeleton } from "@/context/SkeletonContext";
import SkeletonProjects from "@/components/skeletons/projects";

const Personal = () => {
  const [reposPersonal, setReposPersonal] = useState({} as GithubProjectsData[]);
  const [reposPersonalFeatured, setReposPersonalFeatured] = useState({} as GithubProjectsData[]);
  const { isLoading, setIsLoading } = useSkeleton();

  useEffect(() => {
    async function fetchData() {
      setReposPersonal(await getDataRepo(urlReposPersonal));
      setReposPersonalFeatured(await getDataRepo(urlReposPersonalFeatured));
    }
    setIsLoading(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <SkeletonProjects />;
  }
  return (
    <>
      {((reposPersonal.length > 0 || reposPersonalFeatured.length > 0) && (
        <ProjectsCards
          title="Projetos Pessoais"
          items={reposPersonal}
          featuredItems={reposPersonalFeatured}
        />
      )) || <NoProjectsFound />}
    </>
  );
};

export default Personal;
