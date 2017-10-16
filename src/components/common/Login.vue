<template>
    <div class="mask light-blue">
        <div class="login-wrapper dark-white">
            <h1 class="text-center text-light-blue">大麦智投</h1>
            <el-form :model="loginInfo" :rules="rules" ref="loginForm" auto-complete="off">
                <el-form-item prop="username">
                    <el-input v-model.lazy="loginInfo.username" auto-complete="off">
                        <template slot="prepend">账号</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model.lazy.trim="loginInfo.password" auto-complete="off" @keyup.enter.native="submitLogin('loginForm')">
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="logining" class="login-btn" @click="submitLogin('loginForm')">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {loginApi} from "./../../fetch/API"
    export default {
        data() {
            return {
                logining: false,
                loginInfo: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码长度至少6位', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            submitLogin(formName) {console.log(formName);
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    if(valid){
                        vm.logining = true;
                        let params = vm.loginInfo;console.log(params);
                            loginApi(params).then(res => {
                                if (res.status == 200) {
                                    if (res.data.code == 0) {
                                        vm.$notify({
                                          message: '登陆成功！',
                                          type: 'success'
                                        });
                                        sessionStorage.setItem("username", res.data.data.username);
                                        sessionStorage.setItem("nickname", res.data.data.nickname);
                                        sessionStorage.setItem("id", res.data.data.id);
                                        vm.$router.push({ name: "shop" });
                                    } else {
                                        vm.$notify.error({
                                          message: res.data.msg,
                                          type: 'success'
                                        });
                                        vm.logining = false;
                                    }
                                }
                            }).catch(err => {
                                console.log(err);
                              vm.$notify.error({
                                message: '登陆失败！',
                                type: 'success'
                              });
                                vm.logining = false;
                            });
                            }
                });
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(./../../assets/img/login.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .login-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 30px;
        box-sizing: border-box;
        width: 330px;
        max-width: 100%;
        height: 270px;
        border-radius: 4px;
        box-shadow: 0px 0px 24px -7px #000;
        background-color: rgba(7, 7, 7, 0.6);
    }

    .login-wrapper h1 {
        margin-bottom: 20px;
    }

    .login-btn {
        width: 100%;
        font-size: large;
        font-weight: bold;
    }

</style>
