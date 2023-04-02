import prisma from "../../config/prisma";
import { CrawlerProduct } from "../../types/Crawler";
import { ProductRequest } from "../../types/Product";
import { getDomainFromURL } from "../../utils/url";
import { getContent } from "../crawler";
import { MD5 } from "crypto-js";
import { Product } from "../../../prisma/local";

const allowedUrls = ["pontofrio.com.br", "centauro.com.br"];

const DAYS_IN_HOURS = 1000 * 3600;

export const getProduct = async (product: ProductRequest) => {
  const url = getDomainFromURL(product.url);
  verifyAllowedUrl(url);
  const existentProduct = await getProductOnDatabase(product.url);
  if (existentProduct && isProductUpdated(existentProduct)) {
    return existentProduct;
  }

  const crawlerProduct = await getContent(product.url);
  if (!existentProduct) {
    return await createProduct(crawlerProduct);
  }

  return await updateCachedProduct(existentProduct, crawlerProduct);
};

const createProduct = async (product: CrawlerProduct) => {
  const newProduct = await prisma.product.create({
    select: {
      id: true,
      url: true,
      description: true,
      hash: true,
      image: true,
      name: true,
      productPrice: true,
    },
    data: {
      url: product.url,
      description: product.description,
      hash: MD5(JSON.stringify(product)).toString(),
      image: product.image,
      name: product.title,
      productPrice: {
        create: {
          price: product.price,
        },
      },
    },
  });
  return newProduct;
};

const updateCachedProduct = async (
  product: Product,
  cralwerProduct: CrawlerProduct
) => {
  let dataProduct: object = {
    hash: MD5(JSON.stringify(cralwerProduct)).toString(),
    description: cralwerProduct.description,
    updatedAt: new Date(),
  };

  if (product.hash !== MD5(JSON.stringify(cralwerProduct)).toString()) {
    dataProduct = {
      ...dataProduct,
      productPrice: {
        create: {
          price: cralwerProduct.price,
        },
      },
    };
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
    select: {
      id: true,
      url: true,
      description: true,
      hash: true,
      image: true,
      name: true,
      productPrice: true,
    },
    data: dataProduct,
  });

  return updatedProduct;
};

const verifyAllowedUrl = (url: string) => {
  if (!allowedUrls.includes(url)) {
    throw new Error("This domain is not allowed");
  }

  return true;
};

const isProductUpdated = (product: Product) => {
  const now = new Date();
  const createdAt = new Date(product.updatedAt);
  const diff = Math.abs(now.getTime() - createdAt.getTime());
  const diffInHours = diff / DAYS_IN_HOURS;

  return diffInHours <= 1;
};

const getProductOnDatabase = async (url: string) => {
  const product = await prisma.product.findFirst({
    where: {
      url,
    },
    include: {
      productPrice: true,
    },
  });

  return product;
};
