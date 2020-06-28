const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
   context: __dirname,
   entry: {app:path.resolve(__dirname, 'src/index.js')},
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'js/[name].js',
      publicPath: '/',
   },
   node: {
    fs: "empty"
   },
   resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
   devServer: {
      historyApiFallback: true,
      hot: true,
      open: true
   },
   module: {
      rules: [
         {
            test: /\.(js$|jsx|ts|tsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                  presets:  ['@babel/preset-env',
                  '@babel/react',{
                  'plugins': ['@babel/plugin-proposal-class-properties']}]
            }
         },
         {
            test: /\.(s*)css$/,
            use: [
                MiniCssExtractPlugin.loader, // instead of style-loader
                'css-loader'
              ]
         },
         {
            test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.PNG$/],
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            }
          },
         { 
            test: /\.(woff|woff2|eot|ttf)?$/,
            loader: 'url-loader?limit=100000',
            options: {
              name: "[name].[ext]",
            }
          }
]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv(),
      new MiniCssExtractPlugin()
   ]
};