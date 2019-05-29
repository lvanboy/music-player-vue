<template lang='pug'>
    .play-container(v-if='currentMusicInfo&&currentMusicInfo.al')
        .blur(:style="{backgroundImage: `url(${initBg()})`}" :class='{"darken":isShowLRC}') 
        .auto-header
          .left
            span.icon-fanhui(@click='back')
          .title
            .sname {{currentMusicInfo.name}}
            .singer
              span.name {{getSingers(currentMusicInfo.ar)}}
              span.icon-youjiantou
          .right
            span.icon-fenxiang
        .content(v-cloak)
            .cover(v-show='!isShowLRC' )
              .cd-wp(@click='toggleContent')
                .cd(:class="[isplaying?'':'rotate-pause','rotate']" )
                  img(v-imgsize='{url:currentMusicInfo.al.picUrl,w:300}' ) 
              .music-conf
                span.icon-icon-test
                span.icon-xiazai
                span.icon-pinglun
                span.icon-gengduo
            .lrc(v-show='isShowLRC' )
              .vol-area
                //音量进度条
                TouchBar(color='#ccc' :curProgress='musicVol*100' @setMusicProgress='setVol' type='vol')
                  .left(slot='left-sider')
                    span.icon-laba1
              .lrc-area(@click='toggleContent')
                  Lrc(:songID='currentMusicInfo.id' :curTime='currentTime')
            .play-conf
              .play-progress
                TouchBar(@setMusicProgress='setMusicProgress' :curProgress='percent' :color='similarColor' type='progress')
                  .left(slot='left-sider')
                    span {{currentTime | parseMusicTime}}
                  .right(slot='right-sider')
                    span {{durationTime | parseMusicTime}}
              .play-set
                span.playType(@click='setPlayType' :class="playTypeIcon[playTypeIndex]")
                span.icon-shangyiqu101(@click='playPrev')
                span.icon-bofang(@click='togglePlayStatus' v-if="!isplaying")
                span.icon-zanting(@click='togglePlayStatus' v-else)
                span.icon-xiayiqu101(@click='playNext')
                span.icon-liebiao(@click='toggleHistory')
        transition(name='sider-top')
          MusicSider(v-if='showHistory' @close='toggleHistory')
            .sider-lt(slot='music-sider-hlt')
              span.play-icon(:class='playTypeIcon[playTypeIndex]') 
              span.info {{playTypeInfo[playTypeIndex]}} {{`(${playList.length})`}}
            .sider-rt(slot='music-sider-hrt')
              .sider-rt-collect-w
                span.icon-tianjia
                span.info 收藏全部
              .sider-rt-remove-w(@click='showSysInfo=true')
                span.icon-shanchu
        Prompt(v-if='showSysInfo' yes-label='清空' prompt-info='确定要清空播放列表?' @close='showSysInfo=false' @clean='cleanPlayList')
</template>

<script>
import { mapState } from "vuex";
import axios from "@/utils/index.js";
import API from "@/api/index.js";
import TouchBar from "@/components/TouchBar";
import MusicSider from "@/components/MusicSider"
import Lrc from "@/components/Lrc";
import Prompt from '@/components/Prompt/';
import music from "@/utils/music.js";
export default {
  //v-show 通过display 控制样式显示和隐藏
  //v-if  通过删除和添加dom元素 动态添加的样式会丢失。
  data() {
    return {
      isShowLRC: false,
      showSysInfo:false,
      audioEle: null,
      currentT: null,
      showHistory: false,
      playTypeIcon: ["icon-icon--", "icon-danquxunhuan", "icon-icon--1"],
      playTypeInfo:['列表播放','单曲循环','随机播放']
    };
  },
  methods: {
    //如果歌手不止一个,toString()每个歌手默认使用逗号连接的字符串
    getSingers(ar) {
      return ar.map(item => item.name).toString();
    },
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //initBackgroundImage
    initBg(){
      //这个函数会被反复调用。
     return axios.getImageByWidth(this.currentMusicInfo.al.picUrl,300)
    },
    initCoverDisplay(){
      this.isShowLRC = false;
    },
    //展开和关闭侧边栏
    toggleHistory(){
      this.showHistory=!this.showHistory;
    },
    //切换封面和歌词
    toggleContent() {
      this.isShowLRC = !this.isShowLRC;
    },
    //切换播放和暂停
    togglePlayStatus() {
      music.togglePlay();
    },
    //播放上一曲
    playPrev() {
      music.playNextOrPrev("prev");
    },
    //播放下一曲
    playNext() {
      music.playNextOrPrev("next");
    },
    //设置音量
    setVol(perOfVol) {
      music.setVol(perOfVol);
    },
    //清空当前播放列表
    cleanPlayList(){
      music.cleanPlayList();
    },
    //拖动结束，设置播放当前进度
    setMusicProgress(progress) {
      if (this.audioEle.duration) {
        let currentTime = (this.audioEle.duration * progress) / 100;
        this.currentT = this.audioEle.currentTime = currentTime;
      } else {
        this.currentT = 0;
      }
      this.$store.dispatch("MUSIC_PLAY_TIME_SETTER", this.currentT);
    },

    //设置进度条颜色
    setProgressColor(pic) {
      music.setProgressColor(pic);
    },

    //设置歌曲播放类型
    setPlayType() {
      music.setPlayType();
    },

    //初始化音乐，包括检查歌曲id对应的资源是否可用，获取当前音乐详细信息，获取进度条颜色，开始播放音乐
    initMuisc() {
      let id = this.$route.query.id;
      music.initMusic(id);
    }
  },
  computed: {
    ...mapState({
      playList:state=>state.Music['PLAY_MUSIC_LIST'],
      currentMusicInfo: state => state.Music["MUSIC_PLAYING_DETAIL"],
      durationTime: state => state.Music["MUSIC_DURATION_TIME"],
      currentTime: state => state.Music["MUSIC_PLAY_TIME"],
      similarColor: state => state.Music["MUSIC_PLAYING_COLOR"],
      isplaying: state => state.Music["MUSIC_IS_PLAY"],
      playTypeIndex: state => state.Music["MUSIC_PLAY_TYPE"],
      musicVol: state => state.Music["MUSIC_VOL"]
    }),
    percent() {
      if (this.durationTime == 0) {
        return 0;
      }
      return Math.floor((this.currentTime / this.durationTime) * 100);
    }
  },
  components: {
    TouchBar,
    Lrc,
    MusicSider,
    Prompt,
  },

  mounted() {
  },
  activated() {
    this.initCoverDisplay();
    this.initMuisc();
    this.$nextTick(() => {
      this.audioEle = document.querySelector("#musicAudio");
    });
  }
};
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1155638_7qewe3ha5ib.css");
@import "@/style/animation.scss";
[class^="icon-"],
[class*=" icon-"] {
  color: #fff;
  font-size: px2rem(0.5rem);
}
[v-cloak] {
  display: none;
}
.play-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .blur {
    @include blur(26px, auto, center);
  }
  .auto-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: $auto_ht;

    .left {
      flex: 0 0 px2rem(1.2rem);
      .icon-fanhui {
        font-size: px2rem(0.5rem);
        color: #fff;
      }
    }
    .title {
      flex: 1 1 auto;
      text-align: left;
      @include els();
      .sname {
        font-size: $fsize_small_l;
        color: #fff;
      }
      .singer {
        display: flex;
        align-self: center;
        font-size: $fsize_small_s;
        .name {
          font-size: $fsize_small_s;
          color: #aaa;
        }
        .icon-youjiantou {
          color: #aaa;
          font-size: px2rem(0.3rem);
        }
      }
    }
    .right {
      display: flex;
      margin-right: px2rem(0.5rem);
      justify-content: flex-end;
      flex: 0 0 px2rem(2rem);
    }
  }
  .content {
    position: absolute;
    top: $auto_ht;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 px2rem(0.4rem);
    display: flex;
    flex-direction: column;
    .cover,
    .lrc {
      display: flex;
      // justify-content: center;
      flex-direction: column;
      align-items: center;
      flex: 1 1 auto;
    }
    .cover {
      @include border-1px(rgba(166, 166, 166, 0.2), "top");
      .cd-wp {
        display: flex;
        flex: 1 1 auto;
        width: 100%;
        justify-content: center;
        align-items: center;
        .cd {
          width: px2rem(4.5rem);
          height: px2rem(4.5rem);
          overflow: hidden;
          img {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 5px solid rgba(224, 201, 201, 0.3);
            vertical-align: bottom;
          }
        }
      }
      .music-conf {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 0 0 px2rem(1.5rem);
        width: 75%;
      }
    }
    .lrc {
      overflow:hidden;
      .vol-area {
        display: flex;
        width: 95%;
        align-items: center;
        flex: 0 0 px2rem(.8rem);
        .left {
          display: flex;
          flex:0 0 px2rem(.3rem);
          align-content: center;
          justify-content: center;
          .icon-laba1 {
            font-size: $fsize_small_m;
            color: #ccc;
          }
        }
      }
      .lrc-area {
        display: flex;
        justify-content: center;
        width: 100%;
        flex: 1 1 auto;
      }
    }
    .play-conf {
      flex: 0 0 px2rem(2.2rem);
      flex-direction: column;
      .play-progress {
        flex: 0 0 px2rem(0.8rem);
        .left,
        .right {
          display: flex;
          justify-content: center;
          align-items: center;
          // width: px2rem(0.8rem);
          font-size: $fsize_small_s;
          color: #fff;
          opacity: 0.9;
        }
      }
      .play-set {
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .playType {
          display: inline-block;
          width: px2rem(0.6rem);
        }
        .icon-icon--1,
        .icon-liebiao {
          font-size: px2rem(0.6rem);
        }
        .icon-shangyiqu101 {
          font-size: px2rem(0.6rem);
        }
        .icon-liebiao {
          font-size: px2rem(0.4rem);
        }
        .icon-xiayiqu101 {
          font-size: px2rem(0.6rem);
        }
        .icon-bofang,
        .icon-zanting {
          font-size: px2rem(1rem);
        }
      }
    }
   
  }
   .sider-lt{
     width:100%;
     height: 100%;
     display: flex;
     align-items: center;
      .play-icon{
        color:#a9a6a6;
        padding:px2rem(.2rem);
        font-size: $fsize_auto_s;
      }
      .info{
        color:#333;
        font-size: $fsize_small_l;
      }
    }
  .sider-rt{
    display: flex;
    width:100%;
    height:100%;
    .sider-rt-collect-w{
      flex: 0 0 70%;
      display: flex;
      align-items: center;
      .icon-tianjia{
        color:#a9a6a6;
        font-size: $fsize_auto_s;
        padding:px2rem(.1rem);
      }
      .info{
        font-size: $fsize_small_l;
        color:#333;
      }
    }
    .sider-rt-remove-w{
      flex:1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-shanchu{
        color:#a9a6a6;
        font-size: $fsize_auto_s;
      }
    }
  }
}
</style>
