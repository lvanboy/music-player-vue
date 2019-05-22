<template lang='pug'>
    .sheet-list-container(:id='sid')
        .sheet-left(@click='play(index,sid)')
            .cover-wrapper
                //请求小图片，节省带宽
                img(v-imgsize="{url:avatar,w:120}" v-if='!isplay')
                span.icon-laba(v-else)
            .song-info
                h3 {{name}}
                span {{singers}} - {{albumName}}
        .sheet-right
            span.icon-shipin(v-if='mv')
            span.icon-gengduo
</template>

<script>
import axios from '@/utils/index.js';
import API from '@/api/index.js';
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    singer: {
      type: Array,
      default: function() {
        return [];
      }
    },
    albumName: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    sid: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ""
    },
    mv: {
      type: Boolean,
      default: false
    },
    isplay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    play(index) {
      this.$emit("play", index);

    },
 
  },
  computed: {
    singers() {
      let str = "";
      this.singer.forEach((item, idx) => {
        str += item.name + " ";
      });
      return str;
    }
  }
};
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1155638_vh312naatba.css");
.sheet-list-container {
  position: relative;
  display: flex;
  padding: px2rem(0.2rem);

  .sheet-left {
    display: flex;
    width:80%;
    flex: 0 0 80%;
    justify-content: flex-start;
    align-items: center;
    .cover-wrapper {
      width: px2rem(0.8rem);
      height: px2rem(0.8rem);
      line-height: px2rem(0.8rem);
      text-align: center;
      border-radius: px2rem(0.1rem);
      margin-right: px2rem(0.1rem);
      overflow: hidden;
      img {
        vertical-align: bottom;
        //避免图片底部产生空隙
        // display: block;
        width: 100%;
      }
      .icon-laba {
        color: $primary_color;
        font-weight: 600;
      }
    }
    .song-info {
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      h3 {
        color: #3b3b3b;
        font-size: $fsize_small_l;
        font-weight: 600;
        margin-bottom: px2rem(0.1rem);
        @include els();
      }
      span {
        color: #8a8a8a;
        font-size: $fsize_small_s;
        @include els(); 
      }
    }
  }
  .sheet-right {
    display: flex;
    width:20%;
    flex: 0 0 20%;
    justify-content: flex-end;
    align-items: center;
    color: #b6b6b6;
 
    span + span {
      margin-left: px2rem(0.2rem);
    }
  }
}
</style>
