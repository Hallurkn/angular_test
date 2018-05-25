const CompressionPlugin = require('compression-webpack-plugin');
/**
 * This is a prod config to be merged with the Client config
 */
module.exports = {
	devtool: '',
	plugins: [
		new CompressionPlugin({
			test: [/\.js/, /\.css/],
			algorithm: 'gzip',
			deleteOriginalAssets: false
		}),
	]
};
