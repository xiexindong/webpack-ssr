let path = require("path")
const  {CleanWebpackPlugin} = require("clean-webpack-plugin")
const  HtmlWebpackPlugin  = require("html-webpack-plugin")
const webpack = require("webpack")

var isDEV = process.env.NODE_ENV = "development";



const config = {
    mode: "development",
    entry: {
        app:path.join(__dirname,"../clent/App.js")
    },

    devtool: "cheap-module-eval-source-map",
    output: {
        path: path.resolve(__dirname,"../dist"),
        filename: "[name].[hash:8].js",
        publicPath: "/public/"
    },
    module: {
        rules: [{
            test:/.js$/,
            exclude:/node_modules/,
            loader: "babel-loader"

        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"list2",
            template:path.join(__dirname,"../client/index.html"),
            filename:"index.html"
        })


    ]
}


if(isDEV){
    config.entry = {
        app:[
            "react-hot-loader/patch",
            path.join(__dirname,"../client/App.js"),
        ]
    },
    config.devServer = {
        host:"0.0.0.0",
        port:8888,
        contentBase:path.join(__dirname,"../dist"),
        hot:true,
        overlay:{
            errors:true,
            warnings:true
        },
        publicPath:"/public/",
        historyApiFallback:{
            rewrites:[
                {from:/^\//,to:"/public/index.html"}
            ]
        }
    },
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config