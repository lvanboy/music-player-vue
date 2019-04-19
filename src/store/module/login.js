import * as types from '../mutation-types.js';
import axios from '../../utils/http';
import API from '../../api/index';
import router from '../../router';


let state = {
  [types.LOGIN_STATUS]: {},
};

let getters = {
  [types.LOGIN_STATUS_GETTER]: state => state.LOGIN_STATUS,
};

let mutations = {};

let actions = {};
/**
 * 登录获取用户信息
 * @param { commit } 执行mutations
 * @param { Object } data 参数 包括data.type (phone || email)  和 data.password
 * 手机----------------：
 * 必选参数 : phone: 手机号码 password: 密码
 * 接口地址 : /login/cellphone
 * 调用例子 : /login/cellphone?phone=xxx&password=yyy
 * 邮箱----------------：
 * 必选参数 : email: 163 网易邮箱 password: 密码
 * 接口地址 : /login
 * 调用例子 : /login?email=xxx@163.com&password=yyy
 */

mutations[types.LOGIN_STATUS_SETTER] = (state, data) => {
  state[types.LOGIN_STATUS] = data;
};

actions[types.USER_LOGIN_STATUS] = ({commit}, data) => {
  let url = data.type == 'phone'
    ? API.login.USER_LOGIN_PHONE
    : API.login.USER_LOGIN_EMAIL;
  return new Promise ((resolve, reject) => {
    axios.get (url, {params: {...data}}).then (res => {resolve(res)}, err => {reject(err)});
  });
};

actions[types.LOGIN_STATUS_SETTER] = ({commit}) => {
  return new Promise ((resolve, reject) => {
    axios.get (API.login.USER_LOGIN_STATUS).then (
      res => {
        if (res.data.code == 301) {
          reject (new Error ('未登陆或者登陆身份过期'));
          router.push ('/login');
          return;
        }
        commit (types.LOGIN_STATUS_SETTER, res.data);
        resolve (res);
      },
      err => {
        reject (err);
        router.push ('/login');
      }
    );
  });
};

export default {state, mutations, actions, getters};
