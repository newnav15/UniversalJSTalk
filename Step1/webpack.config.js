const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js',
    publicPath: '/static',

  },
  devServer: {
    contentBase: __dirname,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {presets: ['es2015', 'react']}
      }]
    }]
  }
};