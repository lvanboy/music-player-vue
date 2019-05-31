<template lang='pug'>
    .search-container
        //搜索头部，包括搜索框
        .search-header
            .search-header-lt(@click='back')
                span.icon-fanhui
            .search-header-input
                input(type='search' placeholder='我的一个道姑朋友' v-model='keywords' ref='serachRef' @input='getSingleData' autofocus)
                .serach-header-clear(v-if='keywords' @click='clearMsg')
                    span ×
            .search-header-right
                span.icon-weibiaoti2fuzhi12
            //实时搜索结果
            .search-result-list(v-if='single.length')
              .list-header(@click='startSearch(keywords)') 搜索 "{{keywords}}"
              .list-item(v-for="(item,idx) in single" :key='idx' @click='startSearch(item.keyword)')
                .list-lt
                  span.icon-sousuo1
                .list-rt {{item.keyword}}
        .search-type(v-if='isSearch')
          .type-item(v-for="(item,idx) in type" :class="currentType===item.code?'active':''" @click='selectType(item.code)') {{item.name}}
        //搜索内容，包括历史和热搜榜
        .search-content(v-if='!isSearch')
            .search-content-history(v-if='historyKyes.length')
                .search-content-h-title
                    .search-content-h-title-lt
                        h3 历史记录
                    .search-content-h-title-rt
                        span.icon-shanchu(@click='isClearKeyword=true')
                        Prompt(prompt-info='确认清空搜索历史关键字嘛' v-if='isClearKeyword' @close='isClearKeyword=false' @clean='removeKeyword')
                .search-content-h-keys
                    //历史搜索记录
                    .h-keys(v-for='(item,idx) in historyKyes' :key='idx' @click='startSearch(item)') {{item}}
            .search-content-popular
                .serach-content-p-title
                     h3 热搜榜
                .serch-content-p-list(v-if='hotList&&hotList.length')
                    //热搜榜列表
                    .hot-list-item-wp(v-for='(item,idx) in hotList' :key='idx' @click='startSearch(item.first)')
                        .hot-list-wp-lt(:class="idx+1<=3?'active':''") {{idx+1}}
                        .hot-list-wp-rt(v-if='isDes')
                            .hot-list-tp
                                .hot-list-title {{item.first}}
                                .hot-list-play-count 103012
                                .hot-list-icon.icon-hot
                            .hot-list-bt
                        .hot-list-wp-rt-info(v-else)
                            .hot-list-title {{item.first}}
                            .hot-list-play-count 103012
                            .hot-list-icon(:class='item.iconType===1?"icon-hot":""')
                .loading-wp(v-else)
                    Loading      
        .search-results-wp(v-else)
          .single-wp
            .title-wp
              .title-lt
                h3 单曲
              .title-rt
                span.icon-bofang
                span.text 播放全部
            .content-wp(v-if='results.songs&&results.songs.length')
              Single(v-for='(item,idx) in results.songs' :key='idx' :songName='item.name' :songAlias='item.alias' :singer='item.artists' :albumName='item.album.name' :index='idx' :id='item.id' :mvid='item.mvid' @play='play')
            .loading-wp(v-else)
              Loading
</template>

<script>
import Loading from "@/components/Loading/";
import Prompt from '@/components/Prompt/'
import Single from './Single/'
import axios from "@/utils/";
import api from "@/api";
import music from "@/utils/music.js"
export default {
  data() {
    return {
      historyKyes:[],
      hotList: [],
      single: [],
      isDes: false,
      keywords: "",
      //是否进行搜索
      isSearch: false,
      //是否点击清空按钮
      isClearKeyword:false,
      //搜索类型
      type: [
        { name: "综合", code: 0 },
        { name: "单曲", code: 1 },
        { name: "专辑", code: 10 },
        { name: "歌手", code: 100 },
        { name: "歌单", code: 1000 },
        { name: "用户", code: 1002 },
        { name: "MV", code: 1004 },
        { name: "歌词", code: 1006 },
        { name: "电台", code: 1009 },
        { name: "视频", code: 1014 }
      ],
      //当前搜索类型
      currentType: 0,
      limit: 10,
      offset: 0,
      //搜索结果
      results:{},
    };
  },
  methods: {
    back() {
      if(this.$route.query.keywords){
        this.keywords = '';
        this.isSearch = false;
      }
      this.$router.go(-1);
    },
    initHot() {
      //获取热搜榜数据
      axios.fetchData(api.search.SEARCH_HOT).then(
        res => {
          this.hotList = res.data.result.hots;
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取单曲数据
    getSingleData() {
      if (this.keywords.trim().length === 0) {
        this.single = [];
        return;
      }
      setTimeout(() => {
        axios
          .fetchData(api.search.SEARCH_SUGGEST, {
            keywords: this.keywords,
            type: "mobile"
          })
          .then(
            res => {
              this.single = res.data.result.allMatch;
            },
            err => {
              console.log(err);
            }
          );
      }, 500);
    },
    //按类型获取搜索信息
    async getSearchByType(){
      let res;
      if(this.currentType === 0){
        res = await axios.fetchData(api.search.SEARCH_SUGGEST,{
          limit:this.limit,
          offset:this.offset,
          keywords:this.keywords
        })
      }else{
        res = await axios.fetchData(api.search.SEARCH,{
          limit:this.limit,
          offset:this.offset,
          keywords:this.keywords,
          type:this.currentType,
        })
      }
      //保存搜索关键字
      this.saveKeyword(this.keywords)
      this.results = res.data.result || {}
      console.log(this.results)
    },
    //点击搜索
    startSearch(keyword) {
      this.keywords = keyword;
      this.single = [];
      this.isSearch = true;
      this.$router.push({
        path:'/main/search',
        query:{
          limit:this.limit,
          offset:this.offset,
          keywords:this.keywords,
          //默认点击搜索综合
          type:0
        }
      })
      this.initParams();
    },
    play(index){
      this.saveSongInfo(index);
    },
    //保存歌曲信息
    saveSongInfo(index){
      let data ={
        lists:this.results.songs,
        index,
        //搜索歌曲定为-2
        id:-2,
      }
      music.saveSheetList(data);
    },
    clearMsg() {
      this.keywords = "";
      this.single = [];
    },
    selectType(type) {
      this.currentType = type;
    },

    initParams(){
      this.currentType = Number(this.$route.query.type) || 0;
      this.limit = Number(this.$route.query.limit) || 30;
      this.keywords = this.$route.query.keywords || '';
      this.offset = Number(this.$route.query.offset) || 0;
  
      if(this.keywords === '') return ;
      this.getSearchByType()
    },
    //读取关键字
    readKeyword(){
      this.historyKyes = JSON.parse(localStorage.getItem(api.storage.SEARCH_RECORD)) || [];
    },

    //保存关键字到本地
    saveKeyword(keyword){
        if(keyword === null) return ;
        let localdata = JSON.parse(localStorage.getItem(api.storage.SEARCH_RECORD)) || [];
        localdata.unshift(keyword);
        localdata = axios.removeRepeat(localdata);
        this.historyKyes =localdata;
        localStorage.setItem(api.storage.SEARCH_RECORD,JSON.stringify(localdata));
    },

    //清除本地关键字
    removeKeyword(){
      this.historyKyes = [];
      localStorage.removeItem(api.storage.SEARCH_RECORD);
    }
  },
  computed:{
  
  },
  activated() {
    this.initHot();
    this.readKeyword();
    //输入框自动聚焦
    // this.$refs.serachRef.focus();
  },
  components: {
    Loading,
    Single,
    Prompt
  }
};
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1155638_f3jy9s0je2r.css");
//清除input search的清除按钮
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
.search-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;

  .search-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $auto_ht;
    display: flex;
    align-content: center;
    padding: px2rem(0.1rem) px2rem(0.3rem);
    box-sizing: border-box;
    font-size: $fsize_auto_l;
    .search-header-lt,
    .search-header-right {
      flex: 0 0 px2rem(1rem);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-header-input {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      box-sizing: border-box;
      @include border-1px(#333);
      margin-left: px2rem(0.2rem);
      margin-right: px2rem(0.2rem);
      input {
        width: 100%;
        //    height:100%;
        font-size: px2rem(0.3rem);
        padding: px2rem(0.2rem) 0;
      }
      input::-webkit-input-placeholder {
        color: #999;
      }
      .serach-header-clear {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: px2rem(0.1rem);
      }
    }
    .search-result-list {
      width: 76%;
      position: absolute;
      top: $auto_ht;
      z-index: 99;
      background: #fff;
      box-shadow: 2px 3px 5px 4px #ddd;
      .list-header {
        display: flex;
        box-sizing: border-box;
        height: px2rem(1rem);
        align-items: center;
        padding-left: px2rem(0.2rem);
        position: relative;
        @include border-1px(#ccc);
        color: #5b92d8;
        font-size: $fsize_small_l;
      }
      .list-item {
        display: flex;
        height: px2rem(1rem);
        position: relative;
        @include border-1px(#ccc);
        .list-lt {
          flex: 0 0 px2rem(1rem);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $fsize_auto_l;
        }
        .list-rt {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          color: #666;
          font-size: $fsize_small_l;
        }
      }
    }
  }
  .search-type {
    position: absolute;
    // background:red;
    top: $auto_ht;
    width: 100%;
    display: flex;
    align-content: center;
    height: $auto_ht;
    white-space: nowrap;
    overflow-x: auto;
    @include border-1px(#ccc);
    //不显示滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    .type-item {
      flex: 0 0 px2rem(1.5rem);
      height: $auto_ht;
      // line-height: $auto_ht;
      font-size: $fsize_auto_l;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      // display: inline-block;
      // padding:0 px2rem(.3rem);
      &.active {
        position: relative;
        color: $primary_color;
        &::after {
          position: absolute;
          content: "";
          width: $fsize_auto_l * 2;
          height: 2px;
          background: $primary_color;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
  }
  .search-content,.search-results-wp {
    position: absolute;
    top: $auto_ht;
    left: 0;
    right: 0;
    bottom: $auto_ht;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    padding: px2rem(0.5rem) px2rem(0.3rem) 0;
    .search-content-history {
      height: 20%;
      .search-content-h-title {
        display: flex;
        justify-content: space-between;
        height: 40%;
        .search-content-h-title-lt {
          flex: 0 0 px2rem(2rem);
          display: flex;
          align-items: center;
          h3 {
            font-size: $fsize_small_l;
          }
        }
        .search-content-h-title-rt {
          flex: 0 0 px2rem(1rem);
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            padding: px2rem(0.2rem);
            font-size: $fsize_auto_l;
          }
        }
      }
      .search-content-h-keys {
        //不显示滚动条
        &::-webkit-scrollbar {
          display: none;
        }
        display: flex;
        height: 60%;
        // margin-left: px2rem(0.5rem);
        overflow-x: auto;
        font-size: 0;
        //规定段落中的文本不进行换行
        white-space: nowrap;
        .h-keys {
          padding: px2rem(0.15rem) px2rem(0.3rem);
          border-radius: px2rem(0.5rem);
          background: #ddd;
          height: px2rem(0.4rem);
          display: inline-block;
          font-size: $fsize_small_l;
          color: #333;
        }
        .h-keys + .h-keys {
          margin-left: px2rem(0.2rem);
        }
      }
    }
    .search-content-popular {
      box-sizing: border-box;
      height: 80%;
      .serach-content-p-title {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 10%;
        h3 {
          font-size: $fsize_small_l;
          text-align: left;
        }
      }
      .serch-content-p-list {
        height: 90%;
        .hot-list-item-wp {
          display: flex;
          height: px2rem(1rem);
          padding-bottom: px2rem(0.2rem);
          .hot-list-wp-lt {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 px2rem(1rem);
            font-size: $fsize_auto_l;
            &.active {
              color: $primary_color;
            }
          }
          .hot-list-wp-rt {
            flex: 1 1 auto;
            .hot-list-tp,
            .hot-list-bt {
              height: 50%;
            }
            .hot-list-tp {
              display: flex;
            }
          }
          .hot-list-wp-rt-info {
            flex: 1 1 auto;
            display: flex;
            align-items: center;
          }
          .hot-list-title {
            font-size: $fsize_auto_l;
            font-weight: bold;
          }
          .hot-list-play-count {
            display: flex;
            align-items: center;
            color: #bbb;
            font-size: $fsize_small_m;
            box-sizing: border-box;
            padding-left: px2rem(0.2rem);
            padding-right: px2rem(0.4rem);
          }
          .icon-hot {
            color: $primary_color;
          }
        }
      }
      .loading-wp {
        position: relative;
      }
    }
  }
   .search-results-wp{
      top:$auto_ht*2;
      .single-wp{
        .title-wp{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height:px2rem(1rem);
          .title-lt,.title-rt{
            display: flex;
            justify-content: center;
            align-items: center;
            flex:0 0 px2rem(1rem);
            h3{
              font-size: $fsize_auto_l;
            }
          }
          .title-rt{
            flex:0 0 px2rem(2rem);
            // position: relative;
            height:px2rem(.6rem);
            box-sizing: border-box;
            padding:px2rem(.1rem) px2rem(.1rem);
            border-radius: px2rem(1rem);
            border:1px solid #ccc;
            .icon-bofang{
              font-size: $fsize_small_l;
              color:#333;
            }
            .text{
              margin-left: px2rem(.1rem);
              font-size: $fsize_small_l;
              color:#333;
            }
          }
        }
        .content-wp{

        }
      }
    }
}
</style>
