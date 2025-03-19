import { Icon } from "@/assets/icons";
import Technologies from "@/types/Technologies";

const ProjectTechnologies = ({
  techs,
}: {
  techs: Technologies[] | undefined;
}) => {
  return (
    <>
      {techs?.map((item, index) => (
        <Icon
          key={index}
          icon={item.iconName}
          data-title={item.name}
          width="25"
          height="25"
        />
      ))}
    </>
  );
};

export default ProjectTechnologies;
