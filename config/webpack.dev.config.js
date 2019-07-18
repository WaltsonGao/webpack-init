'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        overlay: true,
        port: 8090,
        historyApiFallback: true,
        compress: true,
        inline: true,
        hot: true,
        // open: true,
        clientLogLevel: 'none',
    },
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            }, {
                test: /\.(png|jpg|svg|gif)$/,
                // use: ['file-loader']
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]',
                    publicPath: './'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html'
        }),
    ]

};