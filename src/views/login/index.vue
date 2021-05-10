<template>
    <div class="bgColor">
        <div class="bg-blue">
            <div class="login">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                            <i class="el-icon-s-tools input-icon"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
                            <i class="el-icon-s-tools input-icon"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 10px">
                        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                            <span v-if="!loading">登 录</span>
                            <span v-else>登 录 中...</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>

import { setToken, removeToken } from '@/utils/auth'
import { login, captchaImage, getInfo } from '@/api/login'
export default {
    name: "Login",
    data () {
        return {
            codeUrl: "",
            cookiePassword: "",
            loginForm: {
                username: "liyang",
                password: "123456",
                code: "",
                uuid: ""
            },
            loginRules: {
                username: [
                    { required: true, trigger: "blur", message: "用户名不能为空" }
                ],
                password: [
                    { required: true, trigger: "blur", message: "密码不能为空" }
                ],
            },
            loading: false,
            redirect: undefined
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    created () {
        // this.getCookie();
        this.captchaImage() // 验证码
    },
    methods: {
        cancelLoading () {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        captchaImage () { // 获取验证码  uuid
            captchaImage().then(res => {
                if (res.code == 200) {
                    this.loginForm.uuid = res.uuid
                } else {
                    removeToken()
                    this.msgError(res.msg)
                }
            })
        },
        handleLogin () { // 登录
            login(this.loginForm).then(res => {
                if (res.code == 200) {
                    setToken(res.token)
                    getInfo().then(res => { // 获取个人信息
                        if (res.code == 200) {
                            localStorage.setItem("userName", res.user.nickName)
                            localStorage.setItem("userId", res.user.userId)
                            if (this.$route.query.redirect && this.$route.query.redirect != "" && this.$route.query.redirect != "/login") {
                                this.$router.push({ path: this.$route.query.redirect })
                            } else {
                                sessionStorage.removeItem("childrenIndex")
                                // this.$router.push({ path: '/home' })
                                this.$router.push({ path: '/studys/countries/2' })
                            }
                        }
                    })

                } else {
                    removeToken()
                    this.msgError(res.msg)
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.bgColor {
    height: 100%;
    width: 100%;
    background-color: #04397b;
}
.bg-blue {
    background: url('~@/assets/image/bg.png');
    background-size: 100% 100%;
}
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 735px;
    width: 1026px;
    margin: 0 auto;
    color: #1b59ac;
    background-image: url('~@/assets/image/login-bg.png');
    background-size: 100% 100%;
}
.el-form-item {
    margin-bottom: 0;
}
.el-form {
    margin: 50px 0 0 150px;
}
.el-input__inner {
    width: 240px;
}
</style>
