const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require(path.resolve(__dirname, `./index`))
  const appConfig = require(path.resolve(__dirname, `${config.global.root}/${appName}/config.json`))
  const utils = require(path.resolve(__dirname, `./../utils`))
  const port = process.env.PORT || config.dev.port

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName: appName
  })
  const template = appConfig.template ? '' : path.resolve(__dirname, `../tpl/index.html`)

  let baseEntryApp = baseWebpackConfig.entry.app.slice()
  delete baseWebpackConfig.entry

  const devConf = merge(baseWebpackConfig, {
    entry: {
      app: baseEntryApp.concat([
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/dev-server'
      ])
    },
    module: {
      rules: [{
        test: /grid\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'webpack-bundle-report.html',
          defaultSizes: 'parsed',
          openAnalyzer: false,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
      }),
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template,
        inject: true
      })
    ]
  })

  return devConf
}
