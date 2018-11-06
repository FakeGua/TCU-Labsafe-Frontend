<template>
  <div class="body">
    <div class="right">
      <router-view name="right"></router-view>
    </div>
    <div class="left">
      <header class="header">
        <img src="../assets/logo.jpg" alt="">
        <div class="title display-1">实验室安全教育网</div>
      </header>
      <router-view name="leftmenu"></router-view>
      <footer class="text-light">
        <div>天津城建大学 · 理学院</div>
        <div>地址：天津市西青区津静公路26号</div>
        <div>电话：022-123456 | 邮编：300384</div>
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
      height: 100%;
      width: 360px;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .header {
        text-align: center;
        .title {
          font-size: 24px;
          padding: 10px;
        }
      }
      footer {
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
  // @ is an alias to /src
  // import indexmenu from '@/components/IndexMenu'
  export default {
    name: 'home',
    components: {},
    data() {
      return {};
    },
    methods: {},
    computed: {},
    mounted() {}
  }
</script>
