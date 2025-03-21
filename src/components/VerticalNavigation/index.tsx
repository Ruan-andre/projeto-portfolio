/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React, { useState } from "react";
import "./verticalNavigation.css";
import { Icon } from "../../../public/assets/icons";

const VerticalNavigation = (props: React.PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed z-10 left-25 top-30">
      <button className="btn-hamburguer" onClick={() => setIsOpen(!isOpen)}>
        <Icon icon="ci:menu-alt-01" width={70} height={70} />
      </button>

      <nav
        className={`bg-black/10 border border-white/10 rounded-[80px] backdrop-blur-lg shadow-lg shadow-black/20 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="flex flex-col gap-15 p-5">
          {React.Children.map(props.children, (item, index) => {
            const href = (item as any).props.href || "#";
            const dataTitle = (item as any).props["data-title"] || "";
            return (
              <li
                data-title={dataTitle}
                className="item personalized-title"
                key={index}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link
                  className="flex flex-col justify-center items-center"
                  href={href}
                >
                  {" "}
                  {item}{" "}
                  <span className="text-white text-2xl hidden max-sm:block">
                    {dataTitle}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default VerticalNavigation;
