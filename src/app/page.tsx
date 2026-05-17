"use client";

// GENERAL
import { useState, useEffect, useMemo } from "react";

// CONTEXT & HOOKS
import { useSkeleton } from "@/context/SkeletonContext";
import { ProjectsModalProvider } from "@/context/ProjectsModalContext";

// COMPONENTS
import VerticalNavigation from "@/components/VerticalNavigation";
import LanguageToggle from "@/components/LanguageToggle";
import SkeletonHome from "@/components/skeletons/home";
import ProjectPopupDetails from "@/components/ProjectPopupDetails";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import Expertise from "@/components/Expertise";

// TYPES & UTILS
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import { GetDate } from "@/utils/dateUtils";
import GithubData from "@/interfaces/GithubProfileData";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<GithubProjectsData[]>([]);
  const [allProjects, setAllProjects] = useState<GithubProjectsData[]>([]);
  const [githubData, setGithubData] = useState<GithubData>({
    name: "",
    picture: "",
    bio: "",
    profileUrl: "",
    email: "",
  });

  const { isLoading, setIsLoading } = useSkeleton();

  const myAge = useMemo(() => GetDate(new Date("1997-09-18"), "Y", true), []);
  const experienceYears = useMemo(() => GetDate(new Date("2020-01-01"), "Y", true), []);

  useEffect(() => {
    async function fetchData() {
      try {
        const featuredPromises = fetch(`/api/projects?type=featured`).then((res) => res.json());
        const allPromises = fetch(`/api/projects?type=all`).then((res) => res.json());
        const githubProfilePromise = fetch(`/api/github-profile`).then((res) => res.json());

        const [featResults, allResults, githubProfile] = await Promise.all([
          featuredPromises,
          allPromises,
          githubProfilePromise,
        ]);
        setAllProjects(allResults);
        setFeaturedProjects(featResults);
        setGithubData(githubProfile);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setIsLoading]);

  if (isLoading) return <SkeletonHome />;

  return (
    <ProjectsModalProvider>
      <LanguageToggle />
      <VerticalNavigation />

      <main>
        <Hero myAge={myAge} experienceYears={experienceYears} githubData={githubData} />

        <ProjectsSection featuredProjects={featuredProjects} allProjects={allProjects} />

        <Expertise />
      </main>

      <ProjectPopupDetails />
    </ProjectsModalProvider>
  );
}
