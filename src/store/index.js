import vue from 'vue'
import vuex from 'vuex'
import Login from './module/login.js'

vue.use(vuex)

const store = new vuex.Store({
    modules:{
        Login
    }
})

export default store