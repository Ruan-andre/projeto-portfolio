"use client";

import ModalContextType from "@/interfaces/ModalContextType";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ProjectsModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<GithubProjectsData>({
    html_url: "",
    name: "",
    description: "",
    created_at: "",
    urlVideo: "",
  });

  const openModal = (data: GithubProjectsData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    function closeModalWithEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.body.classList.add("no-scroll");
      document.body.addEventListener("keyup", closeModalWithEsc);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.body.removeEventListener("keyup", closeModalWithEsc);
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useProjectsModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
