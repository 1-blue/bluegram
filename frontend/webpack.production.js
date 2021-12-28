require("dotenv").config();

const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 웹펙 시작 모드 설정
  mode: "production",

  // 디버깅을 위한 설정 배포 시 eval
  devtool: "eval",

  // 경로 및 확장자 설정
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/store"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@css": path.resolve(__dirname, "src/css"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    // 로더 해석에 적용되지 않음
    modules: ["node_modules", path.resolve(__dirname, "app")],
  },

  // 진입점 설정
  entry: {
    app: "./index.js",
  },

  // 빌드 결과물 위치 지정
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  // 로더 설정
  module: {
    rules: [
      // jsx 해석을 위한 babel로더 설정
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // @babel/preset-env는 브라우저 환경에 맞게 알아서 바벨 설정을 해줌
          // @babel/preset-react는 jsx 지원
          presets: ["@babel/preset-env", "@babel/preset-react"],
          // dev server을 위한 설정, async와 await를 위한 설정
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },

      // css를 위한 로더
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // 2021/12/25 - svg를 위한 로더 - by 1-blue
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  // 플러그인 설정 / html생성 / refresh / dotenv설정
  plugins: [
    new HtmlWebpackPlugin({ title: "bluegram", template: "./index.html", favicon: "./src/assets/favicon/favicon.ico" }),
    new RefreshWebpackPlugin(),
    new DotenvWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
};
