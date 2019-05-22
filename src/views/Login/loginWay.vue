<template lang='pug'>
    .login-way-container
        Commonpage
            .content-slot(slot='content')
                .text-input
                    span.icon-webicon205
                    input(v-if="type=='phone'" type='number' placeholder='手机号' v-model='phone')
                    input(v-if="type=='email'" type='text' placeholder='邮箱号' v-model='email')
                .text-input
                    span.icon-mima
                    input(type='password' placeholder='密码' v-model='password' @keyup.enter='Validate()')
                input.login-in(type='button' value='登陆' @click='Validate()')
</template>

<script>
import Util from "@/utils/reg/isReg.js";
import Commonpage from "@/components/commonPage";
import { stat } from 'fs';

export default {
  data() {
    return {
      //登陆类型
      type: "",
      //登陆密码
      password: "",
      //邮件号
      email: "",
      //手机号
      phone: ""
    };
  },
  methods: {
    //校验表单
    Validate() {
      if (this.email || (this.phone && this.password)) {
        //路由地址对应的是手机方式，且手机号码有内容
        if (this.type == "phone" && this.phone) {
          //使用自己工具正则类，开始验证
          if (Util.isPhoneNumber(this.phone)) {
            this.password.length < 8
              ? this.$msg("密码长度过短")
              : this.loginTo(this.type);
          } else {
            this.$msg("输入手机号有误");
          }
        }
        if (this.type == "email" && this.email) {
          if (Util.isEmail(this.email)) {
            //验证通过发起，请求登陆请求
            this.password.length < 8
              ? this.$msg("密码长度过短")
              : this.loginTo(this.type);
          } else {
            this.$msg("输入邮箱地址有误");
          }
        }
        return;
      }
      this.$msg("请输入账号和密码后，再提交");
    },
    //向api登陆接口发送登陆请求
    async loginTo(type) {
      let data = {
        type: type,
        password: this.password
      };
      if (type == "phone") data.phone = this.phone;
      if (type == "email") data.email = this.email;
      let res = await this.$store.dispatch("USER_LOGIN", data);
      console.log(res);
      if (res.status == 502) {
        this.$msg(res.msg);
      } else if (res.status == 200) {
        //   待解决，登陆后，获取不到登陆后的状态。
        //    更新登陆后的用户信息
        this.$store.dispatch("LOGIN_STATUS_SETTER", res.data).then(
          res => {
            this.$msg("登陆成功");
            setTimeout(() => {
              this.$router.push("/main");
            }, 1500);
          },
          err => {
            console.log(err);
            this.$msg("登陆状态异常");
          }
        );
      } else {
        console.log(res.status);
      }
    },

    initType() {
      this.type = this.$route.params.type;
      // console.log(this.type);
    }
  },
  //当前vue实例data和methods初始化完成，获取路由参数type
  created() {
    this.initType();
  },
  components: {
    Commonpage
  }
};
</script>

<style scoped lang='scss'>
.content-slot {
  width: px2rem(6.8rem);
  margin: px2rem(0.2rem) auto;
  .text-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: px2rem(0.9rem);
    position: relative;
    @include border-1px(#eee);
    span {
      display: block;
      flex: 0 0 px2rem(0.5rem);
      margin-right: px2rem(0.15rem);
      color: $icon-color;
      font-size: px2rem(0.5rem);
    }
    input {
      flex: 1 1 auto;
      display: block;
      position: relative;
      height: px2rem(0.6rem);
      font-size: $fsize_auto_s;
    }
  }
  .login-in {
    width: 100%;
    height: px2rem(0.68rem);
    border-radius: px2rem(0.3rem);
    margin-top: px2rem(0.4rem);
    background: linegrad(110deg, $primary_color_s, $primary_color_d);
    color: #fff;
    font-size: $fsize_auto_l;
  }
}
</style>
