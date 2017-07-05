const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;

const webpackBaseConfig = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConfig, {
    //文件入口配置
    entry: {
        index: './src/entry/index.js',
        vendor: ['whatwg-fetch', 'es6-promise', 'fetch-detector']
    },
    //文件输出配置
    output: {
        publicPath: '/',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[id].chunk.[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: [
                { loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
            ]
        }]
    },
    devtool: false,
    //插件项
    plugins: [
        new webpack.HashedModuleIdsPlugin(),    //稳定chunkhash
        new AggressiveMergingPlugin(),          //Merge chunks
        new InlineChunkWebpackPlugin({
	        inlineChunks: ['manifest']
	    }),
        /*new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),*/
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [autoprefixer];
                }
            }
        }),
        /*new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
            // exclude: ['shared.js']
        }),*/
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
    ]
})
