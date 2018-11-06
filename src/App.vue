<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
  $tcuColor:rgb(4, 60, 122);
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    #app {
      height: 100%;
      min-width: 1000px;
    }
  }
</style>
