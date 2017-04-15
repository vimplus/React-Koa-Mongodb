const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

process.noDeprecation = true;

module.exports = {
    //文件入口配置
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://127.0.0.1:9000',
            'webpack/hot/only-dev-server',
            './src/entry/index.js'
        ]
    },
    //文件输出配置
    output: {
        path: path.resolve(__dirname, '../dist'), //打包输出目录
    },
    // 声明CDN加载的库，不会通过webpack打包
    externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        'history': "History",
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'lodash': '_'
    },
    //加载器配置
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: ['babel-loader']
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
			'Promise': 'bluebird'
		}),*/
        new CommonsChunkPlugin({
            name:['manifest', 'index'].reverse(),
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.html', //html模板路径
            chunks: ['manifest', 'index']  // manifest: 可以理解为模块清单，载货单
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            libs: path.resolve('./src/libs'),
            utils: path.resolve('./src/utils'),
            scss: path.resolve('./src/scss'),
            css: path.resolve('./src/css'),
            img: path.resolve('./src/images'),
            api: path.resolve('./src/api'),
            cpn: path.resolve('./src/components'),
            routes: path.resolve('./src/routes'),
            data: path.resolve('./src/data')
        },
        modules: ['node_modules']
    }
}
