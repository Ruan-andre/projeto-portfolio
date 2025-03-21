const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const headerFetch = () => {
  const obj = { Authorization: `Bearer ${GITHUB_TOKEN}` };
  return obj;
};

export default headerFetch;
