module.exports = {
  entry: './frontend/src/js/entry.js',
  output: {
    path: './frontend/dist/js',
    filename: 'entry.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
