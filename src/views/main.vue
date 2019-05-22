<template lang='pug'>
    .main
        audio(ref='musicAudio' :src="musicPlayingDetail&&musicPlayingDetail.id?`https://music.163.com/song/media/outer/url?id=${musicPlayingDetail.id}.mp3` :'' " id='musicAudio')
        //menu侧谈菜单入口
        //主导航
        Nav(Navtype='icon' :NavInfo='navInfo' class='adjust')
        Panel(v-if='musicPlayingDetail&&musicPlayingDetail.id&&!$route.meta.nopanel' :is-playing='isPlaying' :cover-img='musicPlayingDetail.al.picUrl' :song-name='musicPlayingDetail.name' :singer='musicPlayingDetail.ar' :song-id='musicPlayingDetail.id')
        transition(:name='$route.meta.transition' )
            //子导航出口
            //<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
            keep-alive
              router-view(v-if='$route.meta.keepAlive' class='model-view')
        transition(:name='$route.meta.transition')
            router-view(v-if='!$route.meta.keepAlive')
        
</template>

<script>
import Nav from "@/components/Nav/";
import Panel from '@/components/FixedPanel/'
import music from "@/utils/music.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //路由信息
      navInfo: [
        {
          label: "菜单",
          url: "/main/menu",
          icon: "icon-caidan",
          pos: "left",
          color: "#fff"
        },
        { label: "我的", url: "/main/mine", icon: "icon-yinle-" },
        { label: "音乐", url: "/main/find", icon: "icon-vynil" },
        { label: "视频", url: "/main/video", icon: "icon-shipin1" },
        {
          label: "搜索",
          url: "/main/search",
          icon: "icon-sousuo1",
          pos: "right",
          color: "#fff"
        }
      ]
    };
  },
  components: {
    Nav,
    Panel
  },
  computed: {
    ...mapState({
      musicPlayingDetail: state => state.Music["MUSIC_PLAYING_DETAIL"],
      isPlaying:state=>state.Music['MUSIC_IS_PLAY']
    })
  },
  watch: {
    //基于路由变化的过度
    $route(to, from) {
      if (to.name == "recommend" && from.name == "mine") {
        to.meta.transition = "fade-left";
      } else if (to.name == "recommend" && from.name == "video") {
        to.meta.transition = "fade-right";
      }
    },
    //基于路由深度的，添加相应的动画
    // $route: function(to, from) {
    //   //添加路由切换过渡动画
    //   const toDepth = to.path.split("/").length;
    //   const fromDepth = from.path.split("/").length;
    //   this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    // }
  },
  mounted() {
    music.initAudioEvent(this.$refs.musicAudio);
  }
};
</script>

<style lang='scss'>
@import "@/style/animation.scss";
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .model-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
