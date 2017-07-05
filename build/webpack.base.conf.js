const webpack = require('webpack');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

process.noDeprecation = true;

module.exports = {
    //文件入口配置
    /*entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://127.0.0.1:9000',
            'webpack/hot/only-dev-server',
            './src/entry/index.js'
        ]
    },*/
    //文件输出配置
    output: {
        path: resolve(__dirname, '../dist'), //打包输出目录
    },
    // 声明CDN加载的库，不会通过webpack打包
    externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        // 'history': "History",
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
        // 'lodash': '_'
    },
    //加载器配置
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            }
        }, {
			test: /\.(png|jpe?g|gif)$/i,
			loader: 'url-loader',
			options: {
				limit: 8192,
				name:'images/[name].[hash:8].[ext]'
			}
		}, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
            use: [
            {
                loader: 'file-loader',
                options: {
					name:'images/[name]-[hash:6].[ext]'
                }
            }]
        }]
    },
    //插件项
    plugins: [
        /*new webpack.ProvidePlugin({
			'Promise': 'bluebird',
            // 'React': 'react'
		}),*/
        // new webpack.optimize.ModuleConcatenationPlugin(),   // webpack 3 新增的作用域提升插件
        new CommonsChunkPlugin({
            names:['manifest', 'vendor'].reverse(),
            minChunks: 2,
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.html', //html模板路径
            chunks: ['manifest', 'vendor', 'index']  // manifest: 可以理解为模块清单，载货单
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            libs: resolve('./src/libs'),
            utils: resolve('./src/utils'),
            scss: resolve('./src/scss'),
            css: resolve('./src/css'),
            img: resolve('./src/images'),
            api: resolve('./src/api'),
            cpn: resolve('./src/components'),
            routes: resolve('./src/routes'),
            data: resolve('./src/data')
        },
        modules: ['node_modules']
    }
}
