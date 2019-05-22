import * as types from '../mutation-types'

let state = {
    //播放的列表集合
    [types.PLAY_MUSIC_LIST]:[],

    //当前音乐播放的索引
    [types.PLAY_MUSIC_INDEX]:0,

    //音乐播放的播放集id
    [types.PLAY_MUSIC_LIST_ID]:null,

    //正在播放音乐播放详情
    [types.MUSIC_PLAYING_DETAIL]:{},

    //音乐播放悬浮面板的显示
    [types.MUSIC_SHOW_FIXED_MENU]:false,

    //是否在播放音乐
    [types.MUSIC_IS_PLAY]:false,

    //音乐总时长
    [types.MUSIC_DURATION_TIME]:0,

    //音乐播放时长
    [types.MUSIC_PLAY_TIME]:0,

    //进度条颜色
    [types.MUSIC_PLAYING_COLOR]:null,

    //歌曲播放类型 auto loop random
    [types.MUSIC_PLAY_TYPE]:0,

    //音乐音量
    [types.MUSIC_VOL]:1,
}

let getters = {
    //获取播放列表集合
    [types.PLAY_MUSIC_LIST_GETTER]:state=>state.PLAY_MUSIC_LIST,
    //获取当前音乐播放索引
    [types.PLAY_MUSIC_INDEX_GETTER]:state=>state.PLAY_MUSIC_INDEX,
    //获取音乐播放集id
    [types.PLAY_MUSIC_LIST_ID_GETTER]:state=>state.PLAY_MUSIC_LIST_ID,
    //获取正在播放音乐详情
    [types.MUSIC_PLAYING_DETAIL_GETTER]:state=>state.MUSIC_PLAYING_DETAIL,
    //获取音乐播放悬浮面板显示状态
    [types.MUSIC_SHOW_FIXED_MENU_GETTER]:state=>state.MUSIC_SHOW_FIXED_MENU,
    //获取音乐播放状态
    [types.MUSIC_IS_PLAY_GETTER]:state=>state.MUSIC_IS_PLAY,
    //获取音乐总时长
    [types.MUSIC_DURATION_TIME_GETTER]:state=>state.MUSIC_DURATION_TIME,
    //获取音乐播放时长
    [types.MUSIC_PLAY_TIME_GETTER]:state=>state.MUSIC_PLAY_TIME,
    //获取近似色
    [types.MUSIC_PLAYING_COLOR_GETTER]:state=>state.MUSIC_PLAYING_COLOR,
    //获取播放类型
    [types.MUSIC_PLAY_TYPE_GETTER]:state=>state.MUSIC_PLAY_TYPE,
    //获取音量
    [types.MUSIC_VOL_GETTER]:state=>state.MUSIC_VOL,
}

let mutations = {
    //设置播放列表集合
    [types.PLAY_MUSIC_LIST_SETTER]:(state,lists)=>{
        state[types.PLAY_MUSIC_LIST] = lists;
    },
    //设置音乐播放索引
    [types.PLAY_MUSIC_INDEX_SETTER]:(state,index)=>{
        state[types.PLAY_MUSIC_INDEX] = index;
    },
    //设置音乐播放集id
    [types.PLAY_MUSIC_LIST_ID_SETTER]:(state,id)=>{
        state[types.PLAY_MUSIC_LIST_ID] = id;
    },
    //设置正在播放音乐详情
    [types.MUSIC_PLAYING_DETAIL_SETTER]:(state,detail)=>{
        state[types.MUSIC_PLAYING_DETAIL] = detail;
    },
    //设置音乐播放悬浮面板显示状态
    [types.MUSIC_SHOW_FIXED_MENU_SETTER]:(state,status)=>{
        state[types.MUSIC_SHOW_FIXED_MENU] = status;
    },
    //设置音乐播放状态
    [types.MUSIC_IS_PLAY_SETTER]:(state,isplay)=>{
        state[types.MUSIC_IS_PLAY] = isplay;
    },
    //设置音乐总时长
    [types.MUSIC_DURATION_TIME_SETTER]:(state,duration)=>{
        state[types.MUSIC_DURATION_TIME] = duration;
    },
    //设置音乐播放时长
    [types.MUSIC_PLAY_TIME_SETTER]:(state,time)=>{
        state[types.MUSIC_PLAY_TIME] = time;
    },
    //设置进度条颜色
    [types.MUSIC_PLAYING_COLOR_SETTER]:(state,color)=>{
        state[types.MUSIC_PLAYING_COLOR] = color;
    },
    //设置播放类型
    [types.MUSIC_PLAY_TYPE_SETTER]:(state,type)=>{
        state[types.MUSIC_PLAY_TYPE] = type;
    },
    //设置音乐音量
    [types.MUSIC_VOL_SETTER]:(state,vol)=>{
        state[types.MUSIC_VOL] = vol;
    }
}

let actions = {
    //提交 音乐播放列表
    [types.PLAY_MUSIC_LIST_SETTER]:({commit},data)=>{
        if(data.id != [types.PLAY_MUSIC_LIST_ID]){
            commit(types.PLAY_MUSIC_LIST_SETTER,data.lists)
            commit(types.PLAY_MUSIC_LIST_ID_SETTER,data.id)
        }
        
        if(data.index>=0){
            commit(types.PLAY_MUSIC_INDEX_SETTER,data.index) 
        }
    },
    //提交音乐播放列表索引
    [types.PLAY_MUSIC_INDEX_SETTER]:({commit},data)=>{
        commit(types.PLAY_MUSIC_INDEX_SETTER,data);
    },
  
    //提交 正在播放音乐详情
    [types.MUSIC_PLAYING_DETAIL_SETTER]:({commit},data)=>{
        commit(types.MUSIC_PLAYING_DETAIL_SETTER,data);
    },
    //提交 音乐悬浮面板状态
    [types.MUSIC_SHOW_FIXED_MENU_SETTER]:({commit},data)=>{
        commit(types.MUSIC_SHOW_FIXED_MENU_SETTER,data);
    },
    //提交音乐播放状态
    [types.MUSIC_IS_PLAY_SETTER]:({commit},data)=>{
        commit(types.MUSIC_IS_PLAY_SETTER,data)
    },
    //提交音乐总时长
    [types.MUSIC_DURATION_TIME_SETTER]:({commit},data)=>{
        commit(types.MUSIC_DURATION_TIME_SETTER,data)
    },
    
    //提交音乐播放时长
    [types.MUSIC_PLAY_TIME_SETTER]:({commit},data)=>{
        commit(types.MUSIC_PLAY_TIME_SETTER,data);
    },

    //提交进度条颜色
    [types.MUSIC_PLAYING_COLOR_SETTER]:({commit},data)=>{
        commit(types.MUSIC_PLAYING_COLOR_SETTER,data);
    },

    //提交播放类型
    [types.MUSIC_PLAY_TYPE_SETTER]:({commit},data)=>{
        commit(types.MUSIC_PLAY_TYPE_SETTER,data);
    },

    //提交音乐音量
    [types.MUSIC_VOL_SETTER]:({commit},data)=>{
        commit(types.MUSIC_VOL_SETTER,data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}

