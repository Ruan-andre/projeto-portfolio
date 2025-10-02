import { NextRequest, NextResponse } from "next/server";
import { getDataRepo } from "@/functions/server";
import {
  urlReposGames,
  urlReposGamesFeatured,
  urlReposPersonal,
  urlReposPersonalFeatured,
  urlReposUtilities,
  urlReposUtilitiesFeatured,
  urlReposAcademics,
  urlReposAcademicsFeatured,
} from "@/constants/urlsApiGithub";

const urlMappings = {
  games: urlReposGames,
  "games-featured": urlReposGamesFeatured,
  personal: urlReposPersonal,
  "personal-featured": urlReposPersonalFeatured,
  utilities: urlReposUtilities,
  "utilities-featured": urlReposUtilitiesFeatured,
  academics: urlReposAcademics,
  "academics-featured": urlReposAcademicsFeatured,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as keyof typeof urlMappings;

    if (!type || !urlMappings[type]) {
      return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
    }

    const data = await getDataRepo(urlMappings[type]);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
