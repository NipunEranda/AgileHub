import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";

import authInit from "./routes/auth";
import projectInit from "./routes/project";

const app = express();
dotEnv.config();

const prefix = "/api";
const port =
  process.env.NODE_ENV == "production"
    ? process.env.PORT
      ? process.env.PORT
      : 8080
    : 8888;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());

// Use the middleware for all routes
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname)));

authInit(prefix, app);
projectInit(prefix, app);

app.get("/api/test", (req, res) => {
  res.status(200).json({ test: "test" });
});

// // Handle routing, send all other requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
