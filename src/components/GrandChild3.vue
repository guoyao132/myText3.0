<template>
  <div class="GrandChild3">
    <input type="text" value="GrandChild3">
    <Button @click="ceshi='bbbbb'">修改测试</Button>
    {{ceshi}}
  </div>
</template>

<script>
  export default {
    name: "GrandChild3",
    created(){
      console.log("GrandChild3 created")
    },
    data() {
      return {
        ceshi: "aaa"
      }
    },
    methods: {},
    beforeMount(){
      console.log("GrandChild3 beforeMount");
    },
    mounted() {

    },
  }
</script>

<style lang="less" scoped>
  .GrandChild3 {

  }
</style>