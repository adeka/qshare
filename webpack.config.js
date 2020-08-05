const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const dotenv = require("dotenv");

const env = dotenv.config({
  path: "./.env"
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  return {
    ...prev,
    [next]: JSON.stringify(env[next])
  };
}, {});

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "src/styles/"),
      Assets: path.resolve(__dirname, "src/assets/"),
      JS: path.resolve(__dirname, "src/js/"),
      Client: path.resolve(__dirname, "src/js/client/"),
      Components: path.resolve(__dirname, "src/js/components/"),
      Icons: path.resolve(__dirname, "src/icons/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpg|jpeg|ico|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.DefinePlugin({
      "process.env": {
        ...envKeys
      }
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "public/assets"),
    stats: "errors-only",
    open: true,
    port: 8080,
    compress: true,
    historyApiFallback: true
    // proxy: {
    //   "/cognito_admin": {
    //     target: {
    //       host: "localhost",
    //       protocol: "http:",
    //       port: 3000
    //     }
    //   }
    // }
  }
};
