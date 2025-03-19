"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import GenericPopupContextType from "../interfaces/GenericPopupContextType";
import GenericPopupMessageData from "@/interfaces/GenericPopupMessageData";

const ModalContext = createContext<GenericPopupContextType | undefined>(
  undefined
);
export const GenericPopupMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<GenericPopupMessageData>({
    btnCloseClassColor: "",
    bgClassColor: "",
    textClassColor: "",
    width: "",
    height: "",
  });

  const openModal = (data: GenericPopupMessageData) => {
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
      document.body.addEventListener("keyup", closeModalWithEsc);
    }
    return () => {
      document.body.removeEventListener("keyup", closeModalWithEsc);
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
