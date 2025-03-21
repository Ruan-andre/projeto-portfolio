import Technologies from "@/types/Technologies";

interface GithubProjectsData {
  html_url: string;
  name: string;
  description: string;
  created_at: string;
  languages?: Technologies[];
  linkedin?: string;
  liveProject?: string;
  urlVideo?: string;
}

export default GithubProjectsData;
