const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: "source-map",

	entry: {
		'index': './src/index.js',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			}
		]
	}
}