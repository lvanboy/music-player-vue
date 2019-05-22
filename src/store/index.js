import vue from 'vue'
import vuex from 'vuex'
import Login from './module/login.js'
import Recommend from './module/recommend.js'
import Music from './module/music'

vue.use(vuex)

const store = new vuex.Store({
    modules:{
        Login,
        Recommend,
        Music
    }
})

export default store