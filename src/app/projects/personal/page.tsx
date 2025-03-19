"use client";
import { urlReposPersonal, urlReposPersonalFeatured } from "@/assets/variables";
import NoProjectsFound from "@/components/NoProjectsFound";
import { getDataRepo } from "@/functions";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";
import { useState, useEffect } from "react";

const Personal = () => {
  const [reposPersonal, setReposPersonal] = useState(
    {} as GithubProjectsData[]
  );

  const [reposPersonalFeatured, setReposPersonalFeatured] = useState(
    {} as GithubProjectsData[]
  );

  useEffect(() => {
    async function fetchData() {
      const dataPersonal = await getDataRepo(urlReposPersonal);
      const dataPersonalFeatured = await getDataRepo(urlReposPersonalFeatured);

      setReposPersonal(dataPersonal);
      setReposPersonalFeatured(dataPersonalFeatured);
    }

    fetchData();
  }, []);

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
