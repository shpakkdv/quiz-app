const path = require('path');

// plugins
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js'
  },
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },

      // {
      //   test: /\.css$/,
      //   exclude: [
      //     /node_modules/,
      //   ],
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader?context=/',
      //       options: {
      //         modules: true,
      //         sourceMap: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]__[local]__[hash:base64:5]',
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ]
      // },

      // {
      //   test: /\.css$/,
      //   exclude: [
      //     /node_modules/,
      //   ],
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           // modules: true,
      //           importLoaders: 1,
      //           sourceMap: true,
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //       }
      //     ]
      //   }),
      // },
    ]
  },

  plugins: [
    // new ExtractTextPlugin({
    //   filename: '[name].css',
    //   allChunks: true,
    // }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      favicon: path.resolve('src/images/favicon.png'),
    }),

    new ForkTsCheckerWebpackPlugin()
  ]
}
