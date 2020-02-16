const path = require("path");
const basePath = process.cwd();

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      proxy: {
        "/security/": {
          target: "http://10.144.239.120:8100/"
        },
        "/api/": {
          target: "http://10.144.239.120:8100/"
        }
      },
      port: "3000",
      open: true,
      overlay: true
    }
  },
  chainWebpack: config => {
    // 设置开发模式的入口
    config
      .entry("app")
      .clear()
      .add(path.resolve(basePath, "example", "main.ts"));

    // 为 /example目录设置别名 ex
    config.resolve.alias.set("ex", path.resolve(basePath, "example"));
  }
};
