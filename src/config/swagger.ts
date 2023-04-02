import { saveProduct } from "../routes/product/product.swagger";

export const swaggerDocument = {
  openapi: "3.0.0",
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "Product",
    },
  ],
  paths: {
    "/api/product": {
      post: saveProduct,
    },
  },

  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },

      ProductRequest: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description:
              "Product url to be scraped from either Pontofrio or Centauro",
          },
        },
      },

      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Product id",
          },
          name: {
            type: "string",
            description: "Product name",
          },
          description: {
            type: "string",
            description: "Product description",
          },
          hash: {
            type: "string",
            description: "Product hash",
          },
          image: {
            type: "string",
            description: "Product image",
          },
          productPrice: {
            type: "array",
            description: "Product price",
            items: {
              type: "object",
              properties: {
                price: {
                  type: "number",
                  description: "Product price",
                },
                createdAt: {
                  type: "string",
                  description: "Product price creation date",
                },
              },
            },
          },
        },
      },
    },
  },
};
