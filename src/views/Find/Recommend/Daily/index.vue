<template lang='pug'>
    .daily-container
        CommonPage(:custBack='true')
            .header-lf(slot='headerlf')
                span.icon-fanhui(@click='back')
                span.title 每日推荐
            .content-slot(slot='content')
                router-link(to='/main').banner
                    img(src='https://s2.music.126.net/style/web2/img/recmd_daily.jpg')
                    span.calender {{new Date().getDate()}}
                    .des
                      span.text 根据你的音乐口味生成，每天6:00更新
                      .recommend-friend(v-if='commonFriend.length')
                        .friend-item
                        span.right-arr.icon-youjiantou
                .vlist(v-if='recommendList.length')
                    //播放全部

                    //歌手可能有多个，直接传入artists，artists中的name表示歌手
                    SheetList(v-for='(item,idx) in recommendList' :key='idx' :name='item.name' :singer='item.ar' :albumName='item.album.name' :avatar='item.album.picUrl' :index='idx' :sid='item.id' @play='play' :isplay='isDailySheet(item.id)')
                Loading(v-else :absolute='true')
          

</template>

<script>
import CommonPage from "@/components/commonPage";
import SheetList from "@/components/SheetList";
import Loading from "@/components/Loading";
import axios from "@/utils/index.js";
import API from "@/api/index.js";
import Music from "@/utils/music.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      commonFriend: [],
      recommendList: [],
      //自定义推荐表单的id为0
      recommendID: 0
    };
  },
  methods: {
    //初始化每日推荐歌曲数据
    initData() {
      axios.fetchData(API.recommend.RECOMMEND_SONG_LIST).then(res => {
        //可以将后端数据的字段，进行一次映射，使用map函数
        //将不同类型的字段统一封装成模板
        this.parseListInfo(res.data.recommend);
        //对象存在localstorage 使用stringify
        let object = JSON.stringify(res.data.recommend);
        localStorage.setItem("recommend", object);
      });
    },

    //保存播放列表相关信息
    async play(index) {
      let data = {
        lists: this.recommendList,
        index: index,
        id: this.recommendID
      };

      Music.saveSheetList(data);
    },
    //当前播放是否是每日推荐歌曲
    isDailySheet(id) {
      return this.playSheetID == 0 && this.musicplayingID == id;
    },
    //每日的歌曲和歌单给的数据是不一样的所以需要改写一下数据格式
    parseListInfo(obj) {
      this.recommendList = obj.map(item => {
        item.ar = item.artists;
        item.al = item.album;
        return item;
      });
    },

    //返回上一级
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState({
      //歌单列表id
      playSheetID: state => state.Music["PLAY_MUSIC_LIST_ID"],
      //正在播放的音乐id
      musicplayingID: state => {
        let music = state.Music;
        if (!music["PLAY_MUSIC_LIST"]) return;
        return music["PLAY_MUSIC_LIST"][music["PLAY_MUSIC_INDEX"]].id;
      }
    })
  },
  components: {
    CommonPage,
    SheetList,
    Loading
  },
  activated() {
    this.initData();
  }
};
</script>

<style lang='scss'>
@import url("//at.alicdn.com/t/font_1155638_egesnk4mttq.css");
@import "@/style/animation.scss";
.header-lf {
  height: 100%;
}
.content-slot {
  .banner {
    position: relative;
    display: block;
    .calender,
    .des {
      position: absolute;
      box-sizing: border-box;
      padding: 0 px2rem(0.3rem);
    }
    img {
      width: 100%;
      vertical-align: bottom;
    }
    .calender {
      top: 5%;
      left: 0;
      font-size: px2rem(1.4rem);
      color: #fff;
    }
    .des {
      display: flex;
      justify-content: space-between;
      width: 100%;
      bottom: 10%;
      text-align: left;

      .text {
        display: flex;
        align-items: center;
        font-size: $fsize_small_s;
        color: #ccc;
      }
      .recommend-friend {
        display: flex;
        justify-content: flex-end;
        position: relative;
        width: 20%;
        .friend-item {
          position: absolute;
          left: 20%;
          top: 50%;
          transform: translateY(-50%);
          width: px2rem(0.5rem);
          height: px2rem(0.5rem);
          border: 1px solid #fff;
          border-radius: 50%;
        }
        .right-arr {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
