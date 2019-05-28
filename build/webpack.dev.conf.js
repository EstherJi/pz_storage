
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const config = {
	plugins: [
		new HtmlWebpackPlugin({
			title: 'storage test',
			filename: 'index.html',
			template: 'test/index.html'
		})
	]
}

module.exports = merge({}, baseWebpackConfig, config);