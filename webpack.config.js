const path = require("path");

module.exports = {
  entry: ["@babel/pollyfill", "./_source/script/main.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./bundle.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "_source"),
    },

    compress: true,
    port: 9000,
  },
};
