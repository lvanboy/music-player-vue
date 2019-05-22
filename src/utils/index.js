import http from './http'

export default {
    //默认发送get请求
    fetchData(url,params={},type="get"){
        return new Promise((resolve,reject)=>{
            if(type.toLowerCase()=='get'){
                //对指定url，发送get请求
                http.get(url,{
                    params:{
                        ...params
                    }
                })
                .then(res=>{
                    resolve(res)
                },err=>{
                    reject(err)
                })
                return ;
            }
            //否则发送post请求
            http.post(url,params)
            .then(res=>{
                resolve(res)
            },err=>{
                reject(err)
            })
            
        })
    },

    //获取特定宽度的图片大小
    getImageByWidth(url,width){
        return `${url}?param=${width}y${width}`
    },

    //获取两个整数
    getRandomInt(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min) + min) //不包括最大值，包含最小值。
    }
}