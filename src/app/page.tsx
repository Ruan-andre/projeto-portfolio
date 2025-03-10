"use client";

import { Icon } from "../assets/icons";
import Image from "next/image";
import { GetDate, useTypingEffect } from "@/functions/";
import { useEffect, useState } from "react";
import GithubData from "@/interfaces/githubData";
import ProjectCards from "@/components/projectCard";
import game from "../../public/img/game.jpg";
import engrenagemFundo from "@/../public/img/engrenagem.png";
import pessoal from "@/../public/img/pessoal.jpg";
import LanguageCard from "@/components/languageCard";

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
      <main
        id="presentation"
        className="col-span-4 grid grid-cols-8 gap-y-[5rem]"
      >
        <div className="col-span-5 pl-[4rem] justify-center flex flex-col gap-y-10  font-semibold">
          {githubData && (
            <h1 className="text-7xl">
              Olá, eu sou{" "}
              <span className="special-color tracking-widest">
                {githubData.name}!
              </span>
            </h1>
          )}

          {githubData?.name && (
            <h2 className="text-5xl text-animation pt-[3rem] pb-[3rem]">
              Sou{" "}
              <span className="special-color tracking-widest ">
                {professionalTitle}
              </span>
            </h2>
          )}

          <p className="max-w-[75rem] text-[2rem] text-[#a1a2a3] leading-[3.5rem] font-light">
            Tenho {GetDate(new Date("1997-09-18"), "Y", true)} anos e atuo na
            área da tecnologia há{" "}
            <span className="special-color opacity-100">
              {GetDate(new Date("2020-01-01"), "Y", true)} anos.
            </span>{" "}
            Minha paixão pela programação começou há{" "}
            <span className="special-color">
              {GetDate(new Date("2020-07-01"), "Y", true)} anos,
            </span>{" "}
            quando iniciei a faculdade de Análise e Desenvolvimento de Sistemas.
            Hoje, trabalho profissionalmente como Desenvolvedor Full Stack, mas
            admito que o backend é minha verdadeira paixão.😂❤️
            <br />
          </p>
        </div>

        <div className="col-span-3 w-[45rem]  aspect-square overflow-hidden rounded-full hover:custom-shadow">
          <Image
            alt="Foto de André Ruan"
            src={githubData?.picture || ""}
            width={400}
            height={400}
            className="object-cover w-full h-full "
          />
        </div>

        <section id="projects" className="col-span-8">
          <h3 className="text-[4rem] pl-[4rem] pb-[4rem] font-semibold text-center">
            Projetos
          </h3>
          <div className="flex gap-[2rem] ">
            <ProjectCards
              imgSrc={engrenagemFundo.src}
              title={"Utilitários"}
              aboutCard={"Projetos de softwares utilitários em geral"}
              icon="arcticons:amaze-utilities"
              iconSize={50}
              href="/"
            />
            <ProjectCards
              imgSrc={game.src}
              title={"Games"}
              aboutCard={"Projetos de jogos"}
              icon="mingcute:game-2-fill"
              iconSize={50}
              href="/"
            />
            <ProjectCards
              imgSrc={pessoal.src}
              title={"Pessoais"}
              aboutCard={"Projetos pessoais"}
              icon="ion:person"
              iconSize={50}
              href="/"
            />
          </div>
        </section>
      </main>
      <section id="skills" className="pt-[5rem] col-span-4">
        <h3 className="text-[4rem] pl-[4rem] pb-[4rem] font-semibold text-center">
          Habilidades
        </h3>
        <div className="flex gap-[2rem]  border-0 rounded-2xl w-full text-center pt-[2rem] pb-[2rem] bg-shadow-brown-red">
          <div
            id="backend"
            className="w-[50%] p-[1.5rem] border-r border-white/20 h-full"
          >
            <h3 className="text-[4rem]">Backend</h3>
            <div className="skills">
              <LanguageCard title="C#">
                <Icon icon="devicon:csharp" width="70" height="70" />
              </LanguageCard>
              <LanguageCard title="Python">
                <Icon
                  icon="material-icon-theme:python"
                  width="70"
                  height="70"
                />
              </LanguageCard>

              <LanguageCard title="Node.js">
                <Icon icon="logos:nodejs" width="114.15" height="70" />
              </LanguageCard>
              <LanguageCard title="MySQL">
                <Icon icon="logos:mysql" width="102.7" height="70" />
              </LanguageCard>

              <LanguageCard title="SQL Server">
                <Icon
                  icon="devicon-plain:microsoftsqlserver-wordmark"
                  width="70"
                  height="70"
                />
              </LanguageCard>
              <LanguageCard title="PostgreSQl">
                <Icon icon="devicon:postgresql" width="70" height="70" />
              </LanguageCard>
            </div>
          </div>
          <div id="frontend" className="w-[50%]  p-[1.5rem]">
            <h3 className="text-[4rem]">Frontend</h3>
            <div className="skills">
              <LanguageCard title="HTML 5">
                <Icon
                  icon="vscode-icons:file-type-html"
                  width="70"
                  height="70"
                />
              </LanguageCard>
              <LanguageCard title="CSS">
                <Icon
                  icon="vscode-icons:file-type-css"
                  width="70"
                  height="70"
                />
              </LanguageCard>
              <LanguageCard title="JavaScript">
                <Icon icon="logos:javascript" width="70" height="70" />
              </LanguageCard>
              <LanguageCard title="Tailwind CSS">
                <Icon icon="logos:tailwindcss-icon" width="70" height="70" />
              </LanguageCard>
              <LanguageCard title="Next.js">
                <Icon icon="logos:nextjs-icon" width="70" height="70" />
              </LanguageCard>
              <LanguageCard title="React">
                <Icon icon="devicon:react" width="70" height="70" />
              </LanguageCard>
              <LanguageCard title="Typescript">
                <Icon icon="logos:typescript-icon" width="70" height="70" />
              </LanguageCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
