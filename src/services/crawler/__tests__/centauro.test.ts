import { expect, describe, it, vi } from "vitest";
import { getContent } from "../centauro";
import centauroResponse from "./mocks/centauro-response";
import axiosMock from "../../../config/mocks/axios";

vi.mock("../../../config/axios");

describe("Crawler Service: Centauro", () => {
  it("Should scrap centauro produt", async () => {
    axiosMock.get.mockResolvedValue({ data: { ...centauroResponse } });
    const url =
      "https://www.centauro.com.br/chuteira-society-umbro-acid-ii-adulto-947415.html";

    const response = await getContent(url);

    const price = centauroResponse.precos[0].valor;
    const priceProduct = parseFloat(price.replace(",", "."));

    expect(response.url).toEqual(url);
    expect(response.title).toEqual(centauroResponse.informacoes.nome);
    expect(response.image).toEqual(centauroResponse.imagens[0].urls[0].url);
    expect(response.price).toEqual(priceProduct);
  });

  it("Should return price error when sku is not in array prices", async () => {
    axiosMock.get.mockResolvedValue({ data: { ...centauroResponse } });

    const wrongSku = 1;
    const url = `https://www.centauro.com.br/chuteira-society-umbro-acid-ii-adulto-${wrongSku}.html`;

    await expect(getContent(url)).rejects.toThrow(
      new Error("[Crawler Error] - Price not found")
    );
  });

  it("Should get correct sku from url", async () => {
    axiosMock.get.mockResolvedValue({ data: { ...centauroResponse } });

    const spy = vi.spyOn(axiosMock, "get");

    const correctSku = 947415;
    const url = `https://www.centauro.com.br/chuteira-society-umbro-acid-ii-adulto-${correctSku}-mktp.html`;

    await getContent(url);

    const centauroApiUrl = spy.mock.calls[0][0];
    expect(centauroApiUrl).toContain(correctSku);
  }); 
});
