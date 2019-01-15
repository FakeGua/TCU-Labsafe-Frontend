<template>
    <div class="body">
        <div class="right">
            <router-view name="right"></router-view>
        </div>
        <div class="left">
            <header class="header">
                <img src="../assets/index/logo.jpg" alt="">
                <div class="title display-1">实验室安全教育网</div>
            </header>
            <router-view name="leftmenu"></router-view>
            <footer class="text-light">
                <div>天津城建大学 · 理学院</div>
                <div>地址：天津市西青区津静公路26号</div>
                <div>电话：23085199 | 邮编：300384</div>
            </footer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $tcuColor:rgb(4, 60, 122);
    .body {
        height: 100%;
        .left {
            color: white;
            position: fixed;
            background-color: $tcuColor;
            min-height: 100%;
            width: 360px;
            top: 0;
            .header {
                text-align: center;
                .title {
                    font-size: 24px;
                    padding: 10px;
                }
                position: absolute;
                top: 20px;
                left:50%;
                width: 360px;
                margin-left: -180px;
            }
            footer {
                position: absolute;
                bottom: 20px;
                left: 50%;
                width: 200px;
                margin-left: -100px;
                padding-top: 60px;
                text-align: center;
                font-size: 12px;
            }
        }
        .right {
            padding: 20px;
            min-height: 100%;
            margin-left: 360px;
            background: whitesmoke;
        }
    }
</style>

<script>
    export default {
        name: 'exam',
        data: () => {
            return {}
        },
        mounted() {
            // console.log(this.$store.state);
            if (!this.$store.state.isLogined) {
                this.$router.replace('/login');
            }
        },
    }
</script>

