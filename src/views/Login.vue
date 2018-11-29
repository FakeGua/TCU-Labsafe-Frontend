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
                        <input class="password" name="password" type="password" placeholder="请输入6-8位无符号密码" pattern="[a-zA-z0-9]{6,8}" @keyup.enter="$message('回车在这里不管用喔～')" required>
                    </div>
                </form>
                <div class="login-button">
                    <input id="login-hint" class="btn btn-success" type="submit" value="登录" @click="onLogin" @blur="resetValue">
                    <input id="register-hint" class="btn btn-dark" type="button" value="注册" @click="dialogFormVisible = true" @blur="resetValue">
                </div>
            </div>
        </div>
        <el-dialog class="register" title="注册" :visible.sync="dialogFormVisible">
            <form onsubmit="return false" id="register">
                <div class="register-box">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <label for="username">学号&nbsp;&nbsp;</label><input class="username" name="username" type="text" placeholder="请输入10位学号" pattern="1[4-9](0[1-9]|1[0-5])(0[1-9]|1[0-5])(0[1-9]|1[0-5])(0[1-9]|[123456][0-9])" required>
                        </el-col>
                        <el-col :span="12">
                            <label for="password">密码&nbsp;&nbsp;</label><input class="password" name="password" type="password" placeholder="请输入6-8位无符号密码" pattern="[a-zA-z0-9]{6,8}" @keyup.enter="$message('回车在这里不管用喔～')" required>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="paddingTop:20px">
                        <el-col :span="8">
                            <label for="name">姓名&nbsp;&nbsp;</label><input class="name" name="name" type="text" placeholder="请输入2-10字姓名" pattern="[\u4e00-\u9fa5]{2,10}" required>
                        </el-col>
                        <el-col :span="16">
                            <label for="phone">手机号&nbsp;&nbsp;</label><input class="phone" name="phone" type="phone" placeholder="请输入11位手机号" pattern="1[0-9]{10}" @keyup.enter="$message('回车在这里不管用喔～')" required>
                        </el-col>
                    </el-row>
                </div>
            </form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onRegister">确 定</el-button>
            </div>
        </el-dialog>
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
        .register {
            .register-box {
                label {
                    font-size: 16px;
                }
                input {
                    padding: 10px;
                    border: 1px solid lightgray;
                    border-radius: 5px;
                    width: 80%;
                }
            }
        }
    }
</style>

<script>
    import axios from 'axios'
    import domain from '../libs/domain'
    export default {
        name: 'login',
        data: () => {
            return {
                dialogFormVisible: false,
            }
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
                        document.getElementById('login-hint').setAttribute('value', `${data.data.msg}`);
                        if (data.data.canLogin) {
                            let userInfo = data.data.data;
                            this.$store.state.isLogined = true;
                            this.$store.state.username = userInfo.username;
                            this.$store.state.name = userInfo.user_name;
                            this.$store.state.phone = userInfo.user_phone;
                            this.$router.replace('/exam');
                        }
                    }).catch((err) => {
                        console.error(err);
                    })
                } else {
                    document.getElementById('login-hint').setAttribute('value', '请输入格式正确的学号和密码！');
                }
            },
            onRegister() {
                let x = document.getElementById('register');
                let formData = new FormData(x);
                if (x.checkValidity()) {
                    this.$message('正在注册...');
                    axios.post(`${domain}/register`, {
                        username: formData.get('username'),
                        password: formData.get('password'),
                        name: formData.get('name'),
                        phone: formData.get('phone')
                    }).then((data) => {
                        if(data.data.canRegister){                        
                            this.dialogFormVisible = false;
                            this.$message.success(data.data.msg);
                        }else{
                            this.$message.error(data.data.msg);
                        }
                    }).catch((err) => {
                        console.error(err);
                        this.$message.error('注册失败，请检查网络或联系管理员。')
                    })
                } else {
                    this.$message.error('请输入格式正确的值。');
                }
            },
            resetValue() {
                document.getElementById('login-hint').setAttribute('value', '登录');
            }
        }
    }
</script>

