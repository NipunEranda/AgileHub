const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");

const app = express();
require("dotenv").config();

const prefix = "/api";

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());

// Use the middleware for all routes
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname)));

auth.authInit(prefix, app);

app.get("/api/test", (req, res) => {
  res.status(200).json({ test: "test" });
});

// // Handle routing, send all other requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Set the port to 3000 or any other port
// const port = process.env.NODE_ENV == 'production' ? 8080 : process.env.PORT ? process.env.PORT : 8888;
const port =
  process.env.NODE_ENV == "production"
    ? process.env.PORT
      ? process.env.PORT
      : 8080
    : 8888;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
