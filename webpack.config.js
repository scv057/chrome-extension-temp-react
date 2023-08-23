const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'content-script': './src/scripts/index.jsx',
    // "popup": "./src/popup/popup.js",
    // "option": "./src/options/option.js",
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'ts-loader',
        exclude: /node_module/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {from: '', to: ''},
    //   ],
    // }),
  ],
  devServer: {
    compress: true,
    port: 9000,
  },
  devtool: 'cheap-module-source-map'
};