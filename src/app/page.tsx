"use client";

import VerticalNavigation from "@/components/vertical-navigation";
import {
  IconHomeFilled,
  IconSquaresFilled,
  IconCodeCircle2Filled,
  IconMailFilled,
} from "./assets/icons";
import Image from "next/image";
import profilePicture from "../../public/img/portrait-of-a-man-using-a-computer-in-a-modern-office-picture-id1344688156-1.png";
import GetDate from "@/functions/getDate";

export default function Home() {
  return (
    <>
      <header>
        <VerticalNavigation>
          <IconHomeFilled size={"35px"} />
          <IconSquaresFilled size={"35px"} />
          <IconCodeCircle2Filled size={"35px"} />
          <IconMailFilled size={"35px"} />
        </VerticalNavigation>
      </header>
      <main
        id="presentation"
        className="container max-w-fit mx-auto grid grid-cols-[60%_40%] items-center gap-[9rem] m-auto pt-[7rem]"
      >
        <div className="flex flex-col gap-y-10">
          <h1 className="text-7xl">
            Olá, eu sou{" "}
            <span className="special-color tracking-widest">André Ruan!</span>
          </h1>
          <h2 className="text-5xl text-animation">
            Sou{" "}
            <span className="special-color tracking-widest">
              Desenvolvedor Full Stack
            </span>
          </h2>
          <p className="max-w-5xl text-[2.4rem] text-[#a1a2a3] tracking-widest">
            Tenho {GetDate(new Date("1997-09-18"), "Y", true)} anos e atuo na
            área da tecnologia há{" "}
            <span className="special-color opacity-100">
              {GetDate(new Date("2020-01-01"), "Y", true)} anos.
            </span>{" "}
            Me apaixonei pela área da programação há{" "}
            <span className="special-color">
              {GetDate(new Date("2020-07-01"), "Y", true)} anos,
            </span>{" "}
            quando comecei a faculdade de Análise e Desenvolvimento de Sistemas.
            <br />
          </p>
        </div>
        <div className="w-[45rem] aspect-square overflow-hidden rounded-full relative hover:custom-shadow">
          <Image
            alt="Foto de André Ruan"
            src={profilePicture}
            width={450} // Defina um tamanho fixo proporcional
            height={450}
            className="object-cover w-full h-full"
          />
        </div>
      </main>
      <section id="projects">
        <h2>Projects</h2>
        <div className="project">
          <img src="" alt="" />
          <h3>Project Title</h3>
          <p>Tipo de projeto</p>
        </div>
      </section>
    </>
  );
}
