//服务器接口配置文件

const API = {
    //登陆接口
    login:{
        //手机登陆接口
        USER_LOGIN_PHONE:'/login/cellphone',

        //邮箱登陆接口
        USER_LOGIN_EMAIL:'/login',

        //调用此接口 , 可刷新登录状态
        USER_LOGIN_REFREASH:'/login/refresh',

        //登陆状态
        USER_LOGIN_STATUS:'/login/status'
    },

    //推荐页面
    recommend:{
        //首页banner
        BANNER:'/banner',

        //歌单
        SongSheet:'/personalized',

        //推荐歌单
        RECOMMEND_LIST:'/recommend/resource',

        //每日推荐歌曲
        RECOMMEND_SONG_LIST:'/recommend/songs'
    },

    //歌曲相关
    music:{
        //获取歌曲详情
        SONG_DETAIL:'/song/detail',

        //检查歌曲是否可播放
        SONG_CHECK:'/check/music',

        //获取音乐url
        SONG_URL:'/song/url',

        //获取歌词
        SONG_LYRIC:'/lyric'
    }
}

export default API
