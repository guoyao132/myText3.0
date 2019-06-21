<template>

  <div class="my-amap">
    <el-amap vid="amapDemo"  :plugin="plugin" :zoom="zoom" :center="center"></el-amap>
  </div>
</template>

<script>
  export default {
    name: "AMap",
    data(){
      return {
        center: [116.403268, 39.923916],
        zoom: 13,
        plugin:  [
          {
            pName: 'Scale',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          },
          {
            pName: 'ToolBar',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          },
        ]
      }
    },
  }
</script>

<style scoped>
  .my-amap{
    width: 1000px;
    height: 600px;
  }

</style>