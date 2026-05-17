import { useLanguage } from "@/context/LanguageContext";

const NoProjectsFound = () => {
  const { t } = useLanguage();
  return (
    <div className="container-center-full text-3xl">
      <p className="text-center">{t("SEM PROJETOS, POR ENQUANTO...", "NO PROJECTS FOUND, FOR NOW...")}</p>
    </div>
  );
};

export default NoProjectsFound;
