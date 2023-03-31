import { parse } from "node-html-parser";
import { api } from "../../config/axios";
import { CrawlerProduct } from "../../types/Crawler";
import { PontoFrioPriceResponse } from "../../types/Crawler/pontofrio";

export const parseTitle = (title: string) => {
  const parsedTitle = title.replaceAll("-", " ");

  return parsedTitle;
};

export const getDescription = (content: string) => {
  const root = parse(content);
  const containers = root.getElementsByTagName("div");
  const description = containers.find(
    (container) => container.id === "product-description"
  );

  if (!description || !description.text) {
    throw new Error("[Crawler Error] - Description not found");
  }

  return description.text;
};

export const getImage = (content: string) => {
  const root = parse(content);
  const containers = root.getElementsByTagName("img");

  const images = containers.filter((container) => {
    const imageSrc = container.getAttribute("src");

    if (
      imageSrc !== undefined &&
      imageSrc?.startsWith("https://imgs.ponto.com.br")
    ) {
      return imageSrc;
    }
  });

  if (!images.length || !images[0].getAttribute("src")) {
    throw new Error("[Crawler Error] - Image not found");
  }

  return images[0].getAttribute("src");
};

export const getPrice = async (productId: string) => {
  try {
    const response = await api.get<PontoFrioPriceResponse>(
      `https://pdp-api.pontofrio.com.br/api/v2/sku/${productId}/price/source/PF`
    );
    const body = response.data.sellPrice;

    return body.priceValue;
  } catch (err) {
    throw new Error("[Crawler Error] - Price not found");
  }
};

export const getContent = async (url: string) => {
  const loadedUrl = new URL(url);
  const paths = loadedUrl.pathname.split("/");
  const response = await api.get(url);

  const title = parseTitle(paths[1]);
  const description = getDescription(response.data);
  const image = getImage(response.data);
  const price = await getPrice(paths[3]);

  const product: CrawlerProduct = {
    url,
    title,
    image,
    description,
    price,
  };

  return product;
};
