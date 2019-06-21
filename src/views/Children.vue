<template>
  <div class="Children">
    <ul>
      <li>
        <router-link :to="{name: 'home'}">home</router-link>
      </li>
      <li>
        <router-link :to="{name: 'Child1'}">child1</router-link>
      </li>
      <li>
        <router-link :to="{name: 'Chlidl2'}">Chlidl2</router-link>
      </li>
      <li>
        <router-link :to="{name: 'GrandChild1'}">GrandChild1</router-link>
      </li>
      <li>
        <router-link :to="{name: 'GrandChild2'}">GrandChild2</router-link>
      </li>
      <li>
        <router-link :to="{name: 'GrandChild3'}">GrandChild3</router-link>
      </li>
      <li>
        <router-link :to="{name: 'GrandChild4'}">GrandChild4</router-link>
      </li>
    </ul>
    <div style="margin-top: 20px;">
      <hr>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Children",
    data() {
      return {
        data1: "1",
      }
    },
    methods: {},
    mounted() {

    },
  }
</script>

<style lang="less" scoped>
  .Children {
    .divLeftList{
      color: red
    }

  }
</style>