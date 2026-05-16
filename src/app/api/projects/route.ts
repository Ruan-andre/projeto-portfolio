import { NextRequest, NextResponse } from "next/server";
import { getDataRepo } from "@/functions/server";
import { urlAllRepos, urlReposFeatured } from "@/constants/urlsApiGithub";

const urlMappings = {
  featured: urlReposFeatured,
  all: urlAllRepos,
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
