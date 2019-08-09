'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
        // 输出的日志信息
        stats: {
            // 添加 public path 的信息
            publicPath: true,
            // 添加构建模块信息, 这个日志非常多，关掉
            modules: false,
            // 添加 children 信息, 非常多
            children: false,
            // 添加警告
            warnings: true
        }
    },
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve('src')]
            },
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
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: "all"
                }
            }
        }
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html'
        }),
    ]

};