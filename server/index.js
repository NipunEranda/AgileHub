// server.ts
const express = require("express");
const next = require("next");
const env = require("@next/env");
const { authInit } = require("./routes/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

env.loadEnvConfig("./", process.env.NODE_ENV !== "production");
const handle = app.getRequestHandler();

const prefix = '/api';

app.prepare().then(() => {
  const server = express();

  authInit(prefix, server);

  server.get("/api/test", (req, res) => {
    res.json({ message: 'This is a custom API route' });
  });

  // Handle all other routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
