<template lang='pug'>
    .find-container
        //子导航   
        Nav(:NavInfo='navInfo' extraActive='narbar-active' proportion=true  fontsz='0.35rem')
        transition(:name='$route.meta.transition')
            //子导航详情，包括推荐，朋友，电台的切换
            router-view
</template>

<script>
import Nav from "@/components/Nav/";
export default {
  data() {
    return {
      navInfo: [
        {
          label: "推荐",
          url: "/main/find/recommend",
          icon: ""
        },
        {
          label: "朋友",
          url: "/main/find/friend",
          icon: ""
        },
        {
          label: "电台",
          url: "/main/find/radio",
          icon: ""
        }
      ]
    };
  },
  watch: {
    //基于路由变化的过度
    $route(to, from) {
      if (to.name == "friend" && from.name == "recommend") {
        to.meta.transition = "fade-left";
      } else if (to.name == "friend" && from.name == "radio") {
        to.meta.transition = "fade-right";
      }
    }
  },
  components: {
    Nav
  }
};
</script>

<style lang='scss' scoped>
@import "@/style/animation.scss";
.find-container{
  margin-top:$auto_ht;
}
</style>
