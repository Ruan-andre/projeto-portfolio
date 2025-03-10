"use client";

import VerticalNavigation from "@/components/vertical-navigation";
import { Icon } from "./assets/icons";
import Image from "next/image";
import { GetDate, useTypingEffect } from "@/functions/";
import { useEffect, useState } from "react";
import GithubData from "@/interfaces/githubData";
import Card from "@/components/card";
import game from "../../public/img/game.jpg";

export default function Home() {
  const [githubData, setGithubData] = useState<GithubData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/ruan-andre");
      const result = await response.json();
      const data: GithubData = {
        name: result.name,
        picture: result.avatar_url,
        bio: result.bio,
        profileUrl: result.html_url,
        email: result.email,
      };
      setGithubData(data);
    }

    fetchData();
  }, []);

  const professionalTitle = useTypingEffect(githubData?.bio || "", 100);

  return (
    <>
      <header>
        <VerticalNavigation>
          <Icon icon="ic:round-home" width="35" height="35" />
          <Icon icon="fluent:tabs-16-filled" width="35" height="35" />
          <Icon icon="fa6-solid:code" width="35" height="35" />
          <Icon icon="uiw:mail" width="35" height="35" />
        </VerticalNavigation>
      </header>
      <main
        id="presentation"
        className="container max-w-fit mx-auto grid grid-cols-[60%_40%] items-center gap-[0, 9rem] m-auto pt-[7rem]"
      >
        <div className="flex flex-col gap-y-10">
          {githubData && (
            <h1 className="text-7xl">
              Olá, eu sou{" "}
              <span className="special-color tracking-widest">
                {githubData.name}
              </span>
            </h1>
          )}

          {githubData?.name && (
            <h2 className="text-5xl text-animation">
              Sou{" "}
              <span className="special-color tracking-widest ">
                {professionalTitle}
              </span>
            </h2>
          )}

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
            src={githubData?.picture || ""}
            width={450} // Defina um tamanho fixo proporcional
            height={450}
            className="object-cover w-full h-full"
          />
        </div>
        <section id="projects" className="col-span-2">
          <h2 className="text-[4rem]">Projects</h2>
          <Card
            imgSrc={game.src}
            title={"Games"}
            aboutCard={"Projetos de jogos"}
            icon="mingcute:game-2-fill"
          />
        </section>
      </main>
    </>
  );
}
