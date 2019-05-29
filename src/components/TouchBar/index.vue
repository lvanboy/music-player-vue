<template lang='pug'>
    .touch-bar
        slot.left-sider(name='left-sider')
        .bar
            .progress(ref='bar')
                .current(:style="{background:color}" ref='current')
                .range(:class="type=='progress'?'music':''" ref='range' 
                @touchstart='rangeTouchStart'
                @touchmove='rangeTouchMove'
                @touchend='rangeTouchEnd')
                    .point(v-if="type=='progress'")
        slot.right-sider(name='right-sider')
</template>

<script>
export default {
  data() {
    return {
      barWidth: null,
      initiated: false,
      startPageX: null,
      startOffsetLeft: null,
      movePageX: null,
      percent: 0,
      dataProgress: this.curProgress
    };
  },
  props: {
    //当前位置
    curProgress: {
      type: Number,
      default: 0
    },
    //进度条颜色
    color: {
      type: String,
      default: "rgb(203,40,41)"
    },
    //进度条圆点大小
    type: {
      type: String,
      default: "auto"
    }
  },
  methods: {
    rangeTouchStart(e) {
      this.initiated = true;
      //e.touches 接触点的集合，这里只选择第一个触摸点
      //e.touches 触点相对于HTML文档左边沿的的X坐标
      this.startPageX = e.touches[0].pageX;
      //e.target  The target element of the Touch object.
      //e.target.offsetLeft 返回当前元素左上角相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值
      this.startOffsetLeft = e.target.offsetLeft;
    },
    rangeTouchMove(e) {
      this.movePageX = e.touches[0].pageX;
      //确定移动距离，最大最小值用来限制边界,
      let moveDistance = Math.min(
        this.barWidth,
        Math.max(0, this.startOffsetLeft + (this.movePageX - this.startPageX))
      );

      //得到接触点的偏移百分比
      this.dataProgress = Math.floor(moveDistance / this.barWidth * 100);
      //将dom元素与接触点同步
      this.offset()
      //将音乐进度与接触点同步
      this.$emit('setMusicPercent',this.dataProgress);
    },
    rangeTouchEnd(e) {
      this.initiated = false;
      console.log('dataprogres',this.dataProgress)
      this.$emit('setMusicProgress',this.dataProgress);
    },
    offset() {
      this.$refs.current.style.width = this.dataProgress + "%";
      this.$refs.range.style.left = this.dataProgress + "%";
    },
    setProgressOffset(progress){

      if(progress>=0&&!this.initiated){
        this.$nextTick(()=>{
          this.$refs.current.style.width = progress +'%';
          this.$refs.range.style.left = progress + '%';
        })
      }
    }
  },
  watch:{
    // 该回调将会在侦听开始之后被立即调用
    curProgress:{
      immediate:true,
      handler:function(val,oldval){
        this.setProgressOffset(val)
      }
    }
  },
  mounted() {
    //display:none的元素如何获取属性，隐藏元素这里宽度获取为0，即不占用空间。
    this.barWidth = this.$refs.bar.offsetWidth ||  100;
  }
};
</script>

<style lang='scss' scoped>
.touch-bar {
  width: 100%;
  height: px2rem(0.8rem);
  display: flex;
  justify-content: center;
  align-items: center;
  .left-sider,
  .right-sider {
    flex: 0 0 px2rem(0.9rem);
  }
  .bar {
    flex: 1 1 auto;
    box-sizing: border-box;
    padding: 0 px2rem(0.15rem);
    .progress {
      height: 2px;
      background: rgba(244, 244, 244, 0.9);
      position: relative;
      .current {
        height: 100%;
        width: 0;
      }
      .range {
        width: px2rem(0.2rem);
        height: px2rem(0.2rem);
        border-radius: 50%;
        position: absolute;
        padding:3px;
        top: 50%;
        left: 0;
        //圆形再进度条起始位置剧中而不是左对齐
        transform: translate(-50%,-50%);
        background: #fff;
        &.music {
          width: px2rem(0.25rem);
          height: px2rem(0.25rem);
        }
        .point {
          width: px2rem(0.09rem);
          height: px2rem(0.09rem);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: $primary_color;
        }
      }
    }
  }
}
</style>
