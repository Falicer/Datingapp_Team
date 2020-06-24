const merge = require("webpack-merge")
const common = require("./webpack.common")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = merge(common, {})

module.exports = {
  mode: "production",
  entry: ["./src/js/index.js", "./src/scss/css.js"],
  output: {
    filename: "[contenthash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
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
        use: [
          {
            loader: "file-loader",
            options: {
              name: "css/[name].css",
            },
          },
          "extract-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
}
