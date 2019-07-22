/* eslint-disable import/no-nodejs-modules */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let Context = '{{ .assetHost }}';
let headerUrl = '/ui/foundation/discover?module=analytics';

const isDev = process.argv.indexOf('--dev') > -1;
if (isDev) {
    Context = '/analytics/';
    headerUrl = '/analytics/api/discover?module=analytics';
}

module.exports = merge(common, {
    mode: 'production',
    devtool: 'no-source-map',
    output: {
        path: path.resolve(__dirname, '../', 'www', 'supera'),
        filename: 'assets/[name]_[hash:8].js',
        publicPath: Context
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                test: /\.(js|jsx)$/i
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['supera'], {
            root: __dirname + '/' + '../www'
        }),
        new webpack.DefinePlugin({
            HEADER_URL: JSON.stringify(headerUrl),
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
