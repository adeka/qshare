const baseConfig = require("./webpack.config.js");
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const webpack = require("webpack");

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
  ...baseConfig,
  mode: "production",
  module: {
    rules: [
      ...baseConfig.module.rules
      //   {
      //     test: /\.(sa|sc|c)ss$/,
      //     exclude: /node_modules/,
      //     use: [
      //       {
      //         loader: ExtractCssChunks.loader,
      //         options: {
      //           hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      //           modules: true, // if you use cssModules, this can help.
      //           reloadAll: true // when desperation kicks in - this is a brute force HMR flag
      //         }
      //       },
      //       {
      //         loader: "css-loader",
      //         options: {
      //           importLoaders: 1,
      //           modules: true,
      //           localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
      //         }
      //       },
      //       "sass-loader"
      //     ]
      //   }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    // new ExtractCssChunks({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "[name]-[contenthash].css",
    //   chunkFilename: "[id]-[contenthash].css",
    //   orderWarning: true // Disable to remove warnings about conflicting order between imports
    // }),
    new webpack.DefinePlugin({
      "process.env": {
        production: true,
        ...envKeys
      }
    })
  ],
  output: {
    filename: "[name].[contenthash].js"
  }
  // optimization: {
  //   mangleWasmImports: true,
  //   runtimeChunk: false,
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor_app",
  //         chunks: "all",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
};
