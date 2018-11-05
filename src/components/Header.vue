<template>
    <div>
        <header>
            <img src="../assets/header/logo.jpg" alt="">
            <img src="../assets/header/motto.jpg" alt="">
        </header>
        <menu style="padding:0">
            <el-menu mode="horizontal" default-active=1>
                <el-menu-item index=1>首页</el-menu-item>
                <el-menu-item index=2>通识类</el-menu-item>
                <el-menu-item index=3>消防安全</el-menu-item>
                <el-menu-item index=4>化学安全</el-menu-item>
                <el-menu-item index=5>电气安全</el-menu-item>
                <el-menu-item index=6>辐射安全</el-menu-item>
                <el-menu-item index=7>特种设备</el-menu-item>
            </el-menu>
        </menu>
    </div>
</template>

<style scoped lang="scss">
    $tcuColor:rgb(4, 60, 122);
    header {
        height: 96px;
        background-color: $tcuColor;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
    }
</style>

<script>
    export default {
        name: 'Header'
    }
</script>