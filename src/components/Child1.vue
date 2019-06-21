<template>
  <div class="Child1">
    <input type="text" value="child1">
    <br>
    <br>
    <router-link :to="{name: 'GrandChild1'}">GrandChild1</router-link>
    <br>
    <router-link :to="{name: 'GrandChild2'}">GrandChild2</router-link>
    <hr>
    <keep-alive>
      <router-view />
    </keep-alive>

    <hr>
    <hr>
    <slot name="header"></slot>
    <slot :childUser="childUser"></slot>
  </div>
</template>

<script>
  export default {
    name: "Child1",
    props: {
      homeUser: {
        type: String,
        default: "cccc"
      }
    },
    data() {
      return {
        childUser: "bbbbbb"
      }
    },
    methods: {},
    mounted() {

    },
  }
</script>

<style scoped>
  .Child1 {

  }
</style>