import axios from 'axios'
import MusicApp from '../main'

//创建axios实例

let http = axios.create({
    //请求地址的相对路径
    baseURL:'http://localhost:3000',
    //表示跨域请求时是否需要使用凭证
    //携带浏览器cookie发送请求
    withCredentials:true,
    //最大请求时间10秒
    timeout:10000,
    //请求参数
    params:{
        // 不缓存数据极容易引起网易服务器高频ip错误
        // ts:new Date().getTime()
    }, 

})

// 添加请求拦截器
http.interceptors.request.use( (config) =>{
    // 在发送请求之前做些什么
    return config;
  }, (error) =>{
    // 对请求错误做些什么
    console.log('请求拦截器')
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use( (response) =>{
    // 对响应数据做点什么 
    if(response.status == 200){
        return Promise.resolve(response)
    }
    let msg = response.data.msg?response.data.msg:'数据请求报错'
    MusicApp.$msg('拦截器中的消息',msg)  

    return Promise.reject(response.status)
   
  }, (err)=> {
    // 对响应错误做点什么
    console.log('响应拦截器报错',err.response)
    return Promise.reject(err);
});

export default http;
