import GithubProjectsData from "./GithubProjectsData";

interface ModalContextType {
  isOpen: boolean;
  modalData: GithubProjectsData;
  openModal: (data: GithubProjectsData) => void;
  closeModal: () => void;
}

export default ModalContextType;
