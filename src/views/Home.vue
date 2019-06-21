<template>
  <div class="home">
    <router-link :to="{name: 'Children'}"> children</router-link>
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
    <hr>
    <child1>
      <template v-slot:header>
        <h2>{{homeUser}}</h2>
      </template>
      <template v-slot:default="childData">
          <h2 >{{homeUser}}</h2>
          <h3>{{childData.childUser}}</h3>
      </template>
    </child1>
  </div>
</template>

<script>
// @ is an alias to /src
  import child1 from "../components/Child1"
  export default {
    name: 'home',
    components: {
      child1,
    },
    data: function(){
      return {
        msg1: new Date().getTime(),
        msg2: "",
        msg3: "",
        homeUser: "aaaa",
        homeObj: {a: 1}
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
