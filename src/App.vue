<template>
  <div id="app">
    <msg />
    <router-view/>
  </div>
</template>
<style lang="less">
  @import url('./assets/css/color.less');
  .themea{
    .theme();//默认的样式
  }
  .themeb{
    .theme(blue,#fff);
  }
  .themec{
    .theme(#111,#999);
  }
</style>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
