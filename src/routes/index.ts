import { Router } from "express";

import { default as productRoute } from "./product";

const routes = Router();

routes.use("/product", productRoute);

export default routes;
