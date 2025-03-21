"use client";

import { useGenericModal } from "@/context/GenericPopupMessageContext";
import { useEffect, useState } from "react";

const AUTO_CLOSE_DELAY = 3000;

const GenericPopupMessage = () => {
  const { isOpen, modalData, closeModal } = useGenericModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        closeModal();
      }, AUTO_CLOSE_DELAY);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen, closeModal]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-[7rem] right-[2rem] w-[25rem] h-[10rem] max-w-[25rem] max-h-[10rem] text-[1.8rem] p-4 rounded-lg shadow-lg flex items-center justify-center bg-green-500/90 transition-all duration-300 transform ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${modalData?.bgClassColor || ""} ${modalData?.textClassColor || ""}`}
    >
      {modalData?.content}
      <button
        className="absolute text-[1.2rem] top-3 right-3 text-lg font-bold hover:text-red-600 transition-colors duration-200"
        onClick={closeModal}
      >
        ✖
      </button>
    </div>
  );
};

export default GenericPopupMessage;
