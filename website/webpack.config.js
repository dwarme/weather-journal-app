const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        clean: {
            keep: /static\/css\/style.css/
        },
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource'
            },
            { 
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            { 
                test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: 'defaults'}]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']                       
                    }
                }
            }
        ]
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
        })
    ],
    mode: 'production'
}