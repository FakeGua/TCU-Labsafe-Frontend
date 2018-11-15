<template>
    <div class="body">
        <div class="login">
            <div class="login-box">
                <div class="login-logo">
                    <img src="../assets/login/logo.jpg" height="100px" alt="" @click="$router.replace('/')">
                    <div class="h4 pt-3">TCU实验室安全考试系统</div>
                </div>
                <form onsubmit="return false" id="login">
                    <div class="login-info">
                        <input class="username" name="username" type="text" placeholder="请输入10位学号" pattern="1[4-9](0[1-9]|1[0-5])(0[1-9]|1[0-5])(0[1-9]|1[0-5])(0[1-9]|[123456][0-9])" required>
                        <input class="password" name="password" type="password" placeholder="请输入6-8位无符号密码" pattern="[a-zA-z0-9]{6,8}" @keyup.enter="onLogin" required>
                    </div>
                </form>
                <div class="login-button">
                    <input id="login-hint" class="btn btn-success" type="submit" value="登录" @click="onLogin" @blur="resetValue">
                    <input id="register-hint" class="btn btn-dark" type="button" value="注册" @click="onRegister" @blur="resetValue">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .body {
        height: 100%;
        background-image: url('../assets/login/background.jpg');
        background-position: right;
        background-size: cover;
        .login {
            height: 100%;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-around;
            .login-box {
                padding: 20px;
                height: 500px;
                width: 460px;
                background: white;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .login-logo {
                    img {
                        cursor: pointer;
                    }
                    text-align: center;
                }
                form {
                    width: 100%;
                    .login-info {
                        input {
                            padding: 10px;
                            border: 1px solid lightgray;
                            border-radius: 5px;
                            margin: 20px auto;
                            display: block;
                            width: 80%;
                        }
                    }
                }
                .login-button {
                    width: 100%;
                    input {
                        display: block;
                        margin: 10px auto;
                        width: 80%;
                    }
                }
            }
        }
    }
</style>

<script>
    import axios from 'axios'
    import domain from 'domain'
    export default {
        name: 'login',
        data: () => {
            return {}
        },
        mounted() {},
        methods: {
            onLogin() {
                document.getElementById('login-hint').setAttribute('value', '请稍等...');
                let x = document.getElementById('login');
                let formData = new FormData(x);
                if (x.checkValidity()) {
                    axios.post(`${domain}/login`, {
                        username: formData.get('username'),
                        password: formData.get('password')
                    }).then((data) => {
                        console.log(data);
                        document.getElementById('login-hint').setAttribute('value', `${data.data}`);
                    }).catch((err)=>{
                        console.error(err);
                    })
                } else {
                    document.getElementById('login-hint').setAttribute('value', '请输入正确的学号和密码！');
                }
            },
            onRegister(){
                document.getElementById('register-hint').setAttribute('value', '请稍等...');
                let x = document.getElementById('login');
                let formData = new FormData(x);
                if (x.checkValidity()) {
                    axios.post(`${domain}/register`, {
                        username: formData.get('username'),
                        password: formData.get('password')
                    }).then((data) => {
                        console.log(data);
                        document.getElementById('register-hint').setAttribute('value', `${data.data}`);
                    }).catch((err)=>{
                        console.error(err);
                    })
                } else {
                    document.getElementById('register-hint').setAttribute('value', '请输入正确的学号和密码！');
                }
            },
            resetValue() {
                document.getElementById('login-hint').setAttribute('value', '登录');
                document.getElementById('register-hint').setAttribute('value', '注册');
            }
        }
    }
</script>

