/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const VerticalNavigation = (props: React.PropsWithChildren<{}>) => {
  return (
    <nav className="fixed left-25 top-30 bg-black/10 border border-white/10 rounded-[80px] backdrop-blur-lg shadow-lg shadow-black/20">
      <ul className="flex flex-col gap-15 p-5">
        {React.Children.map(props.children, (item, index) => {
          const href = (item as any).props.href || "#";
          return (
            <li
              className="hover:scale-125 hover:opacity-100 transition-transform opacity-45"
              key={index}
            >
              <a href={href}>{item}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default VerticalNavigation;
