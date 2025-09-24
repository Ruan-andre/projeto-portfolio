import { urlRepoContent, pathPortfolioContent } from "@/constants/urlsApiGithub";
import GithubProjectsData from "@/interfaces/GithubProjectsData";
import { skillsData } from "@/constants/skillsData";

const GetDate = (initialDate: Date, type: "Y" | "M" | "D" | "FULL", birthDay?: boolean): string => {
  const hoje = new Date();
  let response = "";

  switch (type) {
    case "Y":
      let idade = hoje.getFullYear() - initialDate.getFullYear();

      // Verificar se o aniversário já passou no ano atual
      const mesNascimento = initialDate.getMonth();
      const diaNascimento = initialDate.getDate();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();

      if (birthDay) {
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
          idade--;
        }
      }

      response = idade.toString();
      break;

    case "M":
      let diffMeses =
        (hoje.getFullYear() - initialDate.getFullYear()) * 12 + (hoje.getMonth() - initialDate.getMonth());

      if (hoje.getDate() < initialDate.getDate()) {
        diffMeses--;
      }

      response = diffMeses.toString();
      break;

    case "D":
      const diffMs = hoje.getTime() - initialDate.getTime();
      const diffDias = Math.floor(diffMs / (1000 * 3600 * 24)); // Convertendo de milissegundos para dias
      response = diffDias.toString();
      break;

    case "FULL":
      response = hoje.toISOString().split("T")[0];
      break;

    default:
      response = "Invalid type";
      break;
  }

  return response;
};

const serverFetch = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const getJsonContentRepo = async (repoName: string) => {
  const url = `${urlRepoContent}${repoName}/contents${pathPortfolioContent}`;
  const response = await serverFetch(url);
  if (!response || response.status?.includes("404")) {
    return null;
  }
  const decodedContent = Buffer.from(response.content, "base64").toString("utf-8");
  const jsonObject = JSON.parse(decodedContent);
  return jsonObject;
};

const getDataRepo = async (url: string) => {
  const dataRepo = await serverFetch(url);

  if (dataRepo) {
    const { items } = dataRepo;

    const data: Array<GithubProjectsData> = items.map((item: GithubProjectsData) => ({
      html_url: item.html_url,
      name: item.name,
      description: item.description,
      created_at: item.created_at,
    }));
    return data;
  }

  return [];
};

const getTechnologies = (techs: string[]) => {
  return techs
    .map((techName) => {
      const tech = Object.values(skillsData)
        .flat()
        .find((item) => item.title === techName);

      if (tech) {
        return {
          name: techName,
          iconName: tech.icon,
        };
      }

      return null;
    })
    .filter(Boolean);
};

export { GetDate, getJsonContentRepo, getDataRepo, getTechnologies };
