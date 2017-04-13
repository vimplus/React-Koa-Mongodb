const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

var devConfig = require('./build/webpack.dev.conf.js');
var prodConfig = require('./build/webpack.prod.conf.js');

var port = devConfig.devServer.port;

var buildInfo = {
	assets: true,			// 增加资源信息
	assetsSort: "field",	// 对资源按指定的项进行排序
	cached: false,			// 增加缓存了的（但没构建）模块的信息
	children: false,		// 增加子级的信息
	chunks: false,			// 增加包信息（设置为 `false` 能允许较少的冗长输出）
	chunkModules: false,	// 将内置模块信息增加到包信息
	chunkOrigins: false,	// 增加包 和 包合并 的来源信息
	chunksSort: "field",	// 对包按指定的项进行排序
	context: "../src/",		// 用于缩短请求的上下文目录
	colors: true,			// 等同于`webpack --colors`
	errors: true,			// 增加错误信息
	errorDetails: true,		// 增加错误的详细信息（就像解析日志一样）
	hash: true,				// 增加编译的哈希值
	modules: false,			// 增加内置的模块信息
	modulesSort: "field",	// 对模块按指定的项进行排序
	publicPath: true,		// 增加 publicPath 的信息
	reasons: true,			// 增加模块被引入的原因
	source: true,			// 增加模块的源码
	timings: true,			// 增加时间信
	version: false,			// 增加 webpack 版本信息
	warnings: true			// 增加提示
}

// 开发环境服务
gulp.task('server', function(callback) {
	var compiler = webpack(devConfig);
	var serverConfig = {
		hot: true,
		contentBase: 'dist',
		stats: buildInfo
	}
	new webpackDevServer(compiler, serverConfig).listen(port, "127.0.0.1", function(err) {
			if (err) throw new gutil.PluginError("webpack-dev-server", err);
			// Server listening
			gutil.log("[webpack-dev-server]",
				"http://127.0.0.1:" + port);
		});
});

// 打包发布
gulp.task('release', function(callback) {
	return webpack(prodConfig, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString(buildInfo));
		callback();
	});
});

gulp.task('default', ['server'], function() {
	console.log( 'default task...' );
});
