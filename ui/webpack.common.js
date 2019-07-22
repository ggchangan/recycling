/* eslint-disable import/no-nodejs-modules */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: './app/index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'app'), 'node_modules', 'node_modules/spark-ui/lib']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /(\.modules\.css$)|(.*?(elemental-freewheel|antd|highlight.js|react-vis|react-select-freewheel|spark-ui)(\/).*?(\.)(css))|(styles\/app\.css)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.modules\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&camelCase=only'
                ]
            },
            {
                test: /(.*?(elemental-freewheel|react-select-freewheel|antd|highlight.js|react-vis|spark-ui)(\/).*?(\.)(css))|(styles\/app\.css)/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    }
                ]
            },
            {
                test: /\.woff2?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Analytics UI',
            template: './template/app.html',
            chunks: ['app'],
            filename: 'app.html',
            templateParameters: true
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name]_[hash:8].css'
        })
    ]
};
