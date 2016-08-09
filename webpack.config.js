var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: SRC_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	module: {
		noParse: /node_modules\/json-schema\/lib\/validate\.js/,
		loaders: [
			{
				test: /\.jsx?/,
				include: SRC_DIR,
				loader: 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};

module.exports = config;
