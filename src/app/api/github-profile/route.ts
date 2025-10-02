import { NextResponse } from "next/server";
import { urlUserRepo } from "@/constants/urlsApiGithub";
import fetchCacheServer from "@/functions/server/fetchCacheServer";
import GithubData from "@/interfaces/GithubProfileData";

export async function GET() {
  try {
    const response = await fetchCacheServer(urlUserRepo);

    const data: GithubData = {
      name: response.name,
      picture: response.avatar_url,
      bio: response.bio,
      profileUrl: response.html_url,
      email: response.email,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200", // Cache por 10 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
