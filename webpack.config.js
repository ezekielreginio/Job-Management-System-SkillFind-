const path = require('path') // from django.contrib import path,include

module.exports = {
    mode : "development",
    entry : './src/index.js',
    output: {
        filename : 'bundle.js',
        path: path.resolve(__dirname, 'public_html/static/js')
    },
    module:{
        rules: [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader: "babel-loader"
                }
            }
        ]
    },
    
    devtool: "source-map",

    devServer: {
        contentBase: './public_html'
    }
}