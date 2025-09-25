import NoProjectsFound from "@/components/NoProjectsFound";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
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
