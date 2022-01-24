const path = require("path");

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    return {
      ...config,
      // 절대경로 설정
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@assets": path.resolve(__dirname, "src/assets"),
          "@components": path.resolve(__dirname, "src/components"),
          "@css": path.resolve(__dirname, "src/css"),
          "@hooks": path.resolve(__dirname, "src/hooks"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@store": path.resolve(__dirname, "src/store"),
          "@utils": path.resolve(__dirname, "src/utils"),
        },
      },
      // SVG 파일 로더
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          },
        ],
      },
    };
  },
};
