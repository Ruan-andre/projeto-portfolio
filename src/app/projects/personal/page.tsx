import NoProjectsFound from "@/components/NoProjectsFound";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
  // Para desenvolvimento, usar função server-side direta
  if (process.env.NODE_ENV === "development") {
    const { getDataRepo } = await import("@/functions/server");
    const { urlReposPersonal, urlReposPersonalFeatured } = await import("@/constants/urlsApiGithub");

    try {
      const [reposPersonal, reposPersonalFeatured] = await Promise.all([
        getDataRepo(urlReposPersonal),
        getDataRepo(urlReposPersonalFeatured),
      ]);

      return { reposPersonal, reposPersonalFeatured };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { reposPersonal: [], reposPersonalFeatured: [] };
    }
  }

  // Para produção, usar API routes
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const [personalRes, personalFeaturedRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects?type=personal`, {
        next: { revalidate: 300 }, // Revalida a cada 5 minutos
      }),
      fetch(`${baseUrl}/api/projects?type=personal-featured`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!personalRes.ok || !personalFeaturedRes.ok) {
      console.error("Failed to fetch projects data");
      return { reposPersonal: [], reposPersonalFeatured: [] };
    }

    const [reposPersonal, reposPersonalFeatured] = await Promise.all([
      personalRes.json(),
      personalFeaturedRes.json(),
    ]);

    return {
      reposPersonal: reposPersonal as GithubProjectsData[],
      reposPersonalFeatured: reposPersonalFeatured as GithubProjectsData[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { reposPersonal: [], reposPersonalFeatured: [] };
  }
}

const Personal = async () => {
  const { reposPersonal, reposPersonalFeatured } = await getProjectsData();

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
