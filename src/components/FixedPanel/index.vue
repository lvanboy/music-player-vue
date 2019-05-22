<template lang='pug'>
    .fixed-panel-container
        .cover-w(@click='intoPlay(songId)')
            img(:src='coverImg')
        .song-info-w(@click='intoPlay(songId)')
            .song-name {{songName}}
            .singer {{singers}}
        .play-w(@click='togglePlay')
            span(:class="isPlaying?'icon-zanting':'icon-bofang'")
        .play-list-w
            span.icon-liebiao

</template>

<script>
import { mapState } from "vuex";
import music from '@/utils/music.js'
export default {
  data() {
    return {
      // playStatusIcon:['icon-zanting','icon-bofang']
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
    ['song-id']:{
        type:Number,
        default:null
    }

  },
  methods:{
      intoPlay(id){
          music.routerPush('/main/play',{id});
      },
      togglePlay(){
          music.togglePlay()
      }
  },
  computed: {
    singers() {
      let s = "";
      this.singer.map(item => {
        s += item.name + "/";
      });
      s.substring(0, s.length - 2);
      return s;
    }
  }
};
</script>

<style lang='scss' scoped>
.fixed-panel-container{
    display: flex;
    position: fixed;
    z-index: 999;
    bottom: 0;
    width:100%;
    box-sizing: border-box;
    height:px2rem(1rem);
    background: #fff;
    padding:px2rem(.1rem);
    @include border-1px(#999,top);

    .cover-w{
        flex:0 0 px2rem(.8rem);
        height:px2rem(.8rem);
        overflow: hidden;
        border-radius: 50%;
        img{
            width:100%;
        }
        
    }
    .play-w{
        flex:0 0 10%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .play-list-w{
        flex:0 0 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .song-info-w{
        flex:1 1 auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-left: px2rem(.2rem);
        .song-name{
            height: 50%;
            display: flex;
            align-items: center;
            font-size: $fsize_small_m;
            color:#000;
        }
        .singer{
            display: flex;
            align-items: center;
            height:50%;
            font-size:  $fsize_small_s;
            color:#999;
        }
    }
}

</style>
