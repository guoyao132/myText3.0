<template>
  <div>
    <div class="myWindow-con">
      <div class="myWindow-bg-con"></div>
      <div class="myWindow">
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title0
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
      <div class="myWindow">
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title1
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
      <div class="myWindow">
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title2
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Block",
    data: function(){
      return {
        jianju: 10,
        startPageX: 0,
        startPageY: 0,
        myWinDTL: []
      }
    },
    methods: {
      //获取指定窗口的最小top值
      computedTop: function(i){  //i是要计算的窗口，nowI是当前移动的窗口
        const _this = this;
        let myWinI = this.myWinDTL[i],
          x1 = myWinI[0],
          x2 = myWinI[1],
          y1 = myWinI[2],
          y2 = myWinI[3],
          top = 10;
        this.myWinDTL.forEach(function (val, index) {
          if(i != index) {
            let x3 = val[0],
              x4 = val[1],
              y3 = val[2],
              y4 = val[3];
            if(!(x2 <= x3 || x1 >= x4)){
              if(!(y1 >= y4 || y2 <= y3)){
                top = top > y4 ? top : y4;
              }else if(y1 >= y4){
                top = top > y4 ? top : y4;
              }
            }
          }
        })
        console.log(i, top)
        return top;
      },
      //自动移动其他窗口
      autoMove: function(i){  //i当前移动窗口下表
        const _this = this;
        let myWinI = this.myWinDTL[i],
          x1 = myWinI[0],
          x2= myWinI[1],
          y1 = myWinI[2],
          y2 = myWinI[3];
        console.log(myWinI.toString());
        let n = 0;
        let arr1 = [];
        let minX = -1, maxX = -1;
        this.myWinDTL.forEach(function (val, index) {
          if (i != index) {
            let x3 = val[0],
              x4 = val[1],
              y3 = val[2],
              y4 = val[3];
            if (!(x2 <= x3 || x1 >= x4)) {
              if (!(y1 >= y4 || y2 <= y3)) {
                minX = minX != -1 ? (val[0] > minX ? minX : val[0]) : val[0];
                maxX = maxX != -1 ? (val[1] > maxX ? val[1] : maxX) : val[1];
                arr1.push(val.concat(index));
              }
            }
          }
        })
        if(arr1.length != 0){
          this.myWinDTL.forEach(function (val, index) {
            if (i != index) {
                let x5 = val[0],
                  x6 = val[1],
                  y5 = val[2],
                  y6 = val[3];
                if(!(x5 >= maxX || x6 <= minX) && y6 > y1){
                  // console.log(_this.myWinDTL[index].toString(), " ---", y2)
                  let top = _this.computedTop(index);
                  let height = _this.myWinDTL[index][3] - _this.myWinDTL[index][2];
                  _this.myWinDTL[index][2] = top;
                  _this.myWinDTL[index][3] = top + height;
                  // let top = _this.myWinDTL[index][2] + y2;
                  let indexDiv = $(".myWindow").eq(index);
                  // console.log(top);
                  indexDiv.css("top", top);
                }
            }
          })


        }
      },
      //点击顶部移动整体
      moveWindowDown: function(e){
        const _this = this;
        e.stopPropagation();
        e.preventDefault();
        let thisDiv = $(e.currentTarget),
          thisDivP = thisDiv.parent(),
          maxWidth = thisDivP.parent().width() - _this.jianju,
          width = thisDivP.width(),
          height= thisDivP.height(),
          index = thisDivP.index();
        _this.startPageX = e.pageX;
        _this.startPageY = e.pageY;
        thisDiv.parent().css({
          transition: "none",
          zIndex: 10
        });
        $("html").on("mousemove", function(e1){
          e1.stopPropagation();
          e1.preventDefault();
          let left = parseInt(thisDivP.css("left")) + e1.pageX - _this.startPageX,
            top = parseInt(thisDivP.css("top")) + e1.pageY - _this.startPageY;
          left = left < _this.jianju ? _this.jianju : left + width > maxWidth ? maxWidth - width : left;
          top = top < _this.jianju ? _this.jianju : top;
          _this.myWinDTL[index - 1] = [left, left + width + _this.jianju + 2, top, top + height + _this.jianju + 2];
          thisDivP.css({
            left: left,
            top: top
          })
          _this.startPageX = e1.pageX;
          _this.startPageY = e1.pageY;
          _this.autoMove(index - 1);
        });
        $("html").on("mouseup", function(){
          let top = _this.computedTop(index - 1);
          _this.myWinDTL[index - 1][2] = top;
          _this.myWinDTL[index - 1][3] = top + height + _this.jianju + 2;
          thisDiv.parent().css({
            transition: "all .1s linear",
            top: top,
            zIndex: 2
          });
          _this.autoMove(index - 1);

          $("html").off("mousemove").off("mouseup");
        })
      },
      //点击右下角放大缩小
      moveZoom: function (e) {
        const _this = this;
        let thisDiv = $(e.currentTarget)
        _this.startPageX = e.pageX;
        _this.startPageY = e.pageY;
        thisDiv.parent().css("transition", "none");
        $("html").on("mousemove", function(e1){
          e1.stopPropagation();
          e1.preventDefault();
          let thisDivP = thisDiv.parent(),
            width = thisDivP.width() + (e1.pageX - _this.startPageX),
            height = thisDivP.height() + (e1.pageY - _this.startPageY),
            left = parseInt(thisDivP.css("left")),
            top = parseInt(thisDivP.css("top")),
            maxWidth = thisDivP.parent().width() - _this.jianju - left,
            index = thisDivP.index();
          width = width > maxWidth ? maxWidth : width;
          thisDivP.width(width);
          thisDivP.height(height);
          _this.myWinDTL[index - 1] = [left, left + width + _this.jianju + 2, top, top + height + _this.jianju + 2];
          _this.startPageX = e1.pageX;
          _this.startPageY = e1.pageY;
          console.log(_this.myWinDTL);
          _this.autoMove(index - 1);
        });
        $("html").on("mouseup", function(){
          $("html").off("mouseup").off("mousemove");
        })
      },
      initWindow: function(windowClass){
        const _this = this;
        let startTop = _this.jianju,
          startLeft = _this.jianju,
          row = 1,
          col = 1,
          rowWidth = 0,
          maxHeight = 0;
        $("." + windowClass).each(function (i, el) {
          let thisDiv = $(el),
            conW = thisDiv.parent().width(),
            conH = thisDiv.parent().height(),
            thisDivH = thisDiv.height();
          rowWidth += thisDiv.width() + _this.jianju;
          if(rowWidth > conW){
            rowWidth = thisDiv.width() + _this.jianju;
            maxHeight = thisDivH;
            col = 1;
            row++;
          }
          if(thisDivH > maxHeight){
            maxHeight = thisDivH;
          }
          thisDiv.css({
            top: startTop + (row - 1) * (200 + _this.jianju),
            left: startLeft + (col - 1) * (200 + _this.jianju),
          })
          col++;
          _this.myWinDTL.push([
            parseInt(thisDiv.css("left")),     //x1
            (parseInt(thisDiv.css("left")) + parseInt(thisDiv.width())) + _this.jianju + 2,        //x2
            parseInt(thisDiv.css("top")),   //y1
            (parseInt(thisDiv.css("top")) + parseInt(thisDiv.height())) + _this.jianju + 2,       //y2
          ])
        })
      },
    },
    mounted: function () {
      this.initWindow("myWindow");
      document.getElementsByClassName("myWindow-con")[0].style.backgroundColor = "#333";
    }
  }
</script>
<style lang="less" scoped>
  .myWindow-con{
    position: relative;
  }
  .myWindow-bg-con{
    width:0;
    height: 0;
    position: absolute;
    background: rgba(255,0,0,.3);
    z-index: 1;
  }
  .myWindow{
    width: 200px;
    height: 200px;
    border:1px solid #e3e3e3;
    z-index: 2;
    border-radius: 4px;
    position: absolute;
    box-shadow: 0 3px 7px 1px #e3e3e3;
    overflow: hidden;
    box-sizing: border-box;
    transition: all .1s linear;
    background: #fff;
    touch-action: none;
    .myWindow-header{
      width: 100%;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
      cursor: move;
    }
    .myWindow-move{
      width: 20px;
      height: 20px;
      background: url(../assets/imgs/jiao.png) no-repeat;
      position: absolute;
      right: 2px;
      bottom: 2px;
      cursor: nw-resize;
    }
  }
</style>
