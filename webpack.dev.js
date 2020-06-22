const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "main.[contentHash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.WatchIgnorePlugin([/^((?!src).)*$/]),
    new CleanWebpackPlugin(),
    new CleanWebpackPlugin({
      dry: true,
      cleanAfterEveryBuildPatterns: ["./views/partials/script.ejs", "dist"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/partials/script.ejs",
      filename: path.resolve(__dirname, "./views/partials/script.ejs"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
}
