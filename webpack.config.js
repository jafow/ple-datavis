const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    publicPath: '/dist/',
    historyApiFallback: true,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        include: path.resolve(__dirname, 'lib'),
        test: /\.js?/,
        loader: 'babel-loader'
      }
    ]
  }
}
