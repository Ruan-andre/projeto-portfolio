"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/LanguageContext";

const VerticalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: "#presentation", icon: "ic:round-home", title: t("Início", "Home") },
    { href: "#projects", icon: "fluent:tabs-16-filled", title: t("Projetos", "Projects") },
    { href: "#skills", icon: "fa6-solid:code", title: t("Habilidades", "Skills") },
    { href: "#contacts", icon: "uiw:mail", title: t("Contato", "Contact") },
  ];

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <Icon icon={isOpen ? "ph:x-bold" : "ph:list-bold"} width="24" height="24" />
      </button>

      <aside className={`vertical-nav ${isOpen ? "is-open" : ""}`}>
        <nav className="nav-wrapper">
          <ul className="flex flex-col gap-8">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item-container">
                <a href={item.href} className="nav-link" onClick={() => setIsOpen(false)}>
                  <Icon icon={item.icon} width="32" height="32" />
                  <span className="nav-tooltip">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default VerticalNavigation;
