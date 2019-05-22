export default {
    //将听歌数量转化为万或者亿
    parseNumber:(number)=>{
        return (number/100000000>1)?(number/100000000).toFixed(1)+' 亿':(number/10000>10)?(Math.floor(number/10000) + ' 万'): Math.floor(number)
    },

    //将秒转化为03:22分钟的格式
    parseMusicTime:(second)=>{
        let t = Math.floor(second);
        let m = Math.floor(second / 60);
        let s = Math.floor(second % 60);
        let strM = String(m).padStart(2,'0')
        let strS = String(s).padStart(2,'0');
        return strM + ' : ' + strS;
    }
}