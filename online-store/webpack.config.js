const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",   // Creates `style` nodes from JS strings
          "css-loader",     // Translates CSS into CommonJS
          "sass-loader",    // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]',
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext][query]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;