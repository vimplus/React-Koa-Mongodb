const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;

const webpackBaseConfig  = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConfig, {
    //文件入口配置
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://127.0.0.1:9000',
            'webpack/hot/only-dev-server',
            './src/entry/index.dev.js'
        ]
    },
    output: {
        publicPath: '//static.cims.thinktxt.com/', //webpack-dev-server访问的路径
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[id].chunk.[hash:8].js'
    },
    //devtool: '#eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    //插件项
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(),        // prints more readable module names in the browser console on HMR updates

        new webpack.HashedModuleIdsPlugin(),    //稳定chunkhash
        new AggressiveMergingPlugin(),          //Merge chunks
        new HtmlWebpackHarddiskPlugin(),
        new InlineChunkWebpackPlugin({
	        inlineChunks: ['manifest']
	    }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           hot: true,
           proxy: {
               "/api": "http://172.3.1.33:8086"
           }
         }
       })
    ]
})
