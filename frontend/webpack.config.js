require("dotenv").config();

const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  // 웹펙 시작 모드 설정
  mode: "development",

  // 디버깅을 위한 설정 배포 시 eval
  devtool: "source-map",

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
          plugins: ["react-refresh/babel", "@babel/plugin-transform-runtime"],
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
    new HtmlWebpackPlugin({ title: "bluegram", template: "./index.html" }),
    new RefreshWebpackPlugin(),
    new dotenvWebpackPlugin(),
  ],

  // 데브서버 설정
  devServer: {
    // 번들링한 결과물을 저장할 위치 ( 메모리상 )
    devMiddleware: {
      publicPath: "/dist",
    },
    // 정적 파일들의 위치 지정
    static: {
      // 내 컴퓨터에서 공유할 파일들이 있는 경로
      directory: path.resolve(__dirname, "public"),
      // 브라우저상에서 접근할 경로
      publicPath: "/",
      // 정적 파일 수정시 페이지 새로고침 여부
      watch: true,
      // index 파일 없으면 브라우저에서 폴더를 보여줄지 여부
      serveIndex: true,
    },
    // 핫 모듈 리로딩 기능 ( 새로고침해도 기존 입력 정보는 유지 )
    hot: true,
    // 포트번호 설정
    port: 8080,
    // SPA의 react-router 같은 거 사용할 때 필수적으로 적용해 줘야 하는 옵션이다.
    // 기본적으로 /login으로 요청 보내면 404에러가나기 때문에 그때 index.js로 요청을 넘기게 해주는 옵션 값
    historyApiFallback: true,
  },
};
