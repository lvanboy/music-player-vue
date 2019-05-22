import Vue from 'vue'
import vueRouter from 'vue-router'
import { finished } from 'stream';
import { readlink } from 'fs';

//登陆模块,异步按需加载
const Login = ()=> import('./views/Login/')
const LoginWay = ()=>import('./views/Login/loginWay.vue')

//主页面模块
const Main = ()=> import('./views/main')

//主页面下的发现模块入口
const Find = ()=> import('./views/Find')

//主页面下的我的模块人口
const Mine = ()=>import('./views/Mine')

//主页面下的视频模块入口
const Video = ()=>import('./views/Video')

//主页下的菜单模块入口
const Menu = ()=>import('./views/Menu')

//主页下的搜索模块入口
const Search = ()=>import('./views/Search')

//发现模块下的推荐模块
const Recommend = ()=>import('./views/Find/Recommend')

//推荐下的私人fm模块
const FM = () => import('./views/Find/Recommend/FM')

//推荐下的每日推荐模块
const Daily = ()=>import('./views/Find/Recommend/Daily')

//推荐下的歌单模块
const Sheet = ()=>import('./views/Find/Recommend/Sheet')

//推荐下的排行榜模块
const Rank = ()=> import('./views/Find/Recommend/Rank')

//发现模块下的朋友模块
const Friend = ()=> import('./views/Find/Friend')

//发现模块下的电台模块
const Radio = ()=>import('./views/Find/Radio')

//音乐播放详情
const Play = ()=>import('./views/Play')

Vue.use(vueRouter)


let Router = new vueRouter({
    mode:'history',
    routes:[
        //默认根路由显示main主页面路由
        {
            path:'/',
            redirect:'/main'
        }
        ,
        //登陆路由
        {
            path:'/login',
            name:'login',
            component:Login,
            children:[
                {
                    path:':type',
                    name:'type',
                    component:LoginWay
                }
            ]

        },
        
        //主页面路由
        {
            path:'/main',
            name:'main',
            redirect:'/main/find',
            component:Main,
            children:[
                {
                    //发现
                    path:'find',
                    name:'find',
                    redirect:'/main/find/recommend',
                    component:Find,
                    children:[
                        {   
                            //推荐
                            path:'recommend',
                            name:'recommend',
                            component:Recommend,
                            meta:{
                                keepAlive:true,
                                transition:'fade-right'
                            }
                        },
                        {
                            //朋友
                            path:'friend',
                            name:'friend',
                            component:Friend,
                            meta:{
                                transition:'',
                                keepAlive:true,
                            }
                        },
                        {
                            //电台
                            path:'radio',
                            name:'radio',
                            component:Radio,
                            meta:{
                                transition:'fade-left',
                                keepAlive:true,
                            }
                        }
                    ]
                },
                //我的
                {
                    path:'mine',
                    name:'mine',
                    component:Mine ,
                    meta:{
                        transition:'fade-right'
                    }
                },
                //视频
                {
                    path:'video',
                    name:'video',
                    component:Video,
                    meta:{
                        transition:'fade-left'
                    }
                },
                //菜单
                {
                    path:'menu',
                    name:'menu',
                    component:Menu ,
                    meta:{
                        transition:'fade-right'
                    }
                },
                //搜索
                {
                    path:'search',
                    name:'search',
                    component:Search,
                    meta:{
                        transition:'fade-left'
                    }
                },
                //私人fm
                {
                    path:'fm',
                    name:'fm',
                    component:FM ,
                    meta:{
                        transition:'fade'
                    }
                },
                //每日推荐
                {
                    path:'daily',
                    name:'daily',
                    component:Daily ,
                    meta:{
                        transition:'sider-top',
                        keepAlive:true,
                    }
                },
                //歌单
                {
                    path:'songsheet',
                    name:'songsheet',
                    component:Sheet ,
                    meta:{
                        transition:'fade'
                    }
                },
                //排行榜
                {
                    path:'rank',
                    name:'rank',
                    component:Rank ,
                    meta:{
                        transition:'fade'
                    }
                },
                //音乐播放详情页
                {
                    path:'play',
                    name:'play',
                    component:Play,
                    meta:{
                        transition:'sider-left',
                        keepAlive:true,
                        nopanel:true,
                    }
                }
            ]
        }
    ],
    linkActiveClass:'',
    scrollBehavior(to,from,savedPostion){
        if(savedPostion){
            //返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
            //savedPosition 一直返回时{x:0,y:0}
     
            return savedPostion;
        }else{
            let body = document.getElementById('auto-body');
            if(from.meta.keepAlive&&body){
                from.meta.savedPostion = body.scrollTop;
            }
            return {x:0,y:from.meta.savedPostion||0}
        }
    }
})



export default  Router;