<template>
  <div class="Chlidl2">
    <input type="text" value="Chlidl2">
    <br>
    <br>
    <router-link :to="{name: 'GrandChild3'}">GrandChild3</router-link>
    <div @click="destroyName('GrandChild3')">X</div>
    <br>
    <router-link :to="{name: 'GrandChild4'}">GrandChild4</router-link>
    <hr>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "Chlidl2",
    data() {
      return {}
    },
    methods: {
      destroyName(name){
        console.log(name);
        this.$destroy(name);
        this.$router.push({name: 'GrandChild4'})
      },
    },
    mounted() {

    },
  }
</script>

<style lang="less" scoped>
  .Chlidl2 {

  }
</style>