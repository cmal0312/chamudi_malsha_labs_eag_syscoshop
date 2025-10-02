const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "SyscoShop";
  const isProduction = argv && argv.mode === "production";

  const defaultConfig = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "eval-source-map",
    externals: [
      "single-spa",
      "react",
      "react-dom",
      "react-dom/client"
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      modules: [__dirname, "node_modules"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.html$/,
          type: "asset/source",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
  };

  return merge(defaultConfig, {
    entry: {
      "SyscoShop-root-config": "./src/SyscoShop-root-config.js",
    },
    output: {
      filename: "[name].js",
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      publicPath:
        webpackConfigEnv && webpackConfigEnv.isLocal
          ? "http://localhost:9001/"
          : "/",
    },
    devServer: {
      allowedHosts: "all",
      port: 9001,
      historyApiFallback: true,
      hot: true,
      client: {
        webSocketURL: {
          hostname: "localhost",
          port: 9001,
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
