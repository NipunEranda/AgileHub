// const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  // set to false because __dirname resolving to / instead of absolute path when
  // built using webpack
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // set to development to read .env.local variables
  mode: "development",
};

const serverConfig = Object.assign({}, config, {
  // set target to node to fix build warnings
  target: "node",
  name: "server",
  entry: __dirname + "/server/index.js",
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "index.js",
  },
  // webpack-node-externals package used to exclude other packages like express
  // in the final bundle.js
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});

module.exports = [serverConfig];
