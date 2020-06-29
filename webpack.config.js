
const path = require('path');
const OUTPUT_DIR = path.join(__dirname, 'public/javascripts');


module.exports = {
	mode: "development",
	entry: {
		'App': './frontend/App.js',
	},
	output: {
		path: OUTPUT_DIR,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			}
		]
	}
};
