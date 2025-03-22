import { Icon } from "../../../public/assets/icons";
import Technologies from "@/types/Technologies";

const ProjectTechnologies = ({ techs }: { techs: Technologies[] | undefined }) => {
  return (
    <>
      {techs?.map((item, index) => (
        <div key={index} data-title={item.name} className="personalized-title hover-transform-scale">
          <Icon icon={item.iconName} width="30" height="30" />
        </div>
      ))}
    </>
  );
};

export default ProjectTechnologies;
