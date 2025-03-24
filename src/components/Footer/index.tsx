"use client";

import { useSkeleton } from "@/context/SkeletonContext";
import ContactCard from "../ContactCard";
import SkeletonFooter from "../skeletons/footer";

const Footer = () => {
  const { isLoading } = useSkeleton();

  if (isLoading) {
    return <SkeletonFooter />;
  }

  return (
    <footer className="relative bg-background w-full mt-[10rem] top-[100%]">
      <h3 className="text-[4rem] pb-[4rem] pr-[7rem] max-sm:pr-0 font-semibold text-center">Contatos</h3>
      <section id="contacts" className="col-span-4 flex flex-col">
        <div className="contacts bg-shadow-brown-red">
          <ContactCard
            href="https://github.com/ruan-andre"
            iconName="mdi:github"
            title="Github"
            info="@ruan-andre"
          />
          <ContactCard
            href="https://www.linkedin.com/in/andr%C3%A9-ruan-554854250/"
            iconName="devicon:linkedin"
            title="Linkedin"
          />
          <ContactCard iconName="logos:google-gmail" title="E-mail" info="ruan.fullstack@gmail.com" />
        </div>
      </section>
      <p className="text-[1.6rem] text-center mb-[2rem] mt-[2rem]">© André Ruan | 2025</p>
    </footer>
  );
};

export default Footer;
