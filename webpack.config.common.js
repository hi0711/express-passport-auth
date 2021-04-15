const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: ['./src_client/app']
    },
    output: {
        path: path.join(__dirname, './views/dist/js'),
        publicPath: '/dist/js',
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
};
