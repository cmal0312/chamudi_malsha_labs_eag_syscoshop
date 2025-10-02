const { merge } = require("webpack-merge");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const isProduction = argv && argv.mode === "production";

  const defaultConfig = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "eval-source-map",
    externals: ["single-spa", "react", "react-dom", "react-dom/client"],
    resolve: {
      modules: [__dirname, "node_modules"],
      extensions: [".js", ".jsx"],
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
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    entry: {
      "SyscoShop-customer-mfe": "./src/SyscoShop-customer-mfe.js",
    },
    output: {
      filename: "[name].js",
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      publicPath:
        webpackConfigEnv && webpackConfigEnv.isLocal
          ? "http://localhost:9002/"
          : "/",
    },
  };

  return merge(defaultConfig, {
    devServer: {
      port: 9002,
      historyApiFallback: true,
      hot: true,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  });
};
