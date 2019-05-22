<template lang='pug'>
    .commonpage
        .autoheader(:class="{'bg':bg}")
            .bg(v-if="bg" :style="bgImageStyle")
                .bg-content
            .left
                slot(v-if="custBack" name='headerlf')
                span.icon-fanhui(v-else @click='back()')
            .title {{title}}
            .right
                slot(name='headerrt')
        .autobody(id='auto-body')
            slot(name='content')
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        custBack:{
            type:Boolean,
            default:false
        },
        bg:{
            type:String,
            default:''
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    },
    computed:{
        bgImageStyle:function(){
          return  this.bg?{backgroundImage:`url(${this.bg})`}:{}
        }    
    }

}
</script>

<style lang='scss' scoped>
    .commonpage{
        display:flex;
        flex-direction: column;
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        .autoheader{
            display:flex;
            justify-content: center;
            align-items: center;
            flex:0 0 $auto_ht;
            position:absolute;
            top: 0;
            left: 0;
            right: 0;
            width:100%;
            height:$auto_ht;
            box-sizing: border-box;
            /*默认标题栏背景 主色*/
            background-color: $primary_color;
            color:#fff;
            font-size: $fsize_auto_l;
            overflow: hidden;
            .bg{
                @include blur(20px,250px,60%);
                z-index: 1;
            }
            .left,.right{
                display: flex;
                align-items: center;
                height:100%;
                flex: 0 0 px2rem(2.5rem);
                span{
                    display: inline-block;
                    vertical-align: top;
                    height:100%;
                    line-height: $auto_ht;
                    flex:0 0 px2rem(0.7rem);
                    margin:0 px2rem(0.2rem);
                }
            }
            &.bg{
                .left,.right,.title{
                    z-index: 1;
                }
            }
            .left{
                justify-content: flex-start;
                span{
                    font-size: $fsize_small_l;
                }
            }
            .title{
                flex:1 1 auto;
                @include els()
            }
            .right{
                justify-content: flex-end;
            }
        }
        .autobody{
            position:absolute;
            top:$auto_ht;
            bottom:0;
            left: 0;
            right: 0;
            //如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
            overflow: auto;
            //控制元素在移动设备上是否使用滚动回弹效果
            //使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果
            -webkit-overflow-scrolling: touch;
            background: #fff;
        }
    }

</style>
