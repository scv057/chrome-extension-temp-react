const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pages = ['content-script', 'option'];

module.exports = {
  entry: pages.reduce((config, page)=>{
    config[page] = `./src/${page}/${page}.js`;
    return config
  }, {}),
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
    extensions: ['.js', 'jsx','.ts', '.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
  ].concat(pages.map(page=>{return new HtmlWebpackPlugin({
    inject: true,
    template: `./src/${page}/${page}.html`,
    filename: `${page}.html`,
    chunks: [page]
  })})),
  devServer: {
    compress: true,
    port: 9000,
  },
  devtool: 'cheap-module-source-map'
};