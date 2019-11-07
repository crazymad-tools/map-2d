const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  entry: ["./src/index.ts", "./src/style/index.scss"],

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.(css)|(scss)|(sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {}
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".scss", ".sass"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "CMap",
      inject: true,
      template: path.resolve(__dirname, "index.html")
    }),
    new CopyPlugin([
      {
        from: "./*.html"
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
