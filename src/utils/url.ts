export const getDomainFromURL = (url: string) => {
  const host = new URL(url).hostname;
  return host.replace("www.", "");
};
