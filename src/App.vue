<template lang='pug'>
  #app
   router-view
 
</template>

<script>

 
export default {
  name: 'app',
  components: {

  }
}
</script>

<style> 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin:0 auto;
  /* 规定显示的最大尺寸*/
  /* max-width: 675px; */
}
body,html{
  width:100%;
  height:100vh;
  box-sizing: border-box;
  margin:0;
  padding:0;
  /*固定字体大小，整体调整通过rem*/
  /* font-size:30px; */
}
</style>
