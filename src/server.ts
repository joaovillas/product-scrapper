import express from "express";
import routes from "./routes";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/docs", serve, setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send({
    health: true,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
