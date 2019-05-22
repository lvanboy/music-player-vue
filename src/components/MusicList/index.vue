<template lang='pug'>
    .music-list-container
        .list-lt(:class='{"active":isPlaying}' @click='play(index)')
            span.icon-laba(v-if='isPlaying') 
            span.sname {{songName}}
            span.singer  - {{singer}}
        .list-rt
            span.close(@click='remove(index,isPlaying)') ×
</template>

<script>

export default {
    props:{
        //song-name
        songName:{
            type:String,
            default:''
        },
        //歌手名称
        singers:{
            type:Array,
            default:function(){
                return []
            }
        },
        //歌曲id
        songID:{
            type:Number,
            default:null,
        },
        //当前所在列表的索引
        index:{
            type:Number,
            default:null
        },
        //当前歌曲是否正在播放
        isPlaying:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
       play(index){
           this.$emit('play',index);
       },
       remove(index,isPlaying){
           this.$emit('remove',index,isPlaying);
       }
    },
    computed:{
        singer(){
            let singer =''
            this.singers.forEach((item)=>{
                singer+=item.name;
            })
            return singer;
        }
    }
   
}
</script>

<style lang='scss' scoped>
.music-list-container{
    padding:0 px2rem(.2rem);
    height:px2rem(.8rem);
    display: flex;
    align-items: center;
    .list-lt{
        width:80%;
        flex:0 0 80%;
        height:px2rem(.8rem);
        line-height:px2rem(.8rem);
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        @include els();
        &.active{
            .sname,.singer,.icon-laba{
                color:$primary_color;
            }
        }
        .icon-laba{
            font-size:$fsize_small_l;
            margin-right: 5px;
        }
        .sname{
            color:#000;
            font-size:$fsize_small_l;
            margin-right:3px;
            //  @include els();
        }
        .singer{
            font-size: $fsize_small_s;
            color:#999;
            //  @include els();

        }
    }
    .list-rt{
        flex:1 1 auto;
        display: flex;
        justify-content: flex-end;
        .close{
            display: inline-block;
            padding: px2rem(.1rem);
            color:#ccc;
        }
    }
}
</style>
