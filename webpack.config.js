const path = require('path');
// import path from 'path';
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/index.js', // Your app's entry point
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  plugins: [
    new HTMLWebpackPlugin({
      // filename: 'index.html',
      template: '/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    proxy: {
      // '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: 'build',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }, // Use Babel for JSX/JS
        },
      },
      {
        test: /\.css$/, // Apply the following loaders to .css files
        use: ['style-loader', 'css-loader'], // Loaders are applied from right to left
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing .js and .jsx files
  },
};
