
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const config = {
	plugins: [
	]
}

module.exports = merge({}, baseWebpackConfig, config);