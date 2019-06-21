<template>
  <div class="CssAnimate">
    <div class="circle-div-con" @click="addClass">
      <div class="circle-div">

      </div>
    </div>
    <i-circle :percent="percent">
      <Icon v-if="percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
      <span v-else style="font-size:24px">{{ percent }}%</span>
    </i-circle>
    <ButtonGroup size="large">
      <Button icon="ios-add" @click="add"></Button>
      <Button icon="ios-remove" @click="minus"></Button>
    </ButtonGroup>

    <div class="con" @click="changedeg">
      <div class="percent-circle percent-circle-left">
        <div class="left-content"></div>
      </div>
      <div class="percent-circle percent-circle-right">
        <div class="right-content"></div>
      </div>
      <div class="text-circle">5%</div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: 'CssAnimate',
    data: function () {
      return {
        percent: 0,
        deg: 0,
      }
    },
    methods: {
      addClass: function(e){
        let thisDiv = $(e.currentTarget);
        thisDiv.toggleClass("active");
      },
      add () {
        if (this.percent >= 100) {
          return false;
        }
        this.percent += 10;
      },
      minus () {
        if (this.percent <= 0) {
          return false;
        }
        this.percent -= 10;
      },
      changedeg: function(){
        var leftContent  = document.querySelector(".left-content");
        var rightContent  = document.querySelector(".right-content");
        var textCircle   = document.querySelector(".text-circle");

//先是leftContent旋转角度从0增加到180度，
//然后是rightContent旋转角度从0增加到180度
        const _this = this;
        let angle = this.deg;
        if(angle < 360){
          angle += 30;
          angle = angle > 360 ? 360 : angle;
          if(this.deg < 180 && angle > 180){
            setTimeout(function(){
              _this.deg = angle;
              if(angle > 180){
                rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
              }else{
                leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
              }
              textCircle.innerHTML = parseInt(angle*100/360) +'%';
            }, 300)
          }else{
            this.deg = angle;
            if(angle > 180){
              rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
            }else{
              leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
            }
            textCircle.innerHTML = parseInt(angle*100/360) +'%';
          }
        }


      },
    },
    mounted: function () {

    },
  }
</script>

<style lang="less" scoped>
  .CssAnimate {
    padding: 30px;
    .circle-div-con{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .5s linear;
      margin-bottom: 20px;
      .circle-div{
        width: 30px;
        height: 2px;
        background: #fff;
        position: relative;
        transition: all .5s linear;
      }
      .circle-div:before{
        display: block;
        content: '';
        width: 30px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        top: -8px;
        left: 0;
        transition: transform .5s linear;
      }
      .circle-div:after{
        display: block;
        content: '';
        width: 30px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        top: 9px;
        left: 0;
        transition: transform .5s linear;
      }
    }
    .circle-div-con.active{
      transform: rotate(180deg);
      .circle-div{
        background-color: #000;
      }
      .circle-div:before{
        transform: rotate(45deg);
        top: 0;
      }
      .circle-div:after{
        transform: rotate(135deg);
        top: 0;
      }
    }
    .con {
      position:relative;
      display:inline-block;
      height:200px;
      width:200px;
    }

    .percent-circle {
      position:absolute;
      height:100%;
      background:#f00;
      overflow: hidden;
    }

    .percent-circle-right {
      right:0;
      width:100px;
      border-radius: 0 100px 100px 0;
    }

    .percent-circle-right .right-content{
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      transform-origin:left center;
      transform: rotate(0deg);
      border-radius: 0 100px 100px 0;
      background:#bbb;
      transition: transform .3s linear;
    }

    .percent-circle-left {
      width:100px;
      border-radius: 100px 0 0 100px;
    }

    .percent-circle-left .left-content {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      transform-origin:right center;
      transform: rotate(0deg);
      border-radius: 100px 0 0 100px;
      background:#bbb;
      transition: transform .3s linear;
    }

    .text-circle {
      position: absolute;
      display:flex;
      align-items: center;
      justify-content: center;
      height:80%;
      width:80%;
      left:10%;
      top:10%;
      border-radius:100%;
      background:#000;
      color:#fff;
    }



  }
</style>