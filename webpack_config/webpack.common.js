const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const paths = {
  root: path.join(__dirname, '../'),
  src: path.join(__dirname, '../src'),
  output: path.join(__dirname, '../dist'),
  assets: path.join(__dirname, '../src/assets'),
  static: path.join(__dirname, '../public'),
  modules: path.join(__dirname, '../node_modules')
};

const config = {
  entry: paths.src + '/root.tsx',
  output: {
    filename: '[name].bundle.js',
    path: paths.output,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.sass', '.css'],
    modules: [paths.src, paths.modules, paths.root]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: process.env.NODE_ENV === 'development'
    }),
    new HardSourceWebpackPlugin({
      environmentHash: {
        root: process.cwd(),
        directories: ['webpack_config'],
        files: ['package.json']
      }
    }),
    new MiniCSSExtractPlugin({
      filename: `[name].[hash].css`
    }),
    new WebappWebpackPlugin({
      logo: path.join(__dirname, '../src/assets/imgs/favicon.png'),
      cacheDirectory: false, // Cache makes builds nondeterministic
      inject: true,
      prefix: 'common/assets/meta-[hash]',
      favicons: {
        appDescription: 'Ethereum web interface',
        display: 'standalone',
        theme_color: '#007896'
      }
    })
  ]
};

module.exports = config;
