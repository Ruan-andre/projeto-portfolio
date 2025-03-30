"use client";

import { Icon } from "../../../public/assets/icons";
import VerticalNavigation from "@/components/VerticalNavigation";
import { usePathname } from "next/navigation";
import { ProjectsModalProvider } from "@/context/ProjectsModalContext";
import ProjectPopupDetails from "@/components/ProjectPopupDetails";
import { projectsConfig } from "./projectsConfig";
import "./projects.css";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectsModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ProjectsModalProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const projectPath = pathName.split("/").pop();
  const iconsFiltered = projectsConfig.filter((item) => item.path !== projectPath);
  return (
    <>
      <VerticalNavigation>
        <Icon icon="ic:round-home" width="35" height="35" data-title="Inicio" href="/" />
        {iconsFiltered.map((item, index) => {
          return (
            <Icon
              key={index}
              icon={item.icon}
              width="35"
              height="35"
              data-title={item.title}
              href={`./${item.path}`}
            />
          );
        })}
      </VerticalNavigation>
      {children}
      <ProjectPopupDetails />
    </>
  );
}
