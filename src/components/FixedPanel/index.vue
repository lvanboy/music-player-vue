<template lang='pug'>
  .full-mask-ref
    .fixed-panel-container
        .cover-w(@click='intoPlay(songId)')
            img(:src='coverImg')
        .song-info-w(@click='intoPlay(songId)')
            .song-name
              span {{songName}}
            .singer
              span {{singers}}
        .play-w(@click='togglePlay')
            span(:class="isPlaying?'icon-zanting':'icon-bofang'")
        .play-list-w
            span.icon-liebiao(@click='toggleSider')
    MusicSider(v-if='isShowSide' @close='isShowSide=false')

</template>

<script>
import { mapState } from "vuex";
import MusicSider from "@/components/MusicSider";
import music from "@/utils/music.js";
export default {
  data() {
    return {
      // playStatusIcon:['icon-zanting','icon-bofang']
      isShowSide: false
    };
  },
  props: {
    ["cover-img"]: {
      type: String,
      default:
        "http://s4.music.126.net/style/web2/img/default/default_album.jpg"
    },
    ["song-name"]: {
      type: String,
      default: ""
    },
    singer: {
      type: Array,
      default: function() {
        return [];
      }
    },
    ["is-playing"]: {
      type: Boolean,
      default: false
    },
    ["song-id"]: {
      type: Number,
      default: null
    }
  },
  methods: {
    intoPlay(id) {
      music.routerPush("/main/play", { id });
    },
    togglePlay() {
      music.togglePlay();
    },
    toggleSider() {
      this.isShowSide = !this.isShowSide;
    }
  },
  computed: {
    singers() {
      let s = "";
      this.singer.map(item => {
        s += item.name + "/";
      });
      
      return s.substring(0, s.length - 1);
    }
  },
  components: {
    MusicSider
  }
};
</script>

<style lang='scss' scoped>
.full-mask-ref {
  position: relative;
  height:100%;
  .fixed-panel-container {
    display: flex;
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    height: px2rem(1rem);
    background: #fff;
    padding: px2rem(0.1rem);
    @include border-1px(#999, top);

    .cover-w {
      flex: 0 0 px2rem(0.8rem);
      height: px2rem(0.8rem);
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    .play-w {
      flex: 0 0 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: px2rem(0.3rem);
    }
    .play-list-w {
      flex: 0 0 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .song-info-w {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: px2rem(0.2rem);
       @include els();
      .song-name {
        height: 50%;
        display: flex;
        align-items: center;
        color: #000;
        span {
          font-size: $fsize_small_m;
         
        }
      }
      .singer {
        display: flex;
        align-items: center;
        height: 50%;

        color: #999;
        span {
          font-size: $fsize_small_s;
          @include els();
        }
      }
    }
  }
}
</style>
