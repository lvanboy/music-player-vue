<template lang='pug'>
    .prompt-r
        .prompt-mask(@click='close')
        .prompt-container
            .prompt-info-w
                span.info {{promptInfo}}
            .prompt-click-w
                .cancel-buttom-w(@click='close') {{noLabel}}
                .comfire-buttom-w(@click='clean') {{yesLabel}}
</template>

<script>
export default {
    props:{
        ['yes-label']:{
            type:String,
            default:'确认'
        },
        ['no-label']:{
            type:String,
            default:'取消'
        },
        ['prompt-info']:{
            type:String,
            default:'请传递提示属性'
        }
    },
    methods:{
        close(){
            console.log('close');
            this.$emit('close');
        },
        clean(){
            this.close();
            this.$emit('clean');
        }
    }

}
</script>

<style lang='scss'>
.prompt-mask{
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background:rgba(0,0,0,.5);
}
.prompt-container{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    width:90%;
    display: flex;
    flex-direction: column;
    padding: px2rem(.3rem);
    background-color: #fff;
    border-radius: px2rem(.1rem);
    .prompt-info-w{
        display: flex;
        // align-items: center;
        text-align: left;
        letter-spacing: 1px;
        .info{
            color:#999;
            line-height: 1.5;
            font-size: $fsize_small_x;
        }
    }
    .prompt-click-w{
        flex:0 0 px2rem(1rem);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        padding-top:px2rem(.2rem);
        .cancel-buttom-w,.comfire-buttom-w{
            width:px2rem(1.5rem);
            height:px2rem(.5rem);
            padding: px2rem(.1rem) 0;
            line-height: px2rem(.5rem);
            text-align: center;
            color:$primary_color;
            font-size: $fsize_small_m;
        }
    }
}

</style>
