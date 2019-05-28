
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'storage.js',
		library: 'pz_storage',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: __dirname + 'node_modules',
				include: __dirname + 'src',
				loader: 'babel-loader'
			}
		]
	}
}