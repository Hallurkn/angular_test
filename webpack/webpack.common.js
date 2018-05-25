const { root } = require('./helpers');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

const styleOptions = () => [autoprefixer('last 2 versions', 'ie 10')];

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: root('./src/index.html'),
	output: root('dist'),
	inject: 'head'
});

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
	devtool: 'eval',
	devServer: {
		inline: true,
		historyApiFallback: true,
		open: true,
		port: 3000,
		hot: true,
	},
	stats: {
		children: false,
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	entry: {
		client: root('./src/main.ts'),
		polyfills: root('./src/polyfills.ts'),
		vendors: [
			'@angular/http',
			'@angular/router',
			'core-js'
		],
	},
	output: {
		filename: '[name].js',
		path: root('dist'),
		pathinfo: true
	},
	target: 'web',
	plugins: [
		new AngularCompilerPlugin({
			tsConfigPath: './tsconfig.json',
			entryModule: './src/app/app.module#AppModule',
			sourceMap: true,
		}),
		new CopyWebpackPlugin([{
			from: root('src/assets'),
			to: root('dist/assets')
		}]),
		htmlWebpackPlugin,
		new ScriptExtPlugin({
			defaultAttribute: 'defer'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendors', 'polyfills']
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new ModernizrWebpackPlugin({
			htmlWebpackPlugin: htmlWebpackPlugin,
			filename: 'modernizr-bundle.js',
			options: ['setClasses'],
			// Check node_modules/modernizr/feature-detects/ for structure
			'feature-detects': [
				'css/flexbox',
				// 'video/autoplay',
			],
		})
	],
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'raw-loader'
			},
			{
				test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
				loader: '@ngtools/webpack',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: [
					{
						loader: 'raw-loader',
					},
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: styleOptions
						}
					}
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [
					{
						loader: 'raw-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								'./src/app/style',
								root('./node_modules')
							],
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: styleOptions,
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: [/node_modules/],
				loader: 'file-loader?name=[name].[hash].[ext]?'
			},
		]
	}
};
