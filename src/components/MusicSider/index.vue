<template lang='pug'>
    .music-sider-container
            .music-sider-mask(@click="close")
            .music-sider(:style="{height:_height}")
                .music-sider-header
                    .music-sider-header-lt(@click='toggleMusicType')
                        slot(name='music-sider-hlt') 
                    .music-sider-header-rt
                        slot(name='music-sider-hrt')
                .music-sider-content
                    MusicList(v-for='(item,idx) in MusicPlayList' :key='idx' :songName='item.name' :singers='item.artists' :songID='item.id' :index='idx' :isPlaying='isplaying(item.id)' @play='playMusic' @remove='removeMusic')
</template>

<script>
import MusicList from "@/components/MusicList";
import music from "@/utils/music.js";
import { mapState } from "vuex";
export default {
  props: {
    _height: {
      type: String,
      default: "60%"
    }
  },
  methods: {
    //如何保留列表中之前滚动的位置
    //如何保留前一个页面的滚动位置
    //弹出动画，为什么没有过渡效果？
    close() {
      this.$emit("close");
    },
    isplaying(id) {
      return id == this.MuiscPlaying.id;
    },
    playMusic(index) {
      music.PlayByIndex(index);
    },
    removeMusic(index, isPlaying) {
      music.remove(index, isPlaying);
    },
    toggleMusicType(){
      music.setPlayType();
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapState({
      MusicPlayList: state => state.Music["PLAY_MUSIC_LIST"],
      MuiscPlaying: state =>
        state.Music["PLAY_MUSIC_LIST"][state.Music["PLAY_MUSIC_INDEX"]]
    })
  }
};
</script>

<style lang='scss' scoped>
@import "@/style/animation.scss";
.music-sider-container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
   z-index: 999;
  .music-sider-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  
  }
  .music-sider {
    position: absolute;
    bottom: 0;
 
    width: 100%;
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    .music-sider-header {
      // padding: 0 px2rem(0.2rem);
      position: relative;
      display: flex;
      flex: 0 0 px2rem(1rem);
      justify-content: space-between;
      align-content: center;
      @include border-1px(#ccc);
      .music-sider-header-lt {
        flex: 0 0 35%;

      }
      .music-sider-header-rt {
        flex: 0 0 35%;
      }
    }
    .music-sider-content {
      //-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.
      flex: 1 1 auto;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
    }
  }
}
</style>
