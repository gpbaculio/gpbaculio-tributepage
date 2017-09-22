const webpack = require('webpack');
const path    = require('path');
module.exports = {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, 'js', 'app.js')],
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
<<<<<<< HEAD
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
=======
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
>>>>>>> 14ee168bfe1a5dd21a766568cd371a8a4c6e95d1
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
<<<<<<< HEAD
    })
=======
    }),
     new webpack.LoaderOptionsPlugin({
    debug: true
  })
>>>>>>> 14ee168bfe1a5dd21a766568cd371a8a4c6e95d1
  ]
};