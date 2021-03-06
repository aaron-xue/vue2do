const shelljs = require('shelljs')
shelljs.env.NODE_ENV = 'production'
const path = require('path')
const config = require('./config')
const ora = require('ora')
const webpack = require('webpack')
const websiteProject = './zen0822.github.io'

const prodConfig = [{
  spinner: 'development build (Browser)',
  library: 'var',
  filename: 'vue2do.js',
  compress: false
}, {
  spinner: 'production build (Browser)',
  library: 'var',
  filename: 'vue2do.min.js',
  compress: true
}, {
  spinner: 'development build (CommonJS and AMD)',
  library: 'umd',
  filename: 'vue2do.umd.js',
  compress: false
}, {
  spinner: 'production build (CommonJS and AMD)',
  library: 'umd',
  filename: 'vue2do.umd.min.js',
  compress: true
}]

module.exports = function ({
  appName = 'example'
} = {}) {
  const assetsPath = path.join(config.build.assetsRoot)
  shelljs.rm('-rf', assetsPath)
  shelljs.mkdir('-p', assetsPath)

  const spinner = ora('building production...')
  spinner.start()

  prodConfig.forEach((item) => {
    const webpackConfig = require('./config/prod.webpack.conf')({
      appName: appName,
      compress: item.compress,
      library: item.library,
      filename: item.filename
    })
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()

      if (err) throw err

      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    })
  })
}
