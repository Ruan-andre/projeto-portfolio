import { useProjectsModal } from "@/context/ProjectsModalContext";
import ProjectTechnologies from "../ProjectTechnologies";
import { Icon } from "../../../public/assets/icons";

const ProjectPopupDetails = () => {
  const { isOpen, modalData, closeModal } = useProjectsModal();

  if (!isOpen || !modalData) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <h1>{modalData.name}</h1>
          <button className="btn-close-modal" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="project-modal-body">
          <div className="video-container">
            <iframe src={modalData.urlVideo} allowFullScreen title="Vídeo do projeto"></iframe>
          </div>

          <div className="project-info">
            <div className="project-text">
              <p className="mb-[1rem]">{modalData.description}</p>
              <div className="flex gap-[1rem] items-center">
                <span className="tech-title">Tecnologias utilizadas:</span>
                <ProjectTechnologies techs={modalData?.languages} />
              </div>
            </div>
          </div>

          <footer className="project-modal-footer">
            <div className="project-modal-buttons">
              <a
                href={modalData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-btn project-modal-btn-code"
              >
                <Icon icon="ri:github-fill" width="30" height="30" />
                Código {`</>`}
              </a>
              {modalData?.linkedin && (
                <a
                  href={modalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-btn project-modal-btn-linkedin"
                >
                  <Icon icon="uil:linkedin" width="30" height="30" />
                  Post LinkedIn
                </a>
              )}
              {modalData?.liveProject && (
                <a
                  href={modalData.liveProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-btn project-modal-btn-live"
                >
                  <Icon icon="lsicon:play-filled" width="30" height="30" />
                  Acessar Projeto
                </a>
              )}
            </div>
            <data className="project-modal-date">Criado em: {modalData.created_at}</data>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopupDetails;
