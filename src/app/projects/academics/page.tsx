import NoProjectsFound from "@/components/NoProjectsFound";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
  // Para desenvolvimento, usar função server-side direta
  if (process.env.NODE_ENV === "development") {
    const { getDataRepo } = await import("@/functions/server");
    const { urlReposAcademics, urlReposAcademicsFeatured } = await import("@/constants/urlsApiGithub");

    try {
      const [reposAcademics, reposAcademicsFeatured] = await Promise.all([
        getDataRepo(urlReposAcademics),
        getDataRepo(urlReposAcademicsFeatured),
      ]);

      return { reposAcademics, reposAcademicsFeatured };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { reposAcademics: [], reposAcademicsFeatured: [] };
    }
  }

  // Para produção, usar API routes
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const [academicsRes, academicsFeaturedRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects?type=academics`, {
        next: { revalidate: 300 }, // Revalida a cada 5 minutos
      }),
      fetch(`${baseUrl}/api/projects?type=academics-featured`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!academicsRes.ok || !academicsFeaturedRes.ok) {
      console.error("Failed to fetch projects data");
      return { reposAcademics: [], reposAcademicsFeatured: [] };
    }

    const [reposAcademics, reposAcademicsFeatured] = await Promise.all([
      academicsRes.json(),
      academicsFeaturedRes.json(),
    ]);

    return {
      reposAcademics: reposAcademics as GithubProjectsData[],
      reposAcademicsFeatured: reposAcademicsFeatured as GithubProjectsData[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { reposAcademics: [], reposAcademicsFeatured: [] };
  }
}

const Academics = async () => {
  const { reposAcademics, reposAcademicsFeatured } = await getProjectsData();

  return (
    <>
      {reposAcademics.length > 0 || reposAcademicsFeatured.length > 0 ? (
        <ProjectsCards
          title="Projetos Acadêmicos"
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
