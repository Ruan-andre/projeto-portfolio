"use client";
import { useState, useEffect, useMemo } from "react";

const HomeClientWrapper = () => {
  const texts = useMemo(
    () => [
      "Desenvolvedor Full Stack",
      "Especialista em React",
      "Entusiasta de TypeScript",
      "Criador de Soluções",
    ],
    []
  );

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className="h-16 flex items-center">
      <h3 className="text-2xl lg:text-3xl text-blue-400 font-mono">
        {displayText}
        <span className="animate-pulse">|</span>
      </h3>
    </div>
  );
};

export default HomeClientWrapper;
