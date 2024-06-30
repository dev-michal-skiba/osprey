const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'popup': './src/popup.ts',
    'content/otodom': './src/content/otodom.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
