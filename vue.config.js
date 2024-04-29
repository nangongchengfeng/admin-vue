/***
Vue配置 
***/

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭效验
  lintOnSave: false, //关闭校验
  productionSourceMap: false, //生产环境是否要生成 sourceMap
  publicPath: '/', //部署应用包时的基本 URL(如果是'./'导致刷新页面出现cannot get/错误)
  outputDir: 'dist', // build 时输出的文件目录 
  assetsDir: 'assets', // 放置静态文件夹目录
  devServer: {
    port: 2001, //开发运行时的端口
    host: '0.0.0.0',// 开发运行时域名，设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的http://ip:port/...访问你的项目
    https: false, // 是否启用 https
    open: false, // 是否直接打开浏览器
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:2002',
        changeOrigin: true
      }
    },
    client: {
      overlay: false  // 关闭全屏报错
    }
  }
})
