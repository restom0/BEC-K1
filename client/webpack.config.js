// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
  mode: 'development',
  entry: {
    index: { import: './src/scripts/index.js', dependOn: 'vendors' },
    home: { import: './src/scripts/home.js', dependOn: 'vendors' },
    login: { import: './src/scripts/login.js', dependOn: 'vendors' },
    manage: { import: './src/scripts/manage.js', dependOn: 'vendors' },
    buy: { import: './src/scripts/buy.js', dependOn: 'vendors' },
    history: { import: './src/scripts/history.js', dependOn: 'vendors' },
    queue: { import: './src/scripts/queue.js', dependOn: 'vendors' },
    report: { import: './src/scripts/report.js', dependOn: 'vendors' },
    vendors: ['jquery', 'flowbite', 'pdfjs-dist'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home - SSPS',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
