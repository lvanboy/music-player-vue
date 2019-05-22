import axios from '@/utils/http';
import API from '@/api/index';
import * as types from '../mutation-types'



let state = {

}

let getters = {

}

let mutations = {

}

let actions = {

}

//获取banner数据
actions[types.BANNER_LISTS] = () => {
    return new Promise((resolve, reject) => {
        axios.get(API.recommend.BANNER)
            .then(
                res => {
                    resolve(res)
                },
                err => {
                    reject(err)
                }
            )
    })
}

export default {
    state,
    getters,
    actions,
    mutations
}