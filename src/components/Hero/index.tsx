"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import useTypingEffect from "@/hooks/useTypingEffect";
import profilePicture from "../../../public/assets/img/profile-picture.jpg";

import { Icon } from "@iconify/react";
import Link from "next/link";

interface HeroProps {
  myAge: string | number;
  experienceYears: string | number;
}

const Hero = ({ myAge, experienceYears }: HeroProps) => {
  const { language, t } = useLanguage();

  const phrasesPT = ["Desenvolvedor Full Stack", "Apaixonado por Back-end", "Focado em Performance"];
  const phrasesEN = ["Full Stack Developer", "Passionate about Back-end", "Focused on Performance"];

  const typingTitle = useTypingEffect(language === "pt" ? phrasesPT : phrasesEN, 100);

  return (
    <header id="presentation" className="hero-container">
      <div className="hero-text-content">
        <h1 className="hero-title">
          {t("Olá, eu sou", "Hello, I am")}{" "}
          <span className="text-special tracking-widest uppercase block md:inline">André Ruan!</span>
        </h1>

        <div className="hero-subtitle-wrapper">
          <h2 className="hero-subtitle">
            {t("Sou", "I am")}{" "}
            <span className="text-special tracking-widest font-semibold typing-effect">{typingTitle}</span>
          </h2>
        </div>

        <p className="hero-description">
          {t("Tenho ", "I'm ")}
          {myAge}
          {t(" anos e atuo na área da tecnologia há ", " years old and have been working in technology for ")}
          <span className="text-special font-normal opacity-100">
            {experienceYears} {t("anos.", "years.")}
          </span>
          {t(
            " Minha paixão pela programação começou quando iniciei a faculdade de Análise e Desenvolvimento de Sistemas. Hoje, trabalho profissionalmente como Desenvolvedor Full Stack, mas admito que o backend é minha verdadeira paixão.😂❤️",
            " My passion for programming started when I began my systems analysis and development degree. Today, I work professionally as a Full Stack Developer, but I admit that backend is my true passion.😂❤️",
          )}
        </p>

        <Link
          href={t(
            "/assets/curriculo/Curriculo_Andre_Ruan_Desenvolvedor_PT-BR.pdf",
            "/assets/curriculo/Curriculum_Andre_Ruan_Developer_EN.pdf",
          )}
          download
          className="btn-download-cv group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="ph:file-pdf-bold" className="btn-download-cv-icon group-hover:scale-110" />
          {t("Download CV", "Download resume")}
        </Link>
      </div>

      <div className="hero-profile-wrapper group">
        <div className="hero-profile-glow"></div>
        <a
          href="https://www.linkedin.com/in/andr%C3%A9-ruan-554854250/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={profilePicture} alt="André Ruan" className="hero-profile-image" priority />
        </a>
      </div>
    </header>
  );
};

export default Hero;
