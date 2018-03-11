var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/', 'app.jsx')],
  output: {
    path: path.join(__dirname, 'src/client/static/build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.(s)?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.json$/,
          loader: 'json-loader'
      }
    ]
  }
}