/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";

const VerticalNavigation = (props: React.PropsWithChildren<{}>) => {
  return (
    <nav className=" bg-black/10 border border-white/10 rounded-[80px] backdrop-blur-lg shadow-lg shadow-black/20">
      <ul className="flex flex-col gap-15 p-5">
        {React.Children.map(props.children, (item, index) => {
          const href = (item as any).props.href || "#";
          const dataTitle = (item as any).props.dataTitle || "";
          return (
            <li
              data-title={dataTitle}
              className="hover:scale-125 hover:opacity-100 transition-transform opacity-45 personalized-title"
              key={index}
            >
              <Link href={href}> {item}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default VerticalNavigation;
