import router from '@/router.js'
import store from '@/store'
import API from '@/api'
import axios from '@/utils/'
import Vibrant from 'node-vibrant'
import App from '@/main.js'



const Music = {
    //音频dom
    audioEle: '',


    //播放音乐
    playMusic() {
        this.audioEle.play()
    },

    //暂停音乐
    pauseMusic() {
        this.audioEle.pause();
    },

    //暂停/播放
    togglePlay() {

        let isplaying = store.getters.MUSIC_IS_PLAY_GETTER;
        if (isplaying) {
            this.pauseMusic()
        } else {
            this.playMusic()
        }
    },

    //下一曲/上一曲
    playNextOrPrev(type) {
        //当前播放列表总数
        let listsCount = store.getters.PLAY_MUSIC_LIST_GETTER.length;

        //当前播放索引
        let index = store.getters.PLAY_MUSIC_INDEX_GETTER;
        //当前播放模式
        let playType = store.getters.MUSIC_PLAY_TYPE_GETTER;

        // 0 auto 1 loop 2 random
        switch (playType) {
            case 0:
                if (type == 'next') {
                    if (index >= listsCount - 1) {
                        //播放下一曲
                        this.PlayByIndex(0);
                        return;
                    }
                    //回到第一首
                    this.PlayByIndex(index + 1);

                } else {
                    if (index <= 0) {
                        this.PlayByIndex(listsCount - 1);
                        return;
                    }
                    this.PlayByIndex(index - 1)
                }
                break;
            case 1:
                //固定播放列表索引
                this.audioEle.load();
                this.audioEle.play();
                break;
            case 2:
                //随机生成播放列表索引
                this.PlayByIndex(axios.getRandomInt(0, listsCount));
                break;
        }

    },

    //设置音量
    setVol(vol) {
        console.log(vol)
        this.audioEle.volume = vol / 100;
        store.dispatch('MUSIC_VOL_SETTER', vol / 100);
    },


    //初始化音乐
    async initMusic(id) {
        if (location.href.includes('/main/play')) {
            router.replace({
                path: '/main/play',
                query: {
                    id
                }
            })
        }
        this.checkMusic(id).then(async (res) => {

            //获取当前歌单下根据歌曲id获取歌曲详细信息保存到store全局
            let detailRes = await axios.fetchData(API.music.SONG_DETAIL, { ids: id })
            //判断播放列表集合中是否存在歌单或者歌曲(vuex刷新状态丢失)
            if (!store.getters.PLAY_MUSIC_LIST_GETTER.length) {
                //从本地取推荐歌曲数据
                let recommend = localStorage.getItem('recommend')
                //经过stringify，get需要parse以下
                let obj = JSON.parse(recommend);
                if (!obj) console.log('未能获取本地保存推荐歌曲')
                //forEach 无论必定返回undefined
                let index = -1;
                obj.forEach((song, inx) => {
                    if (song.id == id) {
                        index = inx;
                    }
                    //未在推荐歌单找到当前歌曲
                    return 0;
                })

                store.dispatch('PLAY_MUSIC_LIST_SETTER', {
                    index,
                    id,
                    lists: obj,
                })
            }
            //设置进度条颜色
            this.setProgressColor(detailRes.data.songs[0].al.picUrl);
            store.dispatch("MUSIC_PLAYING_DETAIL_SETTER", detailRes.data.songs[0]);
            //播放音乐
            App.$nextTick(() => {
                //dom更新了
                this.playMusic();
            })

        }, err => {
            App.$msg('未获得收听资格，购买VIP收听完整版');
            setTimeout(() => {
                router.go(-1);
            }, 3000)

            // console.log(err);
        })
    },

    //根据索引播放
    async PlayByIndex(index) {
        let playId = store.getters.PLAY_MUSIC_LIST_GETTER[index].id;
        store.dispatch('PLAY_MUSIC_INDEX_SETTER', index);
        await this.initMusic(playId)
    },

    //删除列表中歌曲
    remove(index,isplaying){
        let playList = store.getters.PLAY_MUSIC_LIST_GETTER;
        playList.splice(index,1)
        let data = {
            index:-1,
            lists:playList,
            id:0
        };
        if(isplaying){
            this.PlayByIndex(index+1);
        }
        store.dispatch('PLAY_MUSIC_LIST_SETTER',data);
        
    },

    //清除播放列表歌曲
    cleanPlayList(){
        let data = {
            index:0,
            lists:[],
            id:null,
        }
        store.dispatch('PLAY_MUSIC_LIST_SETTER',data);
        store.dispatch('MUSIC_PLAYING_DETAIL_SETTER',{});
        router.replace({
            path:'/main'
        })
    },

    //检查音乐连接是否可用
    checkMusic(id) {

        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios.fetchData(API.music.SONG_CHECK, { id })

                resolve(res);
            } catch (e) {

                reject(e);
            }
        })
    },

    /**
    * 播放专辑歌曲操作
    * @params{Object} data  相关数据
    * data.lists   音乐播放集合
    * data.id      播放歌单id
    * data.index   播放的索引
    */
    saveSheetList(data) {
        let { lists, index } = data;
        //更改播放集合数据
        store.dispatch('PLAY_MUSIC_LIST_SETTER', data);
        let id =lists[index].id;
        //播放
        this.PlayByIndex(index);
        //跳转播放详情页
        // router.push({
        //     path: '/main/play',
        //     query: {
        //         id: lists[index].id
        //     }
        // })
    },
    routerPush(path,query){
        router.push({
            path,
            query
        })
    },
    //音频事件初始化
    initAudioEvent(ele) {
        this.audioEle = ele;
        //播放事件
        ele.onplaying = () => {
            store.dispatch('MUSIC_IS_PLAY_SETTER', true)
        }
        //暂停事件
        ele.onpause = () => {
            store.dispatch('MUSIC_IS_PLAY_SETTER', false)
        }
        //播放结束事件
        ele.onended = () => {
            //播放下一首
            this.playNextOrPrev('next')
        }
        //音频初始化，获取总时长
        ele.onloadedmetadata = () => {
            //提交音乐总时长
            store.dispatch('MUSIC_DURATION_TIME_SETTER', Math.floor(ele.duration))
        }

        //播放位置发生更改，获取当前播放进度
        ele.ontimeupdate = () => {
            //提交音乐当前播放时长
            store.dispatch('MUSIC_PLAY_TIME_SETTER', Math.floor(ele.currentTime))
        }
    },
    //从图片中获取近似色用于设置进度条颜色
    setProgressColor(pic) {
        Vibrant.from(pic).getPalette().then((palette) => {
            let color = `rgba(${palette.LightMuted.r},${palette.LightMuted.g},${palette.LightMuted.b},.9)`;
            store.dispatch('MUSIC_PLAYING_COLOR_SETTER', color);
        })
    },

    //设置播放类型
    setPlayType() {
        const type = ['列表顺序播放', '单曲循环', '随机播放']
        let index = store.getters.MUSIC_PLAY_TYPE_GETTER;

        index = (index + 1) % type.length;
        App.$msg(type[index]);
        store.dispatch('MUSIC_PLAY_TYPE_SETTER', index);
    },

    //解析歌词 为数组格式
    parseLrc(lrc) {
        if (lrc == '') { console.log('原歌词为空'); return; }
        let lrcObj = [];
        //正则提取时间轴 和 歌词文本
        let lrcArr = lrc.split('\n');
        let re = /\[(.*)?\](.*)?/
        lrcArr.forEach((line) => {
            let res = line.match(re);
            if (res) {
                let timemark = res[1];
                let text = ''
                if (!res[2]) {
                    return;
                } else {
                    text = res[2];
                }
                let min = Number(timemark.split(':')[0]);
                let sec = Math.floor(Number(timemark.split(':')[1]));

                let clock = min * 60 + sec;
                lrcObj.push({
                    time: clock,
                    lrc: text
                })

            }
        })
        return lrcObj;
    }
}


export default Music




