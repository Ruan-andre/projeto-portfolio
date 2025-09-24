import NoProjectsFound from "@/components/NoProjectsFound";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
  // Para desenvolvimento, usar função server-side direta
  if (process.env.NODE_ENV === "development") {
    const { getDataRepo } = await import("@/functions/server");
    const { urlReposUtilities, urlReposUtilitiesFeatured } = await import("@/constants/urlsApiGithub");

    try {
      const [reposUtilities, reposUtilitiesFeatured] = await Promise.all([
        getDataRepo(urlReposUtilities),
        getDataRepo(urlReposUtilitiesFeatured),
      ]);

      return { reposUtilities, reposUtilitiesFeatured };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { reposUtilities: [], reposUtilitiesFeatured: [] };
    }
  }

  // Para produção, usar API routes
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const [utilitiesRes, utilitiesFeaturedRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects?type=utilities`, {
        next: { revalidate: 300 }, // Revalida a cada 5 minutos
      }),
      fetch(`${baseUrl}/api/projects?type=utilities-featured`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!utilitiesRes.ok || !utilitiesFeaturedRes.ok) {
      console.error("Failed to fetch projects data");
      return { reposUtilities: [], reposUtilitiesFeatured: [] };
    }

    const [reposUtilities, reposUtilitiesFeatured] = await Promise.all([
      utilitiesRes.json(),
      utilitiesFeaturedRes.json(),
    ]);

    return {
      reposUtilities: reposUtilities as GithubProjectsData[],
      reposUtilitiesFeatured: reposUtilitiesFeatured as GithubProjectsData[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { reposUtilities: [], reposUtilitiesFeatured: [] };
  }
}

const Utilities = async () => {
  const { reposUtilities, reposUtilitiesFeatured } = await getProjectsData();

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
