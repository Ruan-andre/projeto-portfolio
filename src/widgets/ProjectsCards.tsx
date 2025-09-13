import ProjectCard from "@/components/ProjectCard";
import ProjectsCardsProps from "@/interfaces/ProjectsCardsProps";

const ProjectsCards = ({ title, items, featuredItems }: ProjectsCardsProps) => {
  return (
    <section className="projects-section">
      <h1 className="text-[4rem] text-center">{title}</h1>
      <div className="flex flex-col gap-[3rem]">
        {featuredItems.length > 0 && (
          <div>
            <h2 className="projects-page-title">Destaques</h2>
            <div className="projects-list">
              {featuredItems.map((item, index) => {
                return (
                  <ProjectCard
                    key={index}
                    html_url={item.html_url}
                    name={item.name}
                    description={item.description}
                    created_at={item.created_at}
                  />
                );
              })}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div>
            <h2 className="projects-page-title">Todos</h2>
            <div className="projects-list">
              {items.length > 0 &&
                items.map((item, index) => {
                  return (
                    <ProjectCard
                      key={index}
                      html_url={item.html_url}
                      name={item.name}
                      description={item.description}
                      created_at={item.created_at}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsCards;
