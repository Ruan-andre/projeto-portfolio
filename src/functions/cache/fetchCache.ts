import headerFetch from "@/constants/headerFetch";

const fetchCache = async (url: string) => {
  const cacheKey = url + new Date().getUTCDay();
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
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

    const hasPortfolioFolder = contents.filter((item) =>
      item.name.includes("portfolio-content")
    );

    if (hasPortfolioFolder.length === 0) {
      return null;
    }
  }

  const response = await fetch(url, {
    headers: headerFetch(),
  });

  // if (!response.ok) {
  //   if (response.url.includes("/contents/")) return;
  //   console.warn(`Erro ao buscar endpoint ${response.url}`);
  //   return;
  // }

  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
};

export default fetchCache;
