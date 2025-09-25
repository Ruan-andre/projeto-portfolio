import NoProjectsFound from "@/components/NoProjectsFound";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
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
