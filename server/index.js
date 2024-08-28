const express = require("express");
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");
const app = express();
dotEnv.config();

const { authInit } = require("./routes/auth");

const prefix = '/api';

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname)));
app.use(cors());


authInit(prefix, app);

app.get("/api/test", (req, res) => {
  res.status(200).json({ test: "test" });
});

// Handle routing, send all other requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Set the port to 3000 or any other port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
