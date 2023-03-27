import { api } from "../../config/axios";
import { CrawlerProduct } from "../../types/Crawler";
import { CentauroPrice, CentauroResponse } from "../../types/Crawler/centauro";
import { sanitizeHTMLTags } from "../../utils/text";

const apiUrl = "https://apigateway.centauro.com.br/ecommerce/v4.3/produtos";

const getModelFromPathName = (pathname: string) => {
  let parsedPathName = pathname.replace("/", "");
  parsedPathName = parsedPathName.replace(".html", "");

  const models = parsedPathName.split("-");

  let model = models[models.length - 1];

  if (model === "mktp") {
    model = models[models.length - 2];
  }

  return model.toUpperCase();
};

const getPrice = (precos: CentauroPrice[], model: string) => {
  const price = precos.find((preco) => preco.codigoModelo === model);

  if (!price) {
    throw new Error("[Crawler Error] - Price not found");
  }

  return parseFloat(price.valor.replace(",", "."));
};

export const getContent = async (url: string) => {
  const loadedUrl = new URL(url);
  const pathname = loadedUrl.pathname;
  const model = getModelFromPathName(pathname);
  const response = await api.get<CentauroResponse>(
    `${apiUrl}?codigoModelo=${pathname}`
  );

  const { informacoes, imagens, precos } = response.data;

  const product: CrawlerProduct = {
    url,
    title: informacoes.nome,
    image: imagens[0].urls[0].url,
    description: sanitizeHTMLTags(informacoes.descricao),
    price: getPrice(precos, model),
  };

  return product;
};
