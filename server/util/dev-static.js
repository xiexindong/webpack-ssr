const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path")
const fs = require("fs")
const serverConfig = require("../../build/webpack.config.server");

const getTemplate = () =>{
     return new Promise((resolve,reject)=>{
         axios.get("localhost:8888/public/index.html").then(res=>{
             console.log("res",res)
             resolve(res)
         }).catch(err=>{
                console.log(err)
          })
     })
}

const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    // const m = getModuleFromString(bundle, 'server-entry.js')
    const m = new Module();

    m._compile(bundle);
    serverBundle = m.default

})


module.exports = (app)=>{
    app.get("*",function (req,res) {
        getTemplate().then(template => {
            const content = ReactDOMServer.renderToString(serverBundle);
            res.send(template.replace("<!-- app -->",content))
        })


    })
}