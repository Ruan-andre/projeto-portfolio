"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@iconify/react";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
      <button
        onClick={toggleLanguage}
        className="bg-white/5 border border-border hover:border-special transition-all flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[1.4rem] backdrop-blur-md shadow-2xl text-white group"
      >
        <Icon icon="ph:translate-bold" className="text-[2rem] text-gray-400 group-hover:text-special" />
        <span className="tracking-widest">{language === "pt" ? "PT / EN" : "EN / PT"}</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
