<template lang='pug'>
    .groupsheet-container
        
        router-link.groupsheet-header(to='/main') {{topic_name}}
            span.right-arr.icon-youjiantou
        .content(v-if='sheetList.length')
            router-link.sheet-item(v-for='(item,idx) in sheetList' :key='idx' to='/main' v-if='idx<6')
                .cover
                    img(:src='item.picUrl')
                    .play-count(v-if='item.playcount') 
                        span.icon-erji    {{item.playcount | parseNumber}}
                p.desc {{item.name}}
        Loading(v-else)

</template>

<script>
import Loading from "@/components/Loading";
import axios from "@/utils/";
import API from "@/api/index.js";
export default {
  data() {
    return {
      sheetList: []
    };
  },
  props: {
    //对应api接口中的key
    req_addr_key: {
      type: String,
      default: "RECOMMEND_LIST"
    },
    //请求参数
    req_params: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //主题名称
    topic_name: {
      type: String,
      default: "推荐歌单"
    }
  },
  methods: {
    initSheet() {
      //如果在api.recommend中可以找到此key
      let url = API.recommend[this.req_addr_key];
      if (url) {
        axios.fetchData(url, this.req_params).then(res => {
          this.sheetList = res.data.recommend;
        });
      }
    }
  },
  created() {
    this.initSheet();
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss'>
@import url("//at.alicdn.com/t/font_1155638_4eirx4pdkem.css");
.groupsheet-container {
  //   width: 100%;
  //   box-sizing: border-box;
  padding: $page-padding-lr;
  padding-top: $page-padding-t;
  overflow: hidden;
  .groupsheet-header {
    display: block;
    text-align: left;
    margin-bottom: px2rem(0.3rem);
    font-size: $fsize_small_l;
    font-weight: bold;
    .right-arr {
      font-size: $fsize_small_l;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .sheet-item {
      width: 32.3333%;
      margin-bottom: px2rem(0.4rem);
      .cover {
        width: 100%;
        position: relative;
        border-radius: px2rem(0.1rem);
        overflow: hidden;
        margin-bottom: px2rem(0.1rem);
        img {
          display: block;
          width: 100%;
        }
        .play-count {
          position: absolute;
          top: 0;
          width: 100%;
          height: px2rem(0.5rem);
          background: linegrad(180deg, rgba(0, 0, 0, .5),transparent);
          span {
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
            font-size: $fsize_small_s;
          }
        }
      }
      .desc {
        padding-left: px2rem(0.1rem);
        font-size: $fsize_small_s;
        color: #000;
        text-align: left;
        //设置字符间距
        letter-spacing: px2rem(0.01rem);
      }
    }
  }
}
</style>
