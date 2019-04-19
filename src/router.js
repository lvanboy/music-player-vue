import Vue from 'vue'
import vueRouter from 'vue-router'

//登陆模块
const Login = ()=> import('./views/Login/')
const Main = ()=> import('./views/main')

Vue.use(vueRouter)


let Router = new vueRouter({
    routes:[
        //登陆路由
        {
            path:'/login',
            name:'login',
            component:Login

        },
        //主页面路由
        {
            path:'/main',
            name:'main',
            component:Main
        }
    ]
})



export default  Router;