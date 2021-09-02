const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,

  entry: {
    index: "./src/app.ts",
  },

  output: {
    path: path.resolve(__dirname, "dist"), // for CleanWebpackPlugin to work
    assetModuleFilename: "images/[hash][ext][query]", // group images into dist/images
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset", // detect base on size limit (8kb)
      },

      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"], // Import without extension
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: ["src/**/*"],
    hot: true,
  },
};
