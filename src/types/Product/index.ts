import { z } from "zod";

export const ProductValidator = z.object({
  url: z
    .string({
      required_error: "URL is required",
    })
    .url("Must be a valid URL"),
});

export type ProductRequest = z.infer<typeof ProductValidator>;
