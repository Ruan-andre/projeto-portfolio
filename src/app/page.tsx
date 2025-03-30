"use client";

//GENERAL
import { Icon } from "../../public/assets/icons";
import Image from "next/image";
import GithubData from "@/interfaces/GithubProfileData";
import { urlUserRepo } from "@/constants/urlsApiGithub";
import { skillsData } from "@/constants/skillsData";
import Link from "next/link";
import { useSkeleton } from "@/context/SkeletonContext";

//COMPONENTS
import SkillCard from "@/components/SkillCard";
import ProjectTypeCard from "@/components/ProjectTypeCard";
import VerticalNavigation from "@/components/VerticalNavigation";
import SkillTooltip from "@/components/SkillTooltip";
import SkeletonHome from "@/components/skeletons/home";
import GenericCarousel from "@/components/GenericCarousel";

//HOOKS
import useTypingEffect from "@/hooks/useTypingEffect";
import { useEffect, useState } from "react";

//FUNCTIONS
import fetchCache from "@/functions/cache/fetchCache";
import { GetDate } from "@/functions/";

// IMAGES
import imgGear from "../../public/assets/img/engrenagem.png";
import imgPersonal from "@/../public/assets/img/pessoal.jpg";
import imgGame from "../../public/assets/img/game.jpg";
import imgBook from "../../public/assets/img/livro2.png";
import profilePicture from "../../public/assets/img/profile-picture.jpg";

export default function Home() {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const { isLoading, setIsLoading } = useSkeleton();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchCache(urlUserRepo);

        const data: GithubData = {
          name: response.name,
          picture: response.avatar_url,
          bio: response.bio,
          profileUrl: response.html_url,
          email: response.email,
        };

        setGithubData(data);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const professionalTitle = useTypingEffect(githubData?.bio || "", 100);

  if (isLoading) {
    return <SkeletonHome />;
  }

  return (
    <>
      <VerticalNavigation>
        <Icon icon="ic:round-home" width="35" height="35" data-title="Inicio" href="#presentation" />
        <Icon href="#projects" icon="fluent:tabs-16-filled" width="35" height="35" data-title="Projetos" />
        <Icon icon="fa6-solid:code" href="#skills" width="35" height="35" data-title="Habilidades" />
        <Icon href="#contacts" icon="uiw:mail" width="35" height="35" data-title="Contato" />
      </VerticalNavigation>
      <div className="home">
        <main id="presentation" className="hero">
          <div className="text-about">
            {githubData?.name && (
              <h1>
                Olá, eu sou <span className="special-color tracking-widest">{githubData.name}!</span>
              </h1>
            )}

            {githubData?.name && (
              <h2 className="text-animation pt-[3rem] pb-[3rem]">
                Sou <span className="special-color tracking-widest ">{professionalTitle}</span>
              </h2>
            )}

            <p className="text-[2rem] text-[#a1a2a3] leading-[3.5rem] font-light">
              Tenho {GetDate(new Date("1997-09-18"), "Y", true)} anos e atuo na área da tecnologia há{" "}
              <span className="special-color opacity-100">
                {GetDate(new Date("2020-01-01"), "Y", true)} anos.
              </span>{" "}
              Minha paixão pela programação começou há{" "}
              <span className="special-color">{GetDate(new Date("2020-07-01"), "Y", true)} anos,</span> quando
              iniciei a faculdade de Análise e Desenvolvimento de Sistemas. Hoje, trabalho profissionalmente
              como Desenvolvedor Full Stack, mas admito que o backend é minha verdadeira paixão.😂❤️
              <br />
            </p>
          </div>

          <div className="profile-picture hover:custom-shadow">
            <Link href={"https://www.linkedin.com/in/andr%C3%A9-ruan-554854250/"} target="_blank">
              <Image
                alt="Foto de André Ruan"
                src={profilePicture.src}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </Link>
          </div>

          <section id="projects" className="project-type-card-container col-span-8 ">
            <h3 className="home-title">Projetos</h3>
            <div className="flex ">
              <GenericCarousel>
                <ProjectTypeCard
                  imgSrc={imgGear.src}
                  title={"Ferramentas & Utilitários"}
                  aboutCard={"Projetos de softwares utilitários em geral"}
                  icon="mdi:gear"
                  iconSize={50}
                  href="/projects/utilities"
                />
                <ProjectTypeCard
                  imgSrc={imgGame.src}
                  title={"Games"}
                  aboutCard={"Projetos de jogos"}
                  icon="mingcute:game-2-fill"
                  iconSize={50}
                  href="/projects/games"
                />
                <ProjectTypeCard
                  imgSrc={imgPersonal.src}
                  title={"Pessoais"}
                  aboutCard={"Projetos de uso pessoal"}
                  icon="ion:person"
                  iconSize={50}
                  href="/projects/personal"
                />
                <ProjectTypeCard
                  imgSrc={imgBook.src}
                  title={"Acadêmicos & Estudos"}
                  aboutCard={"Projetos de cursos/estudos"}
                  icon="ion:book"
                  iconSize={50}
                  href="/projects/academics"
                />
              </GenericCarousel>
            </div>
            {/* <div className="flex gap-[2rem] max-sm:w-full max-sm:items-center">
              <ProjectTypeCard
                imgSrc={engrenagemFundo.src}
                title={"Utilitários"}
                aboutCard={"Projetos de softwares utilitários em geral"}
                icon="mdi:gear"
                iconSize={50}
                href="/projects/utilities"
              />
              <ProjectTypeCard
                imgSrc={game.src}
                title={"Games"}
                aboutCard={"Projetos de jogos"}
                icon="mingcute:game-2-fill"
                iconSize={50}
                href="/projects/games"
              />
              <ProjectTypeCard
                imgSrc={pessoal.src}
                title={"Pessoais"}
                aboutCard={"Projetos de uso pessoal"}
                icon="ion:person"
                iconSize={50}
                href="/projects/personal"
              />
            </div> */}
          </section>
        </main>

        <section id="skills" className="skills-container">
          <h3 className="home-title">Habilidades</h3>
          <div className="flex gap-[2rem] border-0 rounded-2xl w-full text-center pt-[2rem] pb-[2rem] bg-shadow-brown-red">
            <div id="backend" className="w-[50%] p-[1.5rem] border-r border-white/20 h-full">
              <h3 className="text-[4rem] skill-role">Backend</h3>
              <div className="skills">
                {skillsData.backend.map((skill) => (
                  <SkillTooltip key={skill.title} text={skill.text} url={skill.url}>
                    <SkillCard title={skill.title}>
                      <Icon icon={skill.icon} width="70" height="70" />
                    </SkillCard>
                  </SkillTooltip>
                ))}
              </div>
            </div>

            <div id="frontend" className="w-[50%] p-[1.5rem]">
              <h3 className="text-[4rem] skill-role">Frontend</h3>
              <div className="skills">
                {skillsData.frontend.map((skill) => (
                  <SkillTooltip key={skill.title} text={skill.text} url={skill.url}>
                    <SkillCard title={skill.title}>
                      <Icon icon={skill.icon} width="70" height="70" />
                    </SkillCard>
                  </SkillTooltip>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
