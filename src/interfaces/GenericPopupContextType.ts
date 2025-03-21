import GenericPopupMessageData from "./GenericPopupMessageData";

interface ModalContextType {
  isOpen: boolean;
  modalData: GenericPopupMessageData;
  openModal: (data: GenericPopupMessageData) => void;
  closeModal: () => void;
}

export default ModalContextType;
