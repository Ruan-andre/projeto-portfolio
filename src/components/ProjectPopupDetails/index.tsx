"use client";

import { useProjectsModal } from "@/context/ProjectsModalContext";
import ProjectTechnologies from "../ProjectTechnologies";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

const ProjectPopupDetails = () => {
  const { isOpen, modalData, closeModal } = useProjectsModal();
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !modalData) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "active" : ""}`} onClick={handleOverlayClick}>
      <div className="modal-content !overflow-hidden flex flex-col p-0 shadow-[0_0_150px_rgba(140,249,255,0.1)]">
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 md:top-10 md:right-10 z-[110] text-[4rem] md:text-[5rem] text-gray-500 hover:text-red-500 transition-all font-light leading-none"
        >
          &times;
        </button>

        <div className="overflow-y-auto p-8 md:p-10 flex flex-col gap-8 md:gap-10">
          <div className="video-container !w-full max-w-[40rem] md:max-w-[65rem] !pb-[42%] shadow-2xl border border-white/5">
            <iframe
              src={modalData.urlVideo}
              allowFullScreen
              title={modalData.name}
              className="rounded-[1.6rem]"
            ></iframe>
          </div>

          <div className="flex flex-col gap-8 md:gap-10 px-4 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
              <h2 className="text-[2rem] md:text-[3.2rem] text-white tracking-tighter uppercase leading-none pr-12 md:pr-0">
                {modalData.name}
              </h2>
              <span className="text-gray-500 font-bold text-[1.2rem] md:text-[1.4rem] uppercase tracking-widest flex items-center gap-3">
                <Icon icon="ph:calendar-blank-bold" className="text-[2.2rem]" />
                {t("Criado em", "Created at")}: {modalData.created_at}
              </span>
            </div>

            <p className="text-[1.8rem] md:text-[2rem] text-gray-400 leading-relaxed font-light">
              {modalData.description}
            </p>

            <div className="flex flex-col gap-4">
              <span className="text-gray-500 font-bold text-[1.2rem] uppercase tracking-[0.3rem]">
                {t("TECNOLOGIAS UTILIZADAS", "TECHNOLOGIES USED")}
              </span>
              <ProjectTechnologies techs={modalData.languages} variant="badges" />
            </div>

            <div className="flex flex-wrap gap-6 mt-4">
              <a
                href={modalData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#1e2026] text-white border border-border px-10 py-4 rounded-full font-black uppercase text-[1.2rem] tracking-widest hover:border-special hover:text-special transition-all shadow-2xl"
              >
                <Icon icon="mdi:github" className="text-[2.4rem]" />
                {t("CÓDIGO </>", "CODE </>")}
              </a>

              {modalData.linkedin && (
                <a
                  href={modalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#0a66c2] text-white px-10 py-4 rounded-full font-black uppercase text-[1.2rem] tracking-widest hover:brightness-110 transition-all shadow-lg"
                >
                  <Icon icon="mdi:linkedin" className="text-[2.4rem]" />
                  {t("POST LINKEDIN", "POST LINKEDIN")}
                </a>
              )}

              {modalData.liveProject && (
                <a
                  href={modalData.liveProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#00a843] text-white px-10 py-4 rounded-full font-black uppercase text-[1.2rem] tracking-widest hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,168,67,0.3)]"
                >
                  <Icon icon="ph:play-fill" className="text-[2.4rem]" />
                  {t("ACESSAR PROJETO", "ACCESS PROJECT")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopupDetails;
