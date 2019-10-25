const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'CMap',
        inject: true,
        template: path.resolve(__dirname, 'index.html')
    }),
    new CopyPlugin([{
        from: './*.html'
    }])
  ],

  // devServer: {
  //   // contentBase: path.join(__dirname, 'build'),
  //   // compress: true,
  //   // port: 9000
  //   host: 'localhost',
  //   port: 9000,
  //   open: true,
  // },
};
