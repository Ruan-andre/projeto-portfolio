"use client";

import { Icon } from "../../../public/assets/icons";
import VerticalNavigation from "@/components/VerticalNavigation";
import { usePathname } from "next/navigation";
import ProjectsTypes from "@/enums/ProjectsTypes";
import { ProjectsModalProvider } from "@/context/ProjectsModalContext";
import ProjectPopupDetails from "@/components/ProjectPopupDetails";
import "./projects.css";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectsModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ProjectsModalProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const project = pathName.substring(pathName.lastIndexOf("/") + 1);

  const attrIcon1 = {
    nameIcon: project.includes(ProjectsTypes.Utilities)
      ? "mingcute:game-2-fill"
      : project.includes(ProjectsTypes.Games)
      ? "ion:person"
      : project.includes(ProjectsTypes.Personal)
      ? "mdi:gear"
      : "",
    dataTitleIcon: project.includes(ProjectsTypes.Utilities)
      ? "Projetos de Jogos"
      : project.includes(ProjectsTypes.Games)
      ? "Projetos Pessoais"
      : project.includes(ProjectsTypes.Personal)
      ? "Projetos Utilitários"
      : "",
    hrefIcon: project.includes(ProjectsTypes.Utilities)
      ? "./games"
      : project.includes(ProjectsTypes.Games)
      ? "./personal"
      : project.includes(ProjectsTypes.Personal)
      ? "./utilities"
      : "",
  };

  const attrIcon2 = {
    nameIcon: project.includes(ProjectsTypes.Utilities)
      ? "ion:person"
      : project.includes(ProjectsTypes.Games)
      ? "mdi:gear"
      : project.includes(ProjectsTypes.Personal)
      ? "mingcute:game-2-fill"
      : "",
    dataTitleIcon: project.includes(ProjectsTypes.Utilities)
      ? "Projetos Pessoais"
      : project.includes(ProjectsTypes.Games)
      ? "Projetos Utilitários"
      : project.includes(ProjectsTypes.Personal)
      ? "Projetos de Jogos"
      : "",
    hrefIcon: project.includes(ProjectsTypes.Utilities)
      ? "./personal"
      : project.includes(ProjectsTypes.Games)
      ? "./utilities"
      : project.includes(ProjectsTypes.Personal)
      ? "./games"
      : "",
  };

  return (
    <>
      <VerticalNavigation>
        <Icon
          icon="ic:round-home"
          width="35"
          height="35"
          data-title="Inicio"
          href="/"
        />
        <Icon
          icon={attrIcon1.nameIcon}
          width="35"
          height="35"
          data-title={attrIcon1.dataTitleIcon}
          href={attrIcon1.hrefIcon}
        />
        <Icon
          icon={attrIcon2.nameIcon}
          width="35"
          height="35"
          data-title={attrIcon2.dataTitleIcon}
          href={attrIcon2.hrefIcon}
        />
      </VerticalNavigation>
      {children}
      <ProjectPopupDetails />
    </>
  );
}
