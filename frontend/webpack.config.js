// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    //publicPath: "/static/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
        };
      },
      chunksSortMode: "auto",
      minify: {
        collapseWhitespace: false,
      },
      cache: true,
    }),

    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    devtool: false;
    //config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify(
          "https://webtetrado.cs.put.poznan.pl"
        ),
      })
    );
    config.plugins.push(
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, "build"),
        src: "index.html",
        dest: "index.html",
        inline: true,
        minify: true,
        extract: true,
        width: 320,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        },
      })
    );
    config.output.publicPath = "/static/";
  } else {
    config.mode = "development";
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify("http://127.0.0.1"),
      })
    );
    config.output.publicPath = "/";
  }
  return config;
};
