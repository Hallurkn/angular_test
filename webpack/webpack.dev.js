const webpack = require('webpack');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

/**
 * This is a prod config to be merged with the Client config
 */
module.exports = {
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new SimpleProgressWebpackPlugin({
			format: 'compact',
		}),
	]
};
