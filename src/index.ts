import express from "express";
import http from "http";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import cors from "cors";
import config from "./common/config";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/", routes);
app.use(errorHandler);
app.use(notFound);

const server = http.createServer(app);
const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
