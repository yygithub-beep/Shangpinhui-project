const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭map文件自动打包
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslint校验工具
  lintOnSave:false,
  // 解决跨域问题（代理服务器）
  devServer: {
    proxy: {
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
