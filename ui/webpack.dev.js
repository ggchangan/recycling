/* eslint-disable import/no-nodejs-modules */
const path = require('path');
const fs = require('fs');
const common = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const options = process.argv;

const isMock = options.indexOf('--mock') > -1;
module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]_[hash:8].js',
        publicPath: 'http://localhost:9000/'
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.DefinePlugin({
            HEADER_URL: JSON.stringify('/analytics/api/discover?module=analytics')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin() //,
        // new WriteFilePlugin({
        //     test: /^(?!.*(hot)).*/
        // })
    ],
    devServer: {
        contentBase: './dist',
        port: 9000,
        publicPath: 'http://localhost:9000/',
        index: './app.html',
        openPage: 'dashboard',
        proxy: {
            '/analytics/api': 'http://localhost:9000',
            '/doraemon/api': isMock ? 'http://localhost:9000' : 'http://localhost:1969'
        },
        before: app => {
            app.get(['/dashboard', '/detail', '/impact', '/delivery'], (req, res, next) => {
                req.url = '/app.html';
                next('route');
            });
            app.all('/analytics/api/:name', (req, res) => {
                let query = req.query;
                let queryName = req.params.name;
                if (queryName === 'reportList') {
                    query.search = JSON.parse(query.search);
                    if (query.search && query.search.queries && query.search.queries.length) {
                        queryName = 'reportListQuery';
                    }
                }
                const mockData = fs.readFileSync('./mock/' + queryName + '.json', 'utf8');
                res.header('Content-Type', 'application/json');
                res.json(JSON.parse(mockData));
            });
            if (isMock) {
                app.all('/doraemon/api/:name', (req, res) => {
                    let query = req.query;
                    let queryName = req.params.name;
                    if (queryName === 'reportList') {
                        query.search = JSON.parse(query.search);
                        if (query.search && query.search.queries && query.search.queries.length) {
                            queryName = 'reportListQuery';
                        }
                    }
                    const mockData = fs.readFileSync('./mock/' + queryName + '.json', 'utf8');
                    res.header('Content-Type', 'application/json');
                    res.json(JSON.parse(mockData));
                });
                app.all('/doraemon/api/:name/:subname', (req, res) => {
                    let {name, subname} = req.params;
                    const mockData = fs.readFileSync('./mock/' + name + '/' + subname + '.json', 'utf8');
                    res.header('Content-Type', 'application/json');
                    res.json(JSON.parse(mockData));
                });
            }
            app.all('/analytics/api/:name/:subname', (req, res) => {
                let {name, subname} = req.params;
                const mockData = fs.readFileSync('./mock/' + name + '/' + subname + '.json', 'utf8');
                res.header('Content-Type', 'application/json');
                res.json(JSON.parse(mockData));
            });
        }
    }
});
