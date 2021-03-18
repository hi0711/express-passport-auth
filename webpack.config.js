const webpack = require('webpack');
const glob = require('glob');
const path = require('path');

const entries = glob.sync('./src_client/**/*.js');

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'views'),
        port: 3000,
        host: 'localhost',
        hot: true,
    },
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/js/',
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['./', 'node_modules'],
    },
    plugins: [],
};
