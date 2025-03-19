"use client";

import { useState } from "react";

interface PopupProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const GenericPopupMessage = ({
  children,
  className = "bg-green-500",
  onClose,
}: PopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 ${className}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-lg font-bold"
          onClick={handleClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default GenericPopupMessage;
