import "@babel/polyfill"
import React from "react"
import ReactDom from "react-dom"
import {AppContainer } from "react-hot-loader"
import App from "./Home"


const root = document.getElementById("root")
const render = Component =>{
    ReactDom.hydrate(<AppContainer>
        <Component/>
    </AppContainer>,root)
}

render(App)

if(module.hot){
    module.hot.accept("./Home.js",function () {
      const NextApp = require("./Home").default
        console.log(111,NextApp)
       render(NextApp)
   })


}