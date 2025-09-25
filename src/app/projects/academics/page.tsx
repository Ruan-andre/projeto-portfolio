import NoProjectsFound from "@/components/NoProjectsFound";
import ProjectsCards from "@/widgets/ProjectsCards";

async function getProjectsData() {
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
