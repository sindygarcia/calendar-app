module.exports = {
	entry: "./src/index.js",
	output:{
		path: "/public",
		filename: "main.js"
	},
	devServer: {
		inline: true,
		contentBase: "./public",
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				loader: ['style-loader', 'css-loader','sass-loader']
			}
		]
	}
}