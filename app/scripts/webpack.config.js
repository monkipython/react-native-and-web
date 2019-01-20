const fs = require('fs-extra');
const tip = require('./webpack.tip')();
const resolve = require('path').resolve;
const webpack = require('webpack');
const isHaveDll = fs.existsSync(resolve(tip.paths.dll, 'dll.js'));
const dllPlugin = isHaveDll ? [tip.plugins.DllReferencePlugin] : [];

module.exports = {
  target: 'web',
  mode: tip.isDev ? tip.mode.development : tip.mode.production,
  devtool: tip.isDev ? tip.devtool.sourceMap : tip.devtool.none,
  entry: {
    index: tip.paths.entry,
  },
  output: {
    path: tip.paths.output,
    pathinfo: true,
    filename: '[name]_[hash:8].js',
    chunkFilename: '[name].chunk.js',
    // publicPath: '/',
  },
  resolve: {
    extensions: tip.resolve.extensions,
    alias: tip.resolve.alias,
    plugins: [],
  },
  externals: {},
  module: {
    rules: [
      tip.module.rules.eslint,
      tip.module.rules.cssLoader,
      tip.module.rules.stylusLoader,
      tip.module.rules.urlLoader,
      tip.module.rules.fileLoader,
      tip.module.rules.sourceMapLoader,
      tip.module.rules.tsLodaer,
      tip.module.rules.babelLoaderBuild,
    ],
  },
  devServer: tip.devServer,
  plugins: tip.isDev
    ? [tip.plugins.HtmlWebpackPlugin, tip.plugins.DefinePlugin, ...dllPlugin]
    : [
        tip.plugins.HtmlWebpackPlugin,
        tip.plugins.DefinePlugin,
        tip.plugins.FastUglifyJsPluginProd,
        tip.plugins.HotModuleReplacementPlugin,
        tip.plugins.CleanWebpackPlugin,
        tip.plugins.CopyWebpackPlugin,
        tip.plugins.HashedModuleIdsPlugin,
        ...dllPlugin,
      ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
