const path = require("path");
// const webpack = require("webpack")

module.exports = {
  entry: "./app/assets/typescript/main.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".mjs"],
    // fallback: { util: require.resolve("util/"), events: require.resolve("events") }
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "app/assets/javascripts"),
  },
};
