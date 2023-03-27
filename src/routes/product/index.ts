import { Router } from "express";
import { getProduct } from "../../services/product";
import { ProductRequest, ProductValidator } from "../../types/Product";
import { errorHandler, RequestValidator } from "../../utils/request";

const router = Router();

router.post("/", async (req: RequestValidator<ProductRequest>, res) => {
  try {
    const productValidated = await ProductValidator.parseAsync(req.body);
    const product = await getProduct(productValidated);

    return res.send(product);
  } catch (error) {
    return res.status(400).send({ error: errorHandler(error) });
  }
});

export default router;
