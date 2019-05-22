<template lang='pug'>
    .around-nav-container
        .around-nav-item(v-for='(item,idx) in aroundNavInfo' :key='idx')
            router-link.around(:to='item.url')
                span(:class='[item.icon]')
            h5.text {{item.text}}
    
</template>

<script>
export default {
  //导航信息,字体图标，描述文字，跳转url
  props: {
    aroundNavInfo: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import url('//at.alicdn.com/t/font_1155638_6ffi322yzhb.css');
.around-nav-container {
  display: flex;
  position: relative;
  width:100%;
  padding:px2rem(0.3rem) 0;
  @include border-1px($border-color);
  .around-nav-item{
      display: flex;
      flex-direction: column;
    //   justify-content:center;
      align-items: center;
      flex-grow:1;
      .around{
          display: flex;
          justify-content: center;
          align-items: center;
          width:px2rem(1rem);
          height:px2rem(1rem);
          border-radius: 50%;
          background:linegrad(90deg,#f65042,#e24139);
          span{
              color:#ebfff1;
              font-size: $fsize_nav_l;
          }
      }
      .text{
          margin-top: px2rem(.2rem);
          color:$text-color;
          font-size:$fsize_small_s;
      }
  }
}
</style>
