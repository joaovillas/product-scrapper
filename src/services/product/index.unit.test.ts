import { expect, describe, it, beforeEach, vi } from "vitest";
import { getProduct } from ".";

import prismaMock from "../../config/mocks/prisma";
import { CrawlerProduct } from "../../types/Crawler";

const product = {
  id: "1",
  url: "https://www.centauro.com.br/chuteira-society-umbro-acid-ii-adulto-947415.html#cor=31",
  description:
    "SmartTV LED 50 Samsung 50RU7100 4K UHD 3 HDMI 2 USB WiFi Bluetooth Controle Remoto SmartThings Preto 2020",
  hash: "1",
  image:
    "https://images-americanas.b2w.io/produtos/01/00/img/2173226/9/2173226989_1GG.jpg",
  name: "SmartTV LED 50 Samsung 50RU7100 4K UHD 3 HDMI 2 USB WiFi Bluetooth Controle Remoto SmartThings Preto 2020",
};

const crawlerResponse: CrawlerProduct = {
  price: 1000,
  description: product.description,
  image: product.image,
  title: product.name,
  url: product.url,
};

vi.mock("../../config/prisma", () => ({
  default: {
    product: {
      findFirst: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("../crawler", () => ({
  getContent: () => crawlerResponse,
}));

describe("Product Service", () => {
  it("Should throw error when url is not allowed", async () => {
    const url = "https://www.google.com";
    await expect(getProduct({ url })).rejects.toThrow(
      new Error("This domain is not allowed")
    );
  });

  it("Should return a product cached product", async () => {
    const createSpy = vi.spyOn(prismaMock.product, "create");
    const updateSpy = vi.spyOn(prismaMock.product, "update");

    const productMock = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.product.findFirst.mockResolvedValue({ ...productMock });
    const url = "https://www.centauro.com.br";

    const response = await getProduct({ url });

    expect(response).toEqual(productMock);
    expect(createSpy).toHaveBeenCalledTimes(0);
    expect(updateSpy).toHaveBeenCalledTimes(0);
  });

  it("Should update a product when it is not cached", async () => {
    const productMock = {
      ...product,
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01"),
    };

    prismaMock.product.findFirst.mockResolvedValue({ ...productMock });

    const spy = vi.spyOn(prismaMock.product, "update");

    const url = "https://www.centauro.com.br";

    await getProduct({ url });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Should create product when it does not exist", async () => {
    prismaMock.product.findFirst.mockResolvedValue(null);

    const spy = vi.spyOn(prismaMock.product, "create");

    const url = "https://www.centauro.com.br";

    await getProduct({ url });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Should create product with correct price", async () => {
    prismaMock.product.findFirst.mockResolvedValue(null);

    const url = "https://www.centauro.com.br";

    const spy = vi.spyOn(prismaMock.product, "create");

    await getProduct({ url });

    const productPrice = spy.mock.calls[0][0].data.productPrice?.create;

    expect(productPrice).toEqual({ price: 1000 });
  });
});
