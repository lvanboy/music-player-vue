<template lang='pug'>
    .sheet-container
            .blur(:style="{backgroundImage:`url(${activeSwiperImg}?params=150y150)`}" class='light')
            Scroll(:canPullUp='true' @pullingUp='getMore' :isMore='isMore')
                .header-wp(slot='scroll-header')
                    .blur(:style="{backgroundImage:`url(${activeSwiperImg}?params=150y150)`}" class='light')
                    .header
                        .lt(@click='back')
                            span.icon-fanhui
                        .tit 歌单广场
                    .type-wp
                        .type-hot(v-if='hotCateName&&hotCateName.length')
                            .item(v-for="(item,idx) in hotCateName" :key='idx' :class='curIndex===idx?"active":""' @click='setIndex(idx,item.name)') {{item.name}}
                        .type-all
                            span.icon-caidan1
                .scroll-content(slot='scroll-content')
                    .swiper-wp(v-if='swiperSheet&&swiperSheet.length&&includeSwiper')
                            .item(v-if="idx<3" v-for="(item,idx) in swiperSheet" :key='idx' :class="swiperIndex===idx?'active':''")
                                .cover
                                    img(:src="item.coverImgUrl+'?param=150y150'")
                                    .play-count
                                        span.icon-fangxiangsanjiao-xiangyou
                                        span.count {{item.playCount | parseNumber}}
                                    .play-icon
                                .name {{item.name}}
                    .sheet-high(v-if='isHigh')
                        .high-tit
                          .tit-lt {{this.subCat || '全部歌单'}}
                          .tit-rt(@click='isPopUp="true"')
                            span.icon-shaixuan
                            span.text 筛选
                    .sheet-item(v-for="(item,idx) in recomSheet" :key='idx' v-if='recomSheet&&recomSheet.length')
                        .cover
                            img(:src="item.coverImgUrl+'?param=150y150'")
                            .play-count
                                    span.icon-fangxiangsanjiao-xiangyou
                                    span.count {{item.playCount | parseNumber}}
                        .des {{item.name}}
            //弹出层
            PopUp(v-if='isPopUp' :height='70' @close='isPopUp=false')
              span(slot='pop-tit') 选择你喜欢的分类
              .content(slot='pop-content')
                .all(@click='setSubCat("")' :class='subCat==""?"active":""') 全部歌单
                .vlist
                  .item(v-if='idx<20' v-for='(item,idx) in allCateName' :key='idx' @click='setSubCat(item.name)' :class='subCat===item.name?"active":""') {{item.name}}
            SheetType
</template>

<script>
import Scroll from "@/components/Scroll/";
import axios from "@/utils/";
import api from "@/api/";
import music from "@/utils/music.js";
import PopUp from "@/components/PopUp/";
import SheetType from './SheetType/'
export default {
  data() {
    return {
      hotCateName: [],
      allCateName: [],
      swiperSheet: [],
      recomSheet: [],
      // categories: { 0: "语种", 1: "风格", 2: "场景", 3: "情感", 4: "主题" },
      curIndex: 0,
      isPopUp: false,
      includeSwiper: true,
      isHigh: false,
      isFilter: false,
      isMore: true,
      swiperIndex: 0,
      limit: 12,
      offset: 3,
      cat: "",
      //精选歌单分类参数，,取上一页最后一个歌单的 updateTime 获取下一页数据
      before: 0,
      subCat: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取热门分类名称
    async getHotLabel() {
      let res = await axios.fetchData(api.songlist.HOTNAME);
      this.hotCateName = res.data.tags;
      this.hotCateName.unshift({ name: "精品" });
      this.hotCateName.unshift({ name: "推荐" });
    },
    //获取全部分类名称
    async getAllLabel() {
      let res = await axios.fetchData(api.songlist.CATEGONAME);
      this.allCateName = res.data.sub;
    },
    //获取推荐歌单
    async getHotInfo(limit = 12, offset = 0, cat = "") {
      let res = await axios.fetchData(api.songlist.CATEINFO, {
        limit,
        offset,
        cat
      });

      return res.data.playlists;
    },

    //获取swiper歌单
    async getSwiperSheet() {
      this.swiperSheet = await this.getHotInfo(3, 0);
    },

    //获取精品歌单
    async getHighSheet() {
      let res = await axios.fetchData(api.songlist.CATEINFOHIGH, {
        limit: this.limit,
        before: this.before,
        cat: this.cat
      });
      this.recomSheet = this.recomSheet.concat(res.data.playlists);
    },

    //获取热门推荐歌单
    async getHotSheet() {
      let data = await this.getHotInfo(this.limit, this.offset, this.cat);
      this.recomSheet = this.recomSheet.concat(data);
    },

    //设置当前索引
    setIndex(index, catename) {
      //防止反复点击。
      if (index !== this.curIndex) {
        this.isMore = true;
        this.curIndex = index;
        this.recomSheet = [];
        this.cat = catename;
        this.isHigh = false;
        this.includeSwiper = false;
        //初始化请求参数
        this.limit = 12;
        this.offset = 0;
        this.before = 0;
        if (catename === "推荐" || "") {
          this.cat = "";
          this.includeSwiper = true;
          this.offset = 3;
        } else if (catename === "精品") {
          this.cat = "";
          this.isHigh = true;
        }
        if (this.isHigh) {
          //保持筛选
          if (this.isFilter) this.cat = this.subCat;
          this.getHighSheet();
        } else {
          this.getHotSheet();
        }
      }
    },

    //设置子分类
    setSubCat(catename) {
      if (catename == "") {
        this.isFilter = false;
      }
      this.isFilter = true;
      this.recomSheet = [];
      this.subCat = catename;
      this.cat = catename;
      this.before = 0;
      this.getHighSheet();
      this.isPopUp = false;
      this.isMore = true;
    },

    //下拉获取推荐歌单
    async getMore(that) {
      if (!this.isHigh) {
        this.offset += this.limit;
        await this.getHotSheet();
      }else{
        this.before=this.recomSheet[this.recomSheet.length-1].updateTime;
        await this.getHighSheet();
      }

      that.scroll.refresh();
      that.scroll.finishPullUp();
    }
  },
  components: {
    Scroll,
    PopUp,
    SheetType
  },
  computed: {
    activeSwiperImg() {
      if (
        this.swiperSheet.length &&
        this.swiperSheet[this.swiperIndex] !== void 0
      ) {
        return this.swiperSheet[this.swiperIndex].coverImgUrl;
      }
    }
  },
  activated() {
    this.getHotLabel();
    this.getAllLabel();
    this.getSwiperSheet();
    this.getHotSheet();
  }
};
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1155638_u98k16h6hch.css");
.sheet-container {
  @include absfull();
  .blur {
    @include blur(26px, $height: auto, $position: 50% 0);
  }
  .header-wp {
    position: relative;
    z-index: 2;
    .blur {
      @include blur(
        8px,
        $height: px2rem(1.8rem),
        $position: 50% 0,
        $scale: 1.7
      );
      z-index: -1;
    }
    .header {
      height: $auto_ht;
      display: flex;
      align-content: center;
      color: #333;
      font-size: $fsize_auto_l;
      .lt,
      .tit {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 px2rem(1rem);
      }
      .tit {
        flex: 1 1 auto;
        box-sizing: border-box;
        padding-left: px2rem(0.2rem);
        justify-content: flex-start;
        font-weight: 600;
      }
    }
    .type-wp {
      display: flex;
      position: relative;
      @include border-1px(#ccc);
      height: px2rem(1rem);
      .type-hot {
        flex: 1 1 auto;
        display: flex;

        white-space: nowrap;
        overflow-x: auto;
        align-content: center;
        color: #666;
        &::-webkit-scrollbar {
          display: none;
        }
        .item {
          flex: 0 0 px2rem(1.5rem);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $fsize_auto_l;

          &.active {
            position: relative;
            color: $primary_color;
            &::after {
              content: "";
              position: absolute;
              left: 50%;
              transform: translate(-50%, 0);
              bottom: 0;
              width: $fsize_auto_l * 2;
              height: 2px;
              background: $primary_color;
            }
          }
        }
      }
      .type-all {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $fsize_auto_l;
        flex: 0 0 px2rem(0.8rem);
      }
    }
  }

  .scroll-content {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    box-sizing: border-box;
    padding: px2rem(0.3rem) px2rem(0.2rem);
    // overflow: auto;
    .swiper-wp {
      position: relative;
      height: $auto_ht * 5.2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      //   padding: px2rem(0.2rem) px2rem(0.3rem);
      margin-bottom: px2rem(0.5rem);
      .item {
        flex: 0 0 40%;
        &.active {
          width: 50%;
          position: absolute;
          left: 50%;
          top: 5%;
          transform: translate(-50%, 0);
          z-index: 1;
          // display:none;
        }
        .cover {
          position: relative;
          border-top-right-radius: px2rem(0.2rem);
          border-top-left-radius: px2rem(0.2rem);
          overflow: hidden;
          img {
            width: 100%;
            vertical-align: bottom;
          }
          .play-count {
            position: absolute;
            right: px2rem(0.1rem);
            top: px2rem(0.1rem);
            color: #fff;
            font-size: $fsize_small_x;
          }
          .play-icon {
            position: absolute;
            bottom: px2rem(0.2rem);
            right: px2rem(0.2rem);
            width: px2rem(0.7rem);
            height: px2rem(0.7rem);
            border-radius: 50%;
            background: #ccc;
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-15%, -50%);
              width: 0px;
              height: 0px;
              border-top: px2rem(0.1rem * 1.5) solid transparent;
              border-right: px2rem(0.263rem) solid transparent;
              border-left: px2rem(0.263rem) solid $primary_color;
              border-bottom: px2rem(0.1rem * 1.5) solid transparent;
            }
          }
        }
        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: left;
          padding: px2rem(0.2rem);
          background: #fff;
          color: #000;
          font-size: $fsize_small_x;
          border-bottom-left-radius: px2rem(0.2rem);
          border-bottom-right-radius: px2rem(0.2rem);
        }
      }
    }
    .sheet-high {
      width: 100%;
      height: px2rem(1rem);
      .high-tit {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $fsize_auto_l;
        .tit-lt {
          flex: 0 0 px2rem(1.5rem);
          font-weight: 600;
          color: #000;
        }
        .tit-rt {
          margin-right: px2rem(0.1rem);
          flex: 0 0 px2rem(1.4rem);
          border-radius: px2rem(0.4rem);
          border: 1px solid #ccc;
          font-size: $fsize_small_m;
          padding: px2rem(0.05rem) 0;
          color: #333;
          .text {
            margin-left: px2rem(0.1rem);
          }
        }
      }
    }
    .sheet-item {
      width:30%;
      margin-bottom: px2rem(0.5rem);
      margin-left:px2rem(.2rem);
      box-sizing: border-box;
      .cover {
        width: px2rem(2rem);
        height: px2rem(2rem);
        position: relative;
        border-radius: px2rem(0.2rem);
        overflow: hidden;
        &::after {
          content: "";
          background: rgba(0, 0, 0, 0.1);
          @include absfull();
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
          //   vertical-align: bottom;
        }
        .play-count {
          position: absolute;
          z-index: 1;
          top: px2rem(0.1rem);
          right: px2rem(0.1rem);
          font-size: $fsize_small_x;
          color: #fff;
        }
      }
      .des {
        width:px2rem(2rem);
        font-size: $fsize_small_s;
        text-align: left;
        box-sizing: border-box;
        height: px2rem(0.9rem);
        padding: px2rem(0.1rem);
        color: #000;
        font-weight: 500;
        @include mels();
      }
    }
  }
  .all {
    width: 90%;
    margin: px2rem(0.4rem) auto;
    height: px2rem(0.9rem);
    line-height: px2rem(0.9rem);
    text-align: center;
    background: #ddd;
    color: #000;
    border-radius: px2rem(0.4rem);

    &.active {
      background: linegrad(
        90deg,
        $primary_color,
        $primary_color_s,
        $primary_color
      );
      color: #fff;
    }
    font-size: $fsize_auto_l;
  }
  .vlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;
    .item {
      width: 22%;
      height: px2rem(0.8rem);
      line-height: px2rem(0.8rem);
      text-align: center;
      font-size: px2rem(0.3rem);
      color: #000;
      background: #ddd;
      border-radius: px2rem(0.3rem);
      margin-bottom: px2rem(0.4rem);
      &.active {
        background: linegrad(
          90deg,
          $primary_color,
          $primary_color_s,
          $primary_color
        );
        color: #fff;
      }
    }
  }
}
</style>
