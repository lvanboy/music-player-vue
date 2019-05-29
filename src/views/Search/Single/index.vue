<template lang='pug'>
    .single-container
        .single-lt(@click='play(index)')
            .single-name
                span.name {{songName}}
                span.alias(v-if='songAlias.length') ({{songAlias[0]}})
            .single-info
                span.singer {{singers}} -
                span.album {{albumName}}
            .single-alias(v-if='songAlias.length') {{songAlias[0]}}
        .single-rt
            .mv-wp(v-if='mvid')
                span.icon-shipin
            .more-wp
                span.icon-gengduo
</template>

<script>
export default {
    props:{
        id:{
            type:Number,
            default:0
        },
        index:{
            type:Number,
            default:0,
        },
        songName:{
            type:String,
            default:''
        },
        songAlias:{
            type:Array,
            default:function(){
                return [];
            }
        },
        singer:{
            type:Array,
            default:function(){
                return [];
            }
        },
        albumName:{
            type:String,
            default:''
        },
        mvid:{
            type:Number,
            default:0
        }

    },
    methods:{
        play(index){
            this.$emit('play',index)
        }
    },
    computed:{
        singers(){
            let str = '';
            this.singer.map((item)=>{
                str+=item.name + '/';
            })
            
            return str.substring(0,str.length-1);
        }
    }
}
</script>

<style lang='scss' scoped>
.single-container{
    display: flex;
    height:px2rem(1.3rem);
    align-items: center;
    .single-lt{
        flex:0 0 80%;
        @include els();
        .single-name{
            height:40%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-bottom: px2rem(.05rem);
            .name{
                font-size: $fsize_small_l;     
            }
            .alias{
                font-size: $fsize_small_l;
                color:#999;
                margin-left:px2rem(.1rem);
            }
        }
        .single-info{
            height:30%;
            color:#999;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-bottom: px2rem(.05rem);
            @include els();
            .singer {
                font-size: $fsize_small_s;
                margin-right:px2rem(.1rem);
            }
            .album{
                font-size:$fsize_small_s;
            }
        }
        .single-alias{
            display: flex;
            align-items: center;
            height: 30%;
            color:#999;
            font-size: $fsize_small_s;
        }
    }
    .single-rt{
        flex:1 1 auto;
        display: flex;
        height:100%;
        font-size: $fsize_auto_l;
        .mv-wp{
            display: flex;
            flex:0 0 50%;
            justify-content: flex-end;
            align-items: center;
        }
        .more-wp{
            display: flex;
            flex:1 1 auto;
            justify-content: flex-end;
            align-items: center;   
        }  
    }
}
</style>
