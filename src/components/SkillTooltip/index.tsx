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
    setIsClicked(!isClicked);
    setTimeout(() => {
      setIsShowing(false);
      setIsClicked(false);
    }, 5000);
  };

  const handleHover = (hover: boolean) => {
    if (!isClicked && hover) {
      setIsShowing(true);
    } else if (!isClicked && !hover) {
      setIsShowing(false);
    }
  };

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
      className="relative flex justify-center items-center"
      onMouseEnter={() => {
        handleHover(true);
      }}
      onMouseLeave={() => {
        handleHover(false);
      }}
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
        >
          <small className="text-amber-700 text-[1.2rem] block">
            (Clique para fixar o popup temporariamente)
          </small>
          {text}
          {url && (
            <p className="text-[1.5rem]">
              Você pode ver mais em:{" "}
              <a className="text-blue-500" href={url} target="_blank">
                {url}
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
