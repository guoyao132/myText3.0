<template>
  <div>
    <Dropdown @on-click="changeColor">
      <a href="javascript:void(0)">
        下拉菜单
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="themea">a</DropdownItem>
        <DropdownItem name="themeb">b</DropdownItem>
        <DropdownItem name="themec">c</DropdownItem>
        <DropdownItem name="">c</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Button>
      <router-link to="/home">home</router-link>
    </Button>
    <div class="con">asd5a4d6a4sd654as6dasdas46d</div>
  </div>
</template>

<script>

  export default {
    name: 'ChangeColor',
    data: function () {
      return {}
    },
    methods: {
      changeColor: function(n){
        console.log(n);
        $('#app').removeClass().addClass(n);
      }
    },
    mounted: function () {
    },
  }
</script>


<style scoped>
  .con{
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
  }
</style>