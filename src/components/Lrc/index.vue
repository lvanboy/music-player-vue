<template lang='pug'>
    .lrc-container
        .lrc-display(v-if='lrcCode=="1"&&lrcList.length' ref='lrc-display' )
            .lrc-item(v-for='(item,idx) in lrcList' :key='idx' :class="activeIndex-1==idx?'active':''") {{item.lrc}} 
        .lrc-tips(v-if='lrcCode=="0"') 歌词加载中，请稍等...
        .lrc-tips(v-if='lrcCode=="2"') 纯音乐，请欣赏
        .lrc-tips(v-if='lrcCode=="3"') 暂无歌词
</template>

<script>
import axios from "@/utils/index.js";
import API from "@/api/index.js";
import music from "@/utils/music.js";
//question 
// 同一首歌，返回点击反面，data的数据就会初始化，导致歌词滚动距离出现不断初始化的现象，
export default {
  data() {
    return {
      //0 加载中 1有歌词 2 纯音乐 3获取不到歌词
      lrcCode: 0,
      //存放获取的歌词
      lrcList: [],
      //存放歌词dom
      domList: [],
  
    };
  },
  props: {
    songID: {
      type: Number,
      default: 0
    },
    curTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    //初始化歌词
    initLrc() {
      //从API获取歌词
      let res = null;

      axios.fetchData(API.music.SONG_LYRIC, { id: this.songID }).then(
        res => {
          //判断获取歌词类型的几种情况
          if (res.data.lrc.lyric) {
            let rawLrc = res.data.lrc.lyric;
            this.lrcCode = 1;
            //解析歌词
            this.lrcList = music.parseLrc(rawLrc);
          } else {
            this.lrcCode = 3;
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    Scroll() {
      //点击进入歌词，dom元素无法获取。
      // let lrc = this.$refs["lrc-display"];
     
      if(this.domList&&this.domList[this.activeIndex]){
        
        const distanceTop = 200;
        let offsetTop = distanceTop - this.domList[this.activeIndex].offsetTop ;
        let lrc = this.$refs['lrc-display'];
        if(lrc){
          lrc.style.transform = `translate(0,${offsetTop}px)`
        }
      }
    },
  },
  computed: {
    activeIndex: function() {
      let i;
      for (i = 0; i < this.lrcList.length; i++) {
        if (this.curTime <= this.lrcList[i].time) {
          break;
        }
      }
      return i;
    }
  },
  watch: {
    songID: {
      immediate: true,
      handler: function(val, oldval) {
        this.initLrc();
      }
    },
    activeIndex() {
      this.Scroll();
    }
  },
  mounted() {
    //document.querySelector()  获取的是NodeList 动态添加的dom，无法获取。不随文档的更新发生变化。
    this.domList = document.getElementsByClassName('lrc-item')
    this.Scroll();

  }
};
</script>

<style lang='scss'>
.lrc-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .lrc-display {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    .lrc-item {
      color: #dad9d9;
      font-size: $fsize_small_m;
      line-height: 2.5;
      opacity: .8;
      &.active {
        opacity: 1;
        color: #fff;
      }
    }
  }
  .lrc-tips {
    color: #fff;
    font-size: $fsize_auto_s;
  }
}
</style>
