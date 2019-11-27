module.exports = {
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  outputDir: process.env.outputDir,
  devServer: {
    // host: '192.168.1.251',
    proxy: 'http://39.98.46.73:82',
    // proxy: 'http://192.168.2.140:8080',
    // proxy: {
    //   '/api': {
    //     target: 'http://39.98.46.73:82',
    //     ws: true,
    //     changeOrigin: true
    //   },
    // }
  }
}