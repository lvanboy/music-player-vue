import Vue from 'vue'
import App from './App.vue'
//配置app的路由
import router from './router.js'
//配置app的状态
import store from './store/index.js'

import './assets/font-icon/init.css'

//字体图标css
import './assets/font-icon/iconfont.css'

//引入过滤器中自定义的函数
import filters from './filter'

//引入自定义指令
import directive from './directive'

//根据不同的分辨率，设定html的字体大小
import 'amfe-flexible'

//该组件需要引入
import Msg from 'vue-message'

import Dutils from 'd-js-utils'

Vue.use(Msg, {
  text: 'Hello world', duration: 3000, background: 'rgba(7,17,27,0.6)'
})

Vue.config.productionTip = false
//注册全局过滤器
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key])
})
//挂载工具
Vue.prototype.$dutils = Dutils
let MusicAPP = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

store.dispatch('LOGIN_STATUS_SETTER').then((data)=>{

  MusicAPP.$msg('登陆校验成功')
},(err)=>{
  
  MusicAPP.$msg('登陆校验失败')
})

export default MusicAPP
