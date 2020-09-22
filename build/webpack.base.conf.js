
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: ['./src/index.js'],
	devtool: 'inline-source-map',
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