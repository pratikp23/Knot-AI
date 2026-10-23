import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 8001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Auth service, Pratik");
});

app.listen(port, () => {
  console.log(`Auth service is Started and running on port ${port}`);
  connectDB();
});