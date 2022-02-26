//
// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)
//
// module.exports = {
//   chainWebpack: config => {
//     // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
//     config.resolve.alias
//       .set('assets', resolve('@/assets'))
//       .set('components', resolve('src/components'))
//       .set('views', resolve('src/views'))
//       .set('network',resolve('src/network'))
//   },
// }
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
