const tip = require('./webpack.tip')();
const packageJSON = require(tip.paths.package);
const dllArray = packageJSON.dll || [];
console.log('packing dll: ', dllArray);

module.exports = {
  mode: tip.mode.production,
  entry: {
    dll: dllArray,
  },
  output: {
    path: tip.paths.dll,
    filename: '[name].js',
    library: '[name]_library',
  },
  resolve: {
    extensions: tip.resolve.extensions,
    alias: tip.resolve.alias,
    plugins: [],
  },
  module: {
    strictExportPresence: true,
    rules: [
      tip.module.rules.cssLoader,
      tip.module.rules.stylusLoader,
      tip.module.rules.urlLoader,
      tip.module.rules.fileLoader,
      tip.module.rules.sourceMapLoader,
      tip.module.rules.babelLoaderDll,
    ],
  },
  plugins: [tip.plugins.FastUglifyJsPluginDll, tip.plugins.DllPlugin],
};
