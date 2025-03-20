"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const SkillTooltip = ({
  text,
  url,
  children,
}: {
  text: string;
  url?: string;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"right" | "left">("right");
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isHovered && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (containerRect.right + tooltipRect.width > screenWidth) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          animate={{ opacity: 1, x: position === "right" ? 15 : -15 }}
          exit={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`tooltip ${
            position === "right" ? "tooltip-right" : "tooltip-left"
          }`}
        >
          {text}
          {url && (
            <p className="mt-2">
              Você pode ver mais em:{" "}
              <a
                className="text-blue-500 font-medium"
                href={url}
                target="_blank"
              >
                {url}
              </a>
            </p>
          )}
          <div
            className={`tooltip-arrow ${
              position === "right" ? "arrow-right" : "arrow-left"
            }`}
          ></div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillTooltip;
