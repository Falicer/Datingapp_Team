const merge = require("webpack-merge")
const common = require("./webpack.common")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = merge(common, {})

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "main.[contentHash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /^((?!src).)*$/,
      path.join(__dirname, "node_modules"),
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
}
