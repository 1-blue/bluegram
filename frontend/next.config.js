const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@src": path.resolve(__dirname, "src"),
        },
      },
    };
  },
  images: {
    domains: ["localhost", "blegram.s3.ap-northeast-2.amazonaws.com"],
  },
};
