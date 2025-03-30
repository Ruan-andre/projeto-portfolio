import headerFetch from "@/constants/headerFetch";

const fetchCache = async (url: string) => {
  const cacheKey = url;
  const cachedData = localStorage.getItem(cacheKey);
  let data;

  if (cachedData) {
    const cachedDate = new Date(localStorage.getItem(`${cacheKey}_date`) || "0");
    const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
    if (cachedDate.getTime() >= twelveHoursAgo) {
      return JSON.parse(cachedData);
    }
  }

  try {
    if (url.includes("/contents/")) {
      const urlContents = url.substring(0, url.indexOf("/contents/") + 10);

      const responseContents = await fetch(urlContents, {
        headers: headerFetch(),
      });

      const contents = await responseContents.json();

      let hasPortfolioFolder;
      if (contents && Array.isArray(contents)) {
        hasPortfolioFolder = contents.some((item) => item.name.includes("portfolio-content"));
      }

      if (!hasPortfolioFolder) {
        data = null;
        return;
      }
    }

    const response = await fetch(url, {
      headers: headerFetch(),
    });

    data = await response.json();
    if (Array.isArray(data.items) && data.items.length === 0) {
      data = null;
    }
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_date`, new Date().toISOString());
  }
};

export default fetchCache;
