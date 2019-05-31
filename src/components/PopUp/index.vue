<template lang='pug'>
    .pop-container
        .mask(@click='close' )
        .pop-up-wp(:style="{top:`${100 - height}%`}")
            .tit
                slot(name='pop-tit')
            .content
                slot(name='pop-content')
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        height:{
            type:Number,
            default:70,
        }
    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>

<style lang='scss' scoped>
.pop-container{
    @include absfull();
    z-index: 999;
    .mask{
        @include absfull();
        background:rgba(0,0,0,.3);
    }
    .pop-up-wp{
        @include absfull();
        // width:100%;
        top:30%;
        bottom:0;
        background: #fff;
        border-top-right-radius: px2rem(.4rem);
        border-top-left-radius: px2rem(.4rem);
        padding: px2rem(.4rem) px2rem(.2rem);
        .tit{
            height:px2rem(.8rem);
            display: flex;
            align-items: center;
            font-size: $fsize_auto_l;
            color:#333;
            font-weight: 500;
        }
        .content{
            height:100%;
        }
    }
}
</style>
