<template>
  <div class="msg">
    <div class="msg" :class="{'active': showMsg}">
      {{textMsg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "vue-msg",
    create() {

    },
    data() {
      return {
        name: '',
        showMsg: false,
        textMsg: '',
      }
    },
    methods: {
      msgPlugin(msg){
        this.textMsg = msg;
        this.showMsg = true;
        setTimeout(() => {
          this.show = false;
        })
      },
    },
    mounted() {

    },
  }
</script>

<style lang="less" scoped>
  .msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    color: #fff;
    transition: all .5s;
    opacity: 0;
    width: 0;
    min-height: 0;

    &.active{
      width: 150px;
      min-height: 25px;
      opacity: 1;
      z-index: 11;
    }
  }
</style>