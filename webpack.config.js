const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: "development",

  entry: "./src/index.ts",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [{
      test: /^.*\.ts$/,
      use: "ts-loader"
    }]
  },
  resolve: {
    extensions: [
      '.ts', '.css'
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Development'
    // }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  }
};
