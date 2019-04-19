//服务器接口配置文件

const API = {
    //登陆接口
    login:{
        //eg /login/cellphone?phone=xxx&password=yyy
        USER_LOGIN_PHONE:'/login/cellphone',
        //eg /login?email=xxx@163.com&password=yyy
        USER_LOGIN_EMAIL:'/login',
        //调用此接口 , 可刷新登录状态
        USER_LOGIN_REFREASH:'/login/refresh',
        //登陆状态
        USER_LOGIN_STATUS:'/login/status'
    }
}

export default API
