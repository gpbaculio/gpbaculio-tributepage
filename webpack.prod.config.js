const webpack = require('webpack');
const path    = require('path');
module.exports = {
  devtool: 'source-map',
<<<<<<< HEAD
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
=======
  entry: [path.resolve(__dirname, 'js', 'app.js')],
>>>>>>> 986123cadb8d3cee76a008c90a6b7245b77a5d33
  module: {
    loaders: [
      {
        exclude: /node_modules/,
         loader: 'babel-loader',
           test: /\.js$/,
      },  
      {
           test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};