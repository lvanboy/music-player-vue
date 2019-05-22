const path = require('path')
//生产环境自动清除console插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(dir){
  return  path.join(__dirname,dir);
}
module.exports = {
    devServer:{
        port:2020,
        open:true,
    },
    css:{
        loaderOptions:{
            sass:{
                //在使用到variable,mixin时，自动引入该文件，注意分号；
                data:`@import "@/style/index.scss";`
            }
        }
    },
    productionSourceMap:false,
    chainWebpack:config=>{
        config.resolve.alias
        //开发环境用vue.esm.js
        //生产环境用vue.runtime.esm.js，比完整版小30%左右，前端性能更优
        .set('vue$','vue/dist/vue.esm.js')
        .set('@',resolve('src'))

    },
    configureWebpack: {
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  warnings: false,
                  drop_console: true, //console
                  drop_debugger: false,
                  pure_funcs: ["console.log"] //移除console
                }
              }
            })
          ]
        }
      },
   
}


