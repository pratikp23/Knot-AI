import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use("/auth", proxy(process.env.AUTH_SERVICE_URL))

app.get("/", (req, res) => {
  res.send("Gateway is running pratik");
});

app.listen(port, () => {
  console.log(`Gateway is Started and running on port ${port}`);
});