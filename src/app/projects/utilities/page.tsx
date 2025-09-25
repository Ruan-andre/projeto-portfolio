import NoProjectsFound from "@/components/NoProjectsFound";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
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

const Utilities = async () => {
  const { reposUtilities, reposUtilitiesFeatured } = await getProjectsData();

  return (
    <>
      {reposUtilities.length > 0 || reposUtilitiesFeatured.length > 0 ? (
        <ProjectsCards
          title="Projetos de Utilitários"
          items={reposUtilities}
          featuredItems={reposUtilitiesFeatured}
        />
      ) : (
        <NoProjectsFound />
      )}
    </>
  );
};

export default Utilities;
