<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

  export default {
      name: 'home',
      mounted: function () {
          console.log(this.utils.addFloat(0.1, 0.2))
      }
  }
</script>
