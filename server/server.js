const express = require("express")
const ReactSSR = require("react-dom/server")
const fs = require("fs")
const path = require("path")

const isDev = process.env.NODE_ENV = "development";



const app = express();

if(!isDev){
    const serverEntry = require("../dist/server.entry.js").default;
    app.use("/public",express.static(path.join(__dirname,"../dist")))
    app.get("*",async(req,res,next) =>{
        let template = ""
        await new Promise(function (resolve, reject) {
            fs.readFile(path.join(__dirname,"../dist/index.html"),'utf8',(err, data) => {
                if(err){
                    reject();
                    return console.log(reject)
                }else {
                    template = data;
                    resolve(data)
                }
            })
        })
        const appString = ReactSSR.renderToString(serverEntry);
        template.replace('<!-- app -->',appString)
        res.send(template)
    })
}else{
    const devStatic = require("./util/dev-static");
    devStatic(app)
}






app.listen(3000,function () {
    console.log("服务启动成功")
})

