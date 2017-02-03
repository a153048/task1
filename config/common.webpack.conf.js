'use strict'
const helpers = require('./helpers')

// Short usage reference
// `ENV` = local | development | stage | release | production
// `NODE_ENV` = development | test | production
// `MOCK_MODE` = none | api | loader | all
// `LOG_LEVEL` = error | warn | info | debug

module.exports = {
  data: {
    cache: true,
    resolve: {
      extensions: [ '.ts', '.js', '.scss' ],
      modules: [
        helpers.root('src'),
        'node_modules'
      ],
      mainFiles: [ 'index' ]
    },
    output: {
      path: helpers.root('public'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: 'tslint-loader',
          exclude: [
            /node_modules/,
            /\.(spec|e2e)\.ts$/
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader'
        },
        {
          test: /\.ts$/,
          use: 'awesome-typescript-loader',
          exclude: [ /\.(spec|e2e)\.ts$/ ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [ helpers.root('src/index.html') ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.scss/,
          use: [
            'raw-loader',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ],
          include: helpers.root('src/app')
        },
        {
          test: /main\.scss/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ],
      noParse: [
        /zone\.js\/dist\/.+/,
        /angular2\/bundles\/.+/,
        /\.(spec|e2e)\.ts$/
      ]
    },
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
    devServer: {
      port: 8081
    }
  }
}
