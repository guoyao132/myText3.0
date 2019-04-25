<template>
  <div class="home">
    <input type="text" v-model="msg1">
    <input type="text" v-model="msg2">
    <input type="text" v-model="msg3">
    <div class="div-btn">
      <button class="btn btn-default" @click="formatDate">执行</button>
    </div>
    <div class="con">sadasds1da31d2as</div>
    <Button>
      <router-link to="/">changeColor</router-link>
    </Button>
  </div>
</template>

<script>
// @ is an alias to /src

  export default {
    name: 'home',
    data: function(){
      return {
        msg1: new Date().getTime(),
        msg2: "",
        msg3: "",
      }
    },
    mounted: function () {
    },
    methods:{
      formatDate: function(){
        console.log(this.utils.formatTime(this.msg1, this.msg2, this.msg3));
      }
    }

  }
</script>

<style lang="less" scoped>
  .div-btn{
    margin: 20px;
  }
  .con{
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
  }
</style>
