const fetchCacheServer = async (url: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    };

    if (url.includes("/contents/")) {
      const urlContents = url.substring(0, url.indexOf("/contents/") + 10);

      const responseContents = await fetch(urlContents, {
        headers,
      });

      const contents = await responseContents.json();

      let hasPortfolioFolder;
      if (contents && Array.isArray(contents)) {
        hasPortfolioFolder = contents.some((item) => item.name.includes("portfolio-content"));
      }

      if (!hasPortfolioFolder) {
        return null;
      }
    }

    const response = await fetch(url, {
      headers,
    });

    let data = await response.json();

    if (Array.isArray(data.items) && data.items.length === 0) {
      data = null;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchCacheServer:", error);
    throw error;
  }
};

export default fetchCacheServer;
