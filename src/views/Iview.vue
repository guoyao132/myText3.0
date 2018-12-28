<template>
  <div>
    <Slider v-model="value1"></Slider>
    <Slider v-model="value2"></Slider>
    <Slider v-model="value3" range disabled></Slider>
    <Button @click="modal9 = true">20px from the top</Button>
    <Modal
      title="Title"
      v-model="modal9"
      :styles="{top: '20px'}">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Button @click="modal10 = true">Vertical center</Button>
    <Modal
      title="Title"
      v-model="modal10"
      class-name="vertical-center-modal">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'Iview',
    data: function () {
      return {
        value1: 25,
        value2: 5,
        value3: [1,25],
        modal9: false,
        modal10: false,
      }
    },
    methods: {},
    mounted: function () {
    },
  }
</script>

<style lang="less">
  .vertical-center-modal{
      display: flex;
      align-items: center;
      justify-content: center;
    .ivu-modal{
      top: 0;
    }
  }
</style>