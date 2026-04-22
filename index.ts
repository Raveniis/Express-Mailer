import express from "express";
import config from "./config/config.js";
import cors from "cors";
import baseRoutes from "./routes/base.routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error-handler.middleware.js";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ["POST"],
  }),
);

app.use(errorHandler);
app.use("/api", baseRoutes);

app.listen(config.PORT, () => {
  console.log("Server running on http://localhost:3000");
});
