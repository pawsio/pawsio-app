const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const cssExtract = new ExtractTextPlugin('main.css');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './build',
        // path: '../pawsio-server/public',
        filename: 'main.js'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('main.css'),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: 'img'
        }])
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader',
            query: {
                cacheDirectory: true,   
            } 
        }, {
            test: /\.css$/,
            loader: cssExtract.extract(
                'style-loader',
                'css-loader'
            )	
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!sass?sourceMap')
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    sassLoader: {
        includePaths: ['./src/scss/partials']
    }
};


