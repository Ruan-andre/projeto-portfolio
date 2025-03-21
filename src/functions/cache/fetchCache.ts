import headerFetch from "@/constants/headerFetch";

const fetchCache = async (url: string) => {
  const cacheKey = url;
  const cachedData = localStorage.getItem(cacheKey);

  let lastUpdatedDate = new Date(sessionStorage.getItem("lastUpdated") || "0");

  if (lastUpdatedDate.getTime() === 0) {
    const lastUpdatedResponse = await fetch("/api/lastUpdated");
    const { lastUpdated } = await lastUpdatedResponse.json();

    lastUpdatedDate = new Date(lastUpdated);
    sessionStorage.setItem("lastUpdated", lastUpdatedDate.toISOString());
  }

  if (cachedData) {
    const cachedDate = new Date(localStorage.getItem(`${cacheKey}_date`) || "0");

    if (cachedDate >= lastUpdatedDate) {
      return JSON.parse(cachedData);
    }
  }

  if (url.includes("/contents/")) {
    const urlContents = url.substring(0, url.indexOf("/contents/") + 10);

    const responseContents = await fetch(urlContents, {
      headers: headerFetch(),
    });

    const contents = await responseContents.json();

    if (!contents || !Array.isArray(contents)) {
      return null;
    }

    const hasPortfolioFolder = contents.some((item) => item.name.includes("portfolio-content"));

    if (!hasPortfolioFolder) {
      return null;
    }
  }

  const response = await fetch(url, {
    headers: headerFetch(),
  });

  const data = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(`${cacheKey}_date`, new Date().toISOString());

  return data;
};

export default fetchCache;
