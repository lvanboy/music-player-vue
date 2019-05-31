<template lang='pug'>
    .recommend-container
        //超过主页面滚动，所以最外层包裹滚动层。
        Scroll
            //以下内容放入滚动content中，可能超出wrapper部分的内容
            .scroll-content(slot='scroll-content')
               //轮播图
               swiper.slider(:options='swiperOptions' v-if='banner.length') 
                    swiperSlide.slider-item(v-for='(item,idx) in banner' :key='idx')
                        img(:src='item.imageUrl' @click='bannerClick(item)' )
                    .swiper-pagination
               //圆形图文垂直等分导航
               Nav(:aroundNavInfo='navInfo')
               //歌单|音乐|电台
               GroupSheet
  

</template>

<script>
import Scroll from "@/components/Scroll";
import Nav from "@/components/Nav/vertical.vue";
import GroupSheet from '@/components/GroupSheet';
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      banner: [],
      swiperOptions: {
        loop: true,
        autoplay:{
            disableOnInteraction:false,
        },
        pagination: {
          el: ".swiper-pagination",
        }
      },
      navInfo:[
        {text:'私人FM',icon:'icon-shouyinji',url:'/main/fm'},
        {text:'每日推荐',icon:'icon-rili',url:'/main/daily'},
        {text:'歌单',icon:'icon-gedan',url:'/main/songsheet'},
        {text:'排行榜',icon:'icon-paixingbang',url:'/main/rank'}
      ]
    };
  },
  methods: {
    //获取首页banner
    getBannerInfo() {
      this.$store.dispatch("BANNER_LISTS").then(
        res => {
          this.banner = res.data.banners;
        },
        err => {
          this.$msg("获取banner失败，请检查服务器");
        }
      );
    },
    //点击banner，根据不同的targetType，跳转不同的页面
    bannerClick(item) {}
  },
  components: {
    Scroll,
    swiper,
    swiperSlide,
    Nav,
    GroupSheet
  },
  mounted() {
    this.getBannerInfo();
  }
};
</script>

<style lang='scss' >
.recommend-container {
  position: absolute;
  top: $auto_ht;
  left: 0;
  right: 0;
  bottom: $auto_ht;
  background-color: $primary_color;
  .scroll-content {
    position: relative;
    background: #fff;
    .slider {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 20%;
        background: $primary_color;
      }
      .slider-item {
        box-sizing: border-box;
        padding: px2rem(0.15rem);
        img {
          width: 100%;
          border-radius: px2rem(0.15rem);
          //内联块，图片下方存在间距
          // display: block;
          vertical-align: bottom;
        }
      }
    }
    .swiper-pagination {
    //   bottom: 10%;
    //   left: 50%;
    //   transform: translateX(-50%);

      span+span{
          margin-left:5px;
      }
      .swiper-pagination-bullet-active{
        background: $primary_color;
      }
    }
  }
}
</style>
