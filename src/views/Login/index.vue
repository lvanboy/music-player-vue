<template lang='pug'>
    .login-container
        .login-content
            router-link.btn-login(to='/login/phone') 手机登陆
            router-link.btn-login(to='/login/email') 邮箱登陆
        router-view
    
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    .login-content{
        width:80%;
        height:auto;
        .btn-login{
            display: block;
            border: 1px solid $primary_color;
            border-radius: px2rem(0.35rem);
            margin:px2rem(0.3rem) 0;
            line-height: px2rem(0.7rem);
            color:$primary_color;
            font-size: $fsize_auto_l;
        }
    }

}
</style>
