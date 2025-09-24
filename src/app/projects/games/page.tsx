import NoProjectsFound from "@/components/NoProjectsFound";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
  // Para desenvolvimento, usar função server-side direta
  if (process.env.NODE_ENV === "development") {
    const { getDataRepo } = await import("@/functions/server");
    const { urlReposGames, urlReposGamesFeatured } = await import("@/constants/urlsApiGithub");

    try {
      const [reposGames, reposGamesFeatured] = await Promise.all([
        getDataRepo(urlReposGames),
        getDataRepo(urlReposGamesFeatured),
      ]);

      return { reposGames, reposGamesFeatured };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { reposGames: [], reposGamesFeatured: [] };
    }
  }

  // Para produção, usar API routes
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const [gamesRes, gamesFeaturedRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects?type=games`, {
        next: { revalidate: 300 }, // Revalida a cada 5 minutos
      }),
      fetch(`${baseUrl}/api/projects?type=games-featured`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!gamesRes.ok || !gamesFeaturedRes.ok) {
      console.error("Failed to fetch projects data");
      return { reposGames: [], reposGamesFeatured: [] };
    }

    const [reposGames, reposGamesFeatured] = await Promise.all([gamesRes.json(), gamesFeaturedRes.json()]);

    return {
      reposGames: reposGames as GithubProjectsData[],
      reposGamesFeatured: reposGamesFeatured as GithubProjectsData[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { reposGames: [], reposGamesFeatured: [] };
  }
}

const Games = async () => {
  const { reposGames, reposGamesFeatured } = await getProjectsData();

  return (
    <>
      {reposGames.length > 0 || reposGamesFeatured.length > 0 ? (
        <ProjectsCards title="Projetos de Jogos" items={reposGames} featuredItems={reposGamesFeatured} />
      ) : (
        <NoProjectsFound />
      )}
    </>
  );
};

export default Games;
