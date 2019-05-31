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
    },

    //搜索
    search:{
        //热搜
        SEARCH_HOT:'/search/hot',
        //搜索推荐
        /*
        必选参数 : keywords : 关键词
        可选参数 : type : 如果传 'mobile' 则返回移动端数据
        */
        SEARCH_SUGGEST:'/search/suggest',
        //搜索结果
        /*
        必选参数 : keywords : 关键词

        可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

        type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        */
        SEARCH:'/search'
        
    },


    //歌单
    songlist:{
        //热门歌单分类名称
        HOTNAME:'/playlist/hot',
        //全部歌单分类名称
        CATEGONAME:'/playlist/catlist',
        /*
        获取歌单信息
        可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
        */
       CATEINFO:'/top/playlist',
       //精品歌单信息
       /*
        limit: 取出歌单数量 , 默认为 20
        before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
       */
       CATEINFOHIGH:'/top/playlist/highquality',
       //歌单详情
       DETAIL:'/playlist/detail'


    },


    storage:{
        SEARCH_RECORD:'keywords'
    }
}

export default API
