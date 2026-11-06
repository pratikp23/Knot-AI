import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL))
app.get("/api/me", protect, getCurrentUser);

app.get("/", (req, res) => {
  res.send("Gateway is running pratik");
});

app.listen(port, () => {
  console.log(`Gateway is Started and running on port ${port}`);
});