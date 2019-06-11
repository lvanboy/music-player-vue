<template lang='pug'>
    .sheet-type
        Common(title='歌单标签' :custBack='true')
            .header(slot='headerlf')
                span.icon-fanhui
            .content-slot(slot='content')
                .topic-wp(v-for='(item,idx) in all' :key='idx')
                    .tit {{item.typename}}
                    .detail
                        .item(v-for='(list,idx) in item.list' :key='idx') {{list.name}}

</template>

<script>
import Common from "@/components/commonPage/";
import axios from "@/utils/";
import api from "@/api/";
export default {
  data() {
    return {
      all: {}
    };
  },
  methods: {
    //获取所有分类
    async getAllLabel() {
      console.log(api.songlist.CATEGONAME);
      let res = await axios.fetchData(api.songlist.CATEGONAME);
      this.parse(res.data);
    },
    //获取热门分类
    async getHotLabel() {
        let obj = {};
        obj.typename = '我的歌单广场';
        obj.list = [];
      let res = await axios.fetchData(api.songlist.HOTNAME);
      res.data.tags.forEach(item => {
        obj.list.push(item.playlistTag.name);
      });
      this.all = {obj}
    },

    //将分类以categories 再次分类
    parse(data) {
      let obj = {};
      data.sub.forEach(item => {
        if (!obj[item.category]) {
          obj[item.category] = {};
          obj[item.category].list = [];
        }
        obj[item.category].list.push(item);
        if (obj[item.category].typename) return;
        obj[item.category].typename = data.categories[item.category];
        this.all = obj;
      });
      console.log(this.all)
    }
  },
  components: {
    Common
  },
  mounted() {
    this.getHotLabel();
    this.getAllLabel();
  }
};
</script>

<style lang='scss' scoped>
.sheet-type {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  .topic-wp {
    box-shadow: border-box;
    padding: px2rem(0.2rem);
    .tit {
      width: 100%;
      height: $auto_ht;
      color: #000;
      font-size: $fsize_auto_l;
      display: flex;
      align-items: center;
    }
    .detail {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .item {
        width: 23%;
        margin: 2% 1%;
        height: px2rem(0.8rem);
        line-height: px2rem(0.8rem);
        font-size: $fsize_small_l;
        background: #ccc;
        color: #000;
        border-radius: px2rem(0.3rem);
      }
    }
  }
}
</style>
