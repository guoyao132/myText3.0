var Data = {
  //K线数据 id, open, close, high, low, volume
  LBase:[
  ],
  //扩展数据及图定义: 均值、buy1, buy2, "方差", "成交", "总资产"
  LExtend:[
    //线定义及数据
    {
      title:"default",
      lines:[
        {
          name:"上限",
          type: "line", //bar, line
          data:[]
        },
      ]
    },
    {
      title:"方差",
      lines:[
        {
          name:"方差",
          type: "line", //bar, line
          data:[]
        },
      ]
    },
  ],
  R:{
    "aa": 0,
    sleep: [],
  },
}

//计算历史最高值
((d)=>{
  let highestHis = [d[0]];
  d.forEach((it, idx)=>{
    if(idx === 0) return;
    highestHis.push(Math.max(it, highestHis[highestHis.length-1]))
  })
  return highestHis;
})(data)
timeData = [];
kLineData = [];
volume1 = [];
volume2 = [];
let lBase = reqData.LBase; //基础数据
for(let i = 0; i < lBase.length; i++){
  let v = lBase[i];
  kLineData.push([
    v.Open, v.Close, v.Low, v.High
  ])
  let timtI = _this.formatTime(v.Id);
  timeData.push(timtI);
  if(v.Close - v.Open >= 0) {
    volume1.push("-");
    volume2.push(parseInt(v.Volume / 10000));
  }else{
    volume1.push(parseInt(v.Volume / 10000));
    volume2.push("-");
  }
}
let option = {
  dataZoom: [
    {
      startValue: timeData.length - 50,
      endValue: timeData.length - 1,
    },
    {
      startValue: timeData.length - 50,
      endValue: timeData.length - 1,
    },
  ],
  grid: [{},{}],
  yAxis: [{},{}],
  xAxis: [
    {
      data: timeData,
    },
    {
      data: timeData,
    },
  ],
  series: [
    {
      data: kLineData,
    },
    {
      data: volume1
    },
    {
      data: volume2
    },
  ]
};
let lExtend = reqData.LExtend;
let xIndex = [0,1],
  yTop = 510,
  yJianju = 15,
  yHeight = 80;
for(let i = 0; i < lExtend.length; i++){
  let v = lExtend[i];
  if(v.title == 'default'){
    let lines = v.lines;
    for(let j = 0; j < lines.length; j++){
      let linexI = lines[j];
      let lineStyle = {
        width: 1,
      };
      if(linexI.name == '上限' || linexI.name == '下限'){
        lineStyle.color = "#555";
      }
      option.series.push({
        name: linexI.name,
        type:'line',
        symbol:'none',
        large: true,
        sampling: "average",
        smooth: "true",
        lineStyle: lineStyle,
        data: linexI.data,
      })
    }
  }else{
    let axisIndex = xIndex[xIndex.length - 1] + 1;
    console.log(axisIndex);
    xIndex.push(axisIndex);
    let gridObj = {
      left: 70,
      right: 75,
      height: yHeight,
      top: yTop,
    }
    if(1 || i % 2 == 0){
      gridObj.show = true;
      gridObj.backgroundColor = "#f0f0f0";
    }
    option.grid.push(gridObj);
    option.dataZoom.push({
      startValue: timeData.length - 50,
      endValue: timeData.length - 1,
    });
    let xAxisObj = {
      gridIndex: axisIndex,
      type : 'category',
      data: timeData,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true
      },
      axisPointer: {
        label: {
          show: false
        }
      },
    };
    if(i != lExtend - 1){
      xAxisObj.axisLabel = {
        show: false,
      };
    }
    option.xAxis.push(xAxisObj);
    option.yAxis.push({
      gridIndex: axisIndex,
      name : v.title,
      type : 'value',
      min: "dataMin",
      max: "dataMax",
      position: 'right',
      nameLocation : 'middle',
      nameGap : 55,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    });
    yTop += yHeight + yJianju;
    let lines = v.lines;
    for(let j = 0; j < lines.length; j ++){
      let linesI = lines[j];
      let seriesObj = {};
      if(linesI.type == "line"){
        seriesObj = {
          name: linesI.name,
          type:'line',
          symbol:'none',
          large: true,
          sampling: "average",
          xAxisIndex: axisIndex,
          yAxisIndex: axisIndex,
          lineStyle: {
            width: 1,
          },
          data: linesI.data
        };
      }else if(linesI.type == "bar"){
        seriesObj = {
          name: linesI.name,
          type:'bar',
          large: true,
          xAxisIndex: axisIndex,
          yAxisIndex: axisIndex,
          barGap: "-100%",
          // itemStyle: {
          //   color: "#339AF2"
          // },
          data: linesI.data,
        };
      }
      option.series.push(seriesObj);
    }
  }
}
console.log(option);
_this.mychart.setOption(option);
_this.mychart.hideLoading();