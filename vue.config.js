const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  publicPath:'/',
  // publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
  //端口配置
  devServer: {
    port: 6688, //端口号 -- 6688
    open: false, //启动后是否自动打开浏览器
    https: false // 是否开启 https
  },
  // element plus 自动到包的配置
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve("./node_modules/vue")
      }
    }
  }


});
