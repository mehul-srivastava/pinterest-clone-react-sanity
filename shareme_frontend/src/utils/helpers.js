export const extractDomainFromUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0]
    .split(".")
    .slice(-2)
    .join(".");
};
