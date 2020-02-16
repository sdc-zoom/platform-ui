const path = require("path");
const basePath = process.cwd();

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    output: {
      path: path.resolve(basePath, "dist"),
      filename: "platform-ui.min.js",
      libraryTarget: "umd",
      library: "PlatformUI",
      umdNamedDefine: true
    },
    externals: {
      axios: {
        commonjs: "axios",
        commonjs2: "axios",
        amd: "axios",
        root: "axios"
      },
      "vue": {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "vue"
      },
      "vue/types/umd": {
        commonjs: "vue/types/umd",
        commonjs2: "vue/types/umd",
        amd: "vue/types/umd",
        root: "vue/types/umd"
      },
      "axios": {
        commonjs: "axios",
        commonjs2: "axios",
        amd: "axios",
        root: "axios"
      },
      "element-ui": {
        commonjs: "element-ui",
        commonjs2: "element-ui",
        amd: "element-ui",
        root: "ElementUI"
      },
      "moment": {
        commonjs: "moment",
        commonjs2: "moment",
        amd: "moment",
        root: "moment"
      },
      "element-ui/lib/theme-chalk/index.css": {
        commonjs: "element-ui/lib/theme-chalk/index.css",
        commonjs2: "element-ui/lib/theme-chalk/index.css",
        amd: "element-ui/lib/theme-chalk/index.css",
        root: "element-ui/lib/theme-chalk/index.css"
      }
    }
  },
  chainWebpack: config => {
    // 设置开发模式的入口
    config
      .entry("app")
      .clear()
      .add(path.resolve(basePath, "src", "index.ts"));

    // 删除打包库时不必要的插件
    config.plugins.delete("copy");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("html");
    config.plugins.delete("named-chunks");
    // config.plugins.delete("hash-module-ids");

    // 使js不拆分
    config.optimization.splitChunks({});

    // 修改css打包策略
    config.plugin("extract-css").tap(() => [
      {
        filename: "platform-ui.min.css"
      }
    ]);

    // 修改css 压缩策略以及sourcemap
    config.plugin("optimize-css").tap(() => [
      {
        sourceMap: true,
        cssnanoOptions: {
          preset: [
            "default",
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      }
    ]);
  }
};
