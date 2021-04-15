const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common');


module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'views'),
        port: 3000,
        host: 'localhost',
    },
    watchOptions: {
        poll: 1000,
        ignored: ['node_modules'],
    },
    plugins: [],
})
