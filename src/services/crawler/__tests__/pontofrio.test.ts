import { expect, describe, it, vi, beforeEach } from "vitest";
import { getContent } from "../pontofrio";
import axiosMock from "../../../config/mocks/axios";
import pontoFrioPriceResponse from "./mocks/pontofrio-price-response";
import pontoFrioPage, {
  pontoFrioWithoutDescription,
  pontoFrioWithoutImage,
} from "./mocks/ponto-frio-page";

vi.mock("../../../config/axios");

const PRODUCT =
  "notebook-lenovo-core-i5-1135g7-8gb-256gb-ssd-tela-15-6-windows-11-ideapad-3i-82md0007br";
const SKU = 55052376;

const getResponseBody = (url: string) => {
  if (url.includes("www.pontofrio.com.br")) {
    return Promise.resolve({ data: pontoFrioPage });
  }

  return Promise.resolve({ data: pontoFrioPriceResponse });
};

describe("Crawler Service: Pontofrio", () => {
  it("Should scrap centauro produt", async () => {
    axiosMock.get
      .mockImplementationOnce((url) => getResponseBody(url))
      .mockImplementationOnce((url) => getResponseBody(url));

    const url = `https://www.pontofrio.com.br/${PRODUCT}/p/${SKU}`;

    const response = await getContent(url);

    expect(response.url).toEqual(url);
    expect(response.title).toEqual(PRODUCT.replaceAll("-", " "));
  });

  it("Should release get request correctly for pdp api", async () => {
    axiosMock.get
      .mockImplementationOnce((url) => getResponseBody(url))
      .mockImplementationOnce((url) => getResponseBody(url));

    const spy = vi.spyOn(axiosMock, "get");
    const url = `https://www.pontofrio.com.br/${PRODUCT}/p/${SKU}`;

    await getContent(url);

    const pontofrioApiUrl = spy.mock.calls[1][0];

    expect(pontofrioApiUrl).toContain(SKU);
  });

  it("Should throw error when api does not have price", async () => {
    axiosMock.get.mockImplementationOnce((url) => getResponseBody(url));

    const url = `https://www.pontofrio.com.br/${PRODUCT}/p/${SKU}`;

    await expect(getContent(url)).rejects.toThrow(
      new Error("[Crawler Error] - Price not found")
    );
  });

  it("Should throw error when api does not have price", async () => {
    axiosMock.get.mockResolvedValueOnce({ data: pontoFrioWithoutDescription });
    const url = `https://www.pontofrio.com.br/${PRODUCT}/p/${SKU}`;

    await expect(getContent(url)).rejects.toThrow(
      new Error("[Crawler Error] - Description not found")
    );
  });

  it("Should throw error when api does not have image", async () => {
    axiosMock.get.mockResolvedValueOnce({ data: pontoFrioWithoutImage });
    const url = `https://www.pontofrio.com.br/${PRODUCT}/p/${SKU}`;

    await expect(getContent(url)).rejects.toThrow(
      new Error("[Crawler Error] - Image not found")
    );
  });
});
