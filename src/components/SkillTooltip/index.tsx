"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const SkillTooltip = ({ text, url, children }: { text: string; url?: string; children: React.ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState<"right" | "left">("right");
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    const nextClickedState = !isClicked;

    if (nextClickedState) {
      // Fecha todos os outros tooltips antes de abrir este
      window.dispatchEvent(new CustomEvent("close-all-tooltips", { detail: containerRef.current }));
      setIsShowing(true);
      setIsClicked(true);

      setTimeout(() => {
        setIsShowing(false);
        setIsClicked(false);
      }, 5000);
    } else {
      setIsShowing(false);
      setIsClicked(false);
    }
  };

  const handleHover = (hover: boolean) => {
    if (!isClicked && hover) {
      // Notifica os outros tooltips para fecharem antes de abrir este
      window.dispatchEvent(new CustomEvent("close-all-tooltips", { detail: containerRef.current }));
      setIsShowing(true);
    } else if (!isClicked && !hover) {
      setIsShowing(false);
    }
  };

  const handleCloseAll = (e: Event) => {
    const customEvent = e as CustomEvent<HTMLDivElement | null>;
    // Se o evento vier de outro componente, fecha este
    if (customEvent.detail !== containerRef.current) {
      setIsShowing(false);
      setIsClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("close-all-tooltips", handleCloseAll);
    return () => window.removeEventListener("close-all-tooltips", handleCloseAll);
  }, []);

  useEffect(() => {
    if (isShowing && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (containerRect.right + tooltipRect.width > screenWidth) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    }
  }, [isShowing]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center w-fit"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      {children}
      {isShowing && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          animate={{ opacity: 1, x: position === "right" ? 15 : -15 }}
          exit={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`tooltip ${position === "right" ? "tooltip-right" : "tooltip-left"}`}
          style={{ zIndex: 100 }}
        >
          <small className="hidden md:block text-amber-700 text-[1.2rem] mb-2 font-bold uppercase tracking-wider">
            (Clique para fixar o popup)
          </small>
          <p>{text}</p>
          {url && (
            <p className="mt-4 pt-3 border-t border-gray-200 text-[1.4rem]">
              Ver documentação:{" "}
              <a
                className="text-blue-600 font-bold underline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link Oficial
              </a>
            </p>
          )}
          <div className={`tooltip-arrow ${position === "right" ? "arrow-right" : "arrow-left"}`}></div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillTooltip;
