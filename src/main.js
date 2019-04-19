import Vue from 'vue'
import App from './App.vue'
//配置app的路由
import router from './router.js'
//配置app的状态
import store from './store/index.js'
import './assets/font-icon/init.css'

import Msg from 'vue-message'
Vue.use(Msg, {
  text: 'Hello world', duration: 3000, background: 'rgba(7,17,27,0.6)'
})

Vue.config.productionTip = false


let MusicAPP = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

store.dispatch('LOGIN_STATUS_SETTER').then((data)=>{
  console.log(data)
  MusicAPP.$msg('登陆校验成功')
},(err)=>{
  console.log(err)
  MusicAPP.$msg('登陆校验失败')
})

export default MusicAPP
