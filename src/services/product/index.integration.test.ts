import { expect, describe, it, beforeEach, vi, afterAll } from "vitest";
import { getProduct } from "./";

import { CrawlerProduct } from "../../types/Crawler";
import { MD5 } from "crypto-js";
import prisma from "../../config/prisma";
import * as crawler from "../crawler";

const product = {
  id: "1f38b6f81-c7b2-4090-ae8d-4dbbaa300d36",
  url: "https://www.centauro.com.br",
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

vi.mock("../crawler", () => ({
  getContent: () => {
    return crawlerResponse;
  },
}));

describe("Product Service", () => {
  beforeEach(async () => {
    await prisma.productPrice.deleteMany({});
    await prisma.product.deleteMany({});
  });

  it("Should throw error when url is not allowed", async () => {
    const url = "https://www.google.com";
    await expect(getProduct({ url })).rejects.toThrow(
      new Error("This domain is not allowed")
    );
  });

  it("Should insert product on database", async () => {
    const url = "https://www.centauro.com.br";

    const response = await getProduct({ url });

    expect(response.hash).toEqual(
      MD5(JSON.stringify(crawlerResponse)).toString()
    );
  });

  it("should return a product cached product", async () => {
    const url = "https://www.centauro.com.br";

    const crawlerSpy = vi.spyOn(crawler, "getContent");

    const response1 = await getProduct({ url });
    const response2 = await getProduct({ url });

    expect(response1.hash).toEqual(response2.hash);
    expect(response1.name).toEqual(response2.name);
    expect(response1.productPrice).toEqual(response2.productPrice);
    expect(response1.url).toEqual(response2.url);
    expect(crawlerSpy).toHaveBeenCalledTimes(1);
  });

  it("Should update a product when the time is greater than 1 hour", async () => {
    const url = "https://www.centauro.com.br";

    const previousCreatedAt = new Date("2021-01-01");

    const createdProduct = await prisma.product.create({
      data: {
        url,
        hash: MD5(JSON.stringify(crawlerResponse + "2")).toString(),
        name: crawlerResponse.title,
        description: crawlerResponse.description,
        image: crawlerResponse.image,
        createdAt: previousCreatedAt,
        updatedAt: previousCreatedAt,
        productPrice: {
          create: {
            price: crawlerResponse.price,
            createdAt: previousCreatedAt,
            updatedAt: previousCreatedAt,
          },
        },
      },
      include: {
        productPrice: true,
      },
    });

    const updateCachedProduct = await getProduct({ url });

    expect(updateCachedProduct.hash).toEqual(
      MD5(JSON.stringify(crawlerResponse)).toString()
    );
    expect(createdProduct.id).toEqual(updateCachedProduct.id);
    expect(createdProduct.productPrice.length).toBeLessThan(
      updateCachedProduct.productPrice.length
    );
  });
});
