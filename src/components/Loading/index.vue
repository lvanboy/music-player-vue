<template lang='pug'>
   .loading(:class="{'absolute':absolute}")
        .c(:class="{size,'vertical':vertical}" :style="{height:height}")
            img(src="@/assets/images/loading.gif")
            p {{name}}
        
</template>

<script>
export default {
    props:{
        //loading的尺寸
        size:{
            type:String,
            default:''
        },
        //图片与文字是否垂直对齐
        vertical:{
            type:Boolean,
            default:true,
        },
        //是否全屏
        absolute:{
            type:Boolean,
            default:false,
        },
        //显示加载提示内容
        name:{
            type:String,
            default:'数据加载中...'
        },
        //loading容器的高度
        height:{
            type:String,
            default:'140px'
        }
    }
}
</script>

<style lang='scss'>
.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    &.absolute{
        position:absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .c{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width:px2rem(.4rem);
            height:px2rem(.4rem);
        }
        p{
            font-size: $fsize_small_x;
            color:$icon-nav-color;
            margin-left: px2rem(.1rem);
        }
        &.vertical{
            flex-direction: column;
            p{
                margin-left: 0;
                margin-top:px2rem(.1rem);
            }
        }
        &.small{
            img{
                width:px2rem(.24rem);
                height:px2rem(.24rem);
            }
            p{
                font-size: $fsize_small_s;
            }
        }
    }
}
</style>
