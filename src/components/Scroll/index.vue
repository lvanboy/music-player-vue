<template lang='pug'>
       .bt-scroll
            slot(name='scroll-header')
            .wrapper(ref='wrapper')
                .content
                    slot(name='scroll-content')
                    .pullup-wrapper(v-if='canPullUp')
                        .before-trigger(v-if='isMore')
                            Loading(:vertical='false' height='60px')
                        .no-more(v-else) 没有更多数据了.
</template>

<script>
import Loading from "@/components/Loading/";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
    click: {
      type: Boolean,
      default: true
    },
    //设置包裹层背景
    background: {
      type: String,
      default: "#fff"
    },
    //是否可以上拉加载更多
    canPullUp: {
      type: Boolean,
      default: false
    },
    //是否可以下拉刷新
    canPullDown: {
      type: Boolean,
      default: false
    },
    isSnap: {
      type: Boolean,
      default: false
    },
    isMore:{
      type:Boolean,
      default:true,
    }
  },
  methods: {
    //better-scroll更多操作，参见
    //https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88
    //初始化better-scroll
    initScroll() {
      let params = {};
      //上拉刷新参数
      let pullDownRefresh = {
        threshold: 50,
        stop: 20
      };
      let pullUpLoad = {
        threshold: 50
      };
      if (this.canPullUp) params.pullDownRefresh = pullDownRefresh;
      if (this.canPullDown) params.pullUpLoad = pullUpLoad;

      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        //这个配置用于 PC 端的鼠标滚轮
        //speed 表示鼠标滚轮滚动的速度，invert 为 true 表示滚轮滚动和时机滚动方向相反，easeTime 表示滚动动画的缓动时长
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },

        ...params
      });
      //初始化事件
      this._resize();

      this._initPullDown();
      this._finishPullDown();
      
      this._initPullUp();
      this._finishPullUp();
    },
    //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    _refresh() {
      this.scroll && this.scroll.refresh();
    },
    _resize() {
      window.addEventListener("resize", () => {
        if (!this.scroll || !this.scroll.enabled) {
          return;
        }
        clearInterval(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this._refresh();
        }, 60);
      });
    },
    _initPullUp() {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp", this);
      });
    },

    _initPullDown() {
      this.scroll.on("pullingDown", () => {
        this.$emit("pullingDown", this);
      });
    },
    _finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    _finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this;
      setTimeout(function() {
        _this.initScroll();
      });
    });
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss' scoped>
.bt-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .wrapper {
    width: 100%;
    height: 100%;
    .content {
      position: absolute;
      z-index: 1;
      width: 100%;
      .pullup-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: $fsize_small_x;
        .before-trigger {
          
        }
        
      }
    }
  }
}
</style>
