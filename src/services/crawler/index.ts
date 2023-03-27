import { getContent as getPontoFrioContent } from "./pontofrio";
import { getContent as getCentauroContent } from "./centauro";
import { getDomainFromURL } from "../../utils/url";

export const getContent = async (url: string) => {
  const domain = getDomainFromURL(url);

  if (domain === "centauro.com.br") {
    return getCentauroContent(url);
  }

  return getPontoFrioContent(url);
};
