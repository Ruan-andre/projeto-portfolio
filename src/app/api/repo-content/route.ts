import { NextRequest, NextResponse } from "next/server";
import { getJsonContentRepo, getTechnologies } from "@/functions/server";
import Technologies from "@/types/Technologies";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const repoName = searchParams.get("repo");

    if (!repoName) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
    }

    const jsonContent = await getJsonContentRepo(repoName);

    if (!jsonContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Se tem tecnologias, processá-las
    let technologies: Technologies[] = [];
    if (jsonContent.technologies) {
      technologies = getTechnologies(jsonContent.technologies) as Technologies[];
    }

    const response = {
      ...jsonContent,
      processedTechnologies: technologies,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching repository content:", error);
    return NextResponse.json({ error: "Failed to fetch repository content" }, { status: 500 });
  }
}
