<template lang='pug'>
    .nav-container(:class='size')
        router-link.navitem(
            v-for="navitem in NavInfo.length" :key='navitem' 
            :to="NavInfo[navitem-1].url" 
            :class="[{'dengbili':proportion},extraActive,NavInfo[navitem-1].pos=='left'?'navitem-left':NavInfo[navitem-1].pos=='right'?'navitem-right':'']"
        )
            span(:class="Navtype!='wenzi'?NavInfo[navitem-1].icon:'wenzi'" 
            :style="{color:(NavInfo[navitem-1].color || color),fontSize:NavInfo[navitem-1].fontsz || fontsz}")  {{Navtype=='wenzi' ? NavInfo[navitem-1].label:''}}

</template>

<script>
export default {
  props: {
    //文字导航或者图标导航
    Navtype: {
      type: String,
      default: "wenzi"
    },
    //导航信息
    NavInfo: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //navitem的高度
    size: {
      type: String,
      default: ""
    },
    //额外的激活类样式
    extraActive: {
      type: String,
      default: ""
    },
    //等比例分布
    proportion: {
      type: Boolean,
      default: false
    },
    //定义整体文字和图标的颜色
    color: {
      type: String,
      default: ""
    },
    //定制字体大小
    fontsz: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang='scss'>
@import url("//at.alicdn.com/t/font_1155638_ohi5k949fxf.css");

.nav-container {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: $auto_ht;
  line-height: $auto_ht;
  //定制小一号的高度
  &.sm {
    height: $auto_ht_sm;
    line-height: $auto_ht_sm;
  }
  background: $primary_color;
  .navitem {
    display: block;
    //导航项目宽度
    width: px2rem(1rem);
    height: 100%;
    //默认导航字体图标颜色
    color: $icon-nav-color;
    //定制等比例项目分布
    &.dengbili {
      flex-grow: 1;
    }
    span {
      font-size: $fsize_nav_l;
    }
    span.wenzi {
      font-size: $fsize_auto_l;
    }
  }

  //额外的路由激活样式
  .narbar-active {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: px2rem(0.2rem);
      height: px2rem(0.03rem);
      width: 20%;
      background: #fff;
      display: none;
    }
  }
  .navitem-left {
    position: absolute;
    left: 0;
  }
  .navitem-right {
    position: absolute;
    right: 0;
  }

  .router-link-active,
  .router-link-exact-active {
    color: #fff;
    &::after {
      display: block;
    }
  }
}
</style>
