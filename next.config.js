/** @type {import('next').NextConfig} */
// const withVideos = require("next-videos");
module.exports = {
  reactStrictMode: false,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^electron$/,
      })
    );
    return config;
  },
};
