const path = require("path")
module.exports = {
    target: "node",
    entry: {
        server:path.join(__dirname,"../client/server.entry.js")
    },
    output: {
        filename: "server.entry.js",
        path: path.join(__dirname,"../dist"),
        publicPath: "",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [{
            test:/.js$/,
            exclude:/node_modules/,
            loader: "babel-loader"
        }]
    }

}