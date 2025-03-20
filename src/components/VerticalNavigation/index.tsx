/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import "./verticalNavigation.css";

const VerticalNavigation = (props: React.PropsWithChildren<{}>) => {
  return (
    <header className="fixed z-10 left-25 top-30">
      <nav className=" bg-black/10 border border-white/10 rounded-[80px] backdrop-blur-lg shadow-lg shadow-black/20">
        <ul className="flex flex-col gap-15 p-5">
          {React.Children.map(props.children, (item, index) => {
            const href = (item as any).props.href || "#";
            const dataTitle = (item as any).props["data-title"] || "";
            return (
              <li
                data-title={dataTitle}
                className="item personalized-title"
                key={index}
              >
                <Link href={href}> {item}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default VerticalNavigation;
