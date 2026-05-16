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

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<GithubProjectsData[]>([]);
  const [allProjects, setAllProjects] = useState<GithubProjectsData[]>([]);

  const { isLoading, setIsLoading } = useSkeleton();

  const myAge = useMemo(() => GetDate(new Date("1997-09-18"), "Y", true), []);
  const experienceYears = useMemo(() => GetDate(new Date("2020-01-01"), "Y", true), []);

  useEffect(() => {
    async function fetchData() {
      try {
        const featuredPromises = fetch(`/api/projects?type=featured`).then((res) => res.json());
        const allPromises = fetch(`/api/projects?type=all`).then((res) => res.json());

        const [featResults, allResults] = await Promise.all([featuredPromises, allPromises]);
        setAllProjects(allResults);
        setFeaturedProjects(featResults);
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
        <Hero myAge={myAge} experienceYears={experienceYears} />

        <ProjectsSection featuredProjects={featuredProjects} allProjects={allProjects} />

        <Expertise />
      </main>

      <ProjectPopupDetails />
    </ProjectsModalProvider>
  );
}
