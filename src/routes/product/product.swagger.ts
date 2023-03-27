export const saveProduct = {
  tags: ["Product"],
  description: "Return scrapped product for given URL",
  operationId: "saveProduct",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ProductRequest",
        },
      },
    },
  },

  responses: {
    "400": {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error",
          },
        },
      },
    },
    "200": {
      description: "Products were obtained",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
            example: {
              id: "4f28aa5c-7fe9-4d37-8b76-cdf2f09f4415",
              name: "Camisa do Flamengo I 23 adidas - Masculina",
              description: "Camisa do Flamengo I 23 adidas - Masculina",
              image:
                "https://imgcentauro-a.akamaihd.net/48x48/9799852V/camisa-do-flamengo-i-23-adidas-masculina-img.jpg",
              url: "https://www.centauro.com.br/camisa-do-flamengo-i-23-adidas-masculina-979985.html#cor=2V&u_referrer=https%3A%2F%2Fwww.google.com%2F&u_gclid=CjwKCAjw_YShBhAiEiwAMomsEFo6Z3iT6EsXEJ-eUqbp_5XBbTnfe7dA_P7JFCRAloItj2SXZSN8iRoCkzkQAvD_BwE",
              hash: "629fd5f92bf23bc213b60b87bfdc1871",
              createdAt: "2023-03-27T15:13:29.337Z",
              updatedAt: "2023-03-27T17:25:27.139Z",
              productPrice: [
                {
                  price: 349.99,
                  createdAt: "2023-03-27T15:13:29.337Z",
                },
                {
                  price: 349.99,
                  createdAt: "2023-03-27T17:25:27.140Z",
                },
              ],
            },
          },
        },
      },
    },
  },
};
