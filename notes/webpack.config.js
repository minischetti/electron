const path = require('path');

module.exports = {
	mode: 'development',
	resolve: {
		fallback: {
			path: require.resolve("path-browserify"),
			fs: false,
		},
	},
	entry: {
		renderer: './renderer.js',
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
		'markdown.worker': 'monaco-editor/esm/vs/basic-languages/markdown/markdown.js'
	},
	output: {
		globalObject: 'self',
		filename: '[name].out.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	}
};