const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

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
	},

	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['./dist']),
	]
}