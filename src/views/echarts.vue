<template>
  <div class="echarts"  tabindex="1"
       @keydown.left.exact="keyLeft"
       @keydown.ctrl.left.exact="keyLeft2"
       @keydown.right.exact="keyRight"
       @keydown.ctrl.right.exact="keyRight2"
       @keydown.up="keyUp"
       @keydown.down="keyDown"
  >
    <div class="choose-time-con" id="inputCon">
      <input type="text" id="form_datetime">
      <div class="choose-time-btn">
        <!--<img src="../assets/img/right.png" v-if="!showInput">-->
        <!--<img src="../assets/img/left.png" v-if="showInput">-->
      </div>
    </div>
    <div id="main" class="echarts-main"></div>
    <div id="main1" class="echarts-main"></div>
  </div>
</template>

<script>
  let echarts = require('echarts');
  // import "../assets/js/bootstrap-datetimepicker.min"
  // import "../assets/js/bootstrap-datetimepicker.zh-CN"
  export default {
    name: 'Echarts',
    data: function () {
      return {
        mychart: null,
        mychart1: null,
        mychart2: null,
        mychart3: null,
        mychart4: null,
        mychart5: null,
        stepLRNum: 5,
        stepUDNum: 5,
        stepTimeNum: 20, //切换时间后，显示该时间前多少数据
        showInput: false,
        timeData :[],
        nowTimeData: [],
        kLineData :[],
        MA5 :[],
        MA20 :[],
        change :[],
        leverage :[],
        risk :[],
        target:[],
        wealth:[],
      }
    },
    methods: {
      showInputFun: function(){
        this.showInput = !this.showInput;
        if(this.showInput){
          $("#inputCon").css("left", "10px");
        }else{
          $("#inputCon").css("left", "-143px");
        }
      },
      keyRight: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let dataLength = oldOption.series[0].data.length - 1;
        let sub = endValue - startValue;
        if(endValue + this.stepLRNum >= dataLength){
          endValue = dataLength;
          startValue = dataLength - sub;
        }else{
          endValue += this.stepLRNum;
          startValue += this.stepLRNum;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      keyRight2: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let dataLength = oldOption.series[0].data.length - 1;
        let sub = endValue - startValue;
        startValue = endValue;
        if(startValue >= dataLength){
          return
        }
        if(startValue + sub >= dataLength){
          endValue = dataLength;
        }else{
          endValue = startValue + sub;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      keyLeft: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let sub = endValue - startValue;
        if(startValue - this.stepLRNum <= 0){
          startValue = 0;
          endValue = 0 + sub;
        }else{
          startValue -= this.stepLRNum;
          endValue -= this.stepLRNum;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      keyLeft2: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let sub = endValue - startValue;
        endValue = startValue;
        if(endValue <= 0){
          return
        }
        if(endValue - sub <= 0){
          startValue = 0;
        }else{
          startValue = endValue - sub;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      keyDown: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let dataLength = oldOption.series[0].data.length - 1;
        let sub = endValue - startValue;
        if(endValue + this.stepUDNum >= dataLength){
          endValue = dataLength;
        }else{
          endValue += this.stepUDNum;
        }

        if(startValue - this.stepUDNum <= 0){
          startValue = 0;
        }else{
          startValue -= this.stepUDNum;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      keyUp: function(e){
        e.stopPropagation()
        e.preventDefault();
        let oldOption = this.mychart.getOption();
        let startValue = oldOption.dataZoom[0].startValue;
        let endValue = oldOption.dataZoom[0].endValue;
        let sub = endValue - startValue;
        if(sub > 20){
          startValue += this.stepUDNum;
          endValue -= this.stepUDNum;
        }
        let option = {
          dataZoom: [
            {
              startValue: startValue,
              endValue: endValue,
            },
            {
              startValue: startValue,
              endValue: endValue,
            }
          ]
        };
        this.mychart.setOption(option);
      },
      formatTime: function(time, type){
        let date = new Date(time);
        let dataStr = "";
        let y = date.getFullYear().toString(),
          m = date.getMonth() < 9 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1,
          d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() ,
          h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
          M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
          s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        dataStr = m + "/" + y.substring(2) + "/" + d + " " + h + ":" + M;
        if(type == 2){
          dataStr = y + "/" + m + "/" + d + " " + h + ":" + M;
        }
        return dataStr;
      },
      setOption: function(timeData, data1,data2,data3,data4,data5, data6,data7, data8){
        const _this = this;
        let option = {
          dataZoom: [
            {
              startValue: timeData.length - 200,
              endValue: timeData.length - 1,
            },
            {
              startValue: timeData.length - 200,
              endValue: timeData.length - 1,
            }
            // {
            //   startValue: 0,
            //   endValue: 200,
            // },
            // {
            //   startValue: 0,
            //   endValue: 200,
            // }
          ],
          xAxis: [
            {
              data: timeData,
            },
            {
              data: timeData,
            },
            {
              data: timeData,
            },
            {
              data: timeData,
            },
            {
              data: timeData,
            },
            {
              data: timeData,
            },
          ],
          series: [
            {
              data: data1,
            },
            {
              data: data2
            },
            {
              data: data3
            },
            // {
            //   data: data4
            // },
            // {
            //   data: data5
            // },
            // {
            //   data: data6
            // },
            // {
            //   data: data7
            // },
            // {
            //   data: data8
            // },
          ]
        }
        _this.mychart.setOption(option);
        _this.mychart1.setOption(option);
        _this.mychart.hideLoading();
      },
      getData: function(){
        const _this = this;
        function getJson1(){
          return _this.axios.get("/testLine.json");
        }
        function getJson2(){
          return _this.axios.get("/xbtusd3m.json");
        }
        let timeData = [],
          kLineData = [],
          MA5 = [],
          MA20 = [],
          change = [],
          leverage = [],
          risk = [],
          target = [];
        this.axios.all([getJson1(), getJson2()])
          .then(_this.axios.spread(function(req1, req2){
            let data = req1.data;
            let data2 = req2.data;
            data2.forEach(v =>{
              kLineData.push([
                v.open, v.close, v.low, v.high
              ])
            })
            data.forEach( v => {
              let timtI = _this.formatTime(v._id);
              timeData.push(timtI);
              MA5.push(v.MA5);
              MA20.push(v.MA20);
              change.push(v.change);
              leverage.push(v.leverage);
              risk.push(v.risk);
              target.push(v.target);
            });
            _this.timeData = timeData;
            _this.kLineData = kLineData
            _this.MA5 = MA5
            _this.MA20 = MA20
            _this.change = change
            _this.leverage = leverage
            _this.risk = risk
            _this.target = target;
            // let n = 200
            // timeData = timeData.splice(0, n)
            // kLineData = kLineData.splice(0, n)
            // MA5 = MA5.splice(0, n)
            // MA20 = MA20.splice(0, n)
            // change = change.splice(0, n)
            // leverage = leverage.splice(0, n)
            // risk = risk.splice(0, n)
            // target = target.splice(0, n);
            _this.setOption(timeData,kLineData,MA5,MA20,risk,leverage, target, change, []);
          }));
      },
      getUrlData: function(){
        const _this = this;
        let timeData = [],
          kLineData = [],
          MA5 = [],
          MA20 = [],
          change = [],
          leverage = [],
          risk = [],
          target = [],
          wealth = [];
        this.axios.get("/start", {params: {
            s: "2018-08-31 18:00:00",
            l: 6
          }}).then(req =>{
          let data = req.data.L;
          data.forEach( v => {
            kLineData.push([
              v.Open, v.Close, v.Low, v.High
            ])
            let timtI = _this.formatTime(v.Id);
            timeData.push(timtI);
            MA5.push(v.MA5);
            MA20.push(v.MA20);
            change.push(v.Risk);
            leverage.push(v.Leve);
            risk.push(v.Position);
            target.push(v.Change);
            wealth.push(v.Wealth);
          });
          _this.timeData = timeData;
          _this.kLineData = kLineData
          _this.MA5 = MA5
          _this.MA20 = MA20
          _this.change = change
          _this.leverage = leverage
          _this.risk = risk
          _this.target = target;
          _this.wealth = wealth;
          // let n = 1000;
          // timeData = timeData.slice(0, n);
          // _this.nowTimeData = timeData;
          // kLineData = kLineData.slice(0, n);
          // MA5 = MA5.slice(0, n);
          // MA20 = MA20.slice(0, n);
          // change = change.slice(0, n);
          // leverage = leverage.slice(0, n);
          // risk = risk.slice(0, n);
          // target = target.slice(0, n);
          _this.setOption(timeData,kLineData,MA5,MA20,risk,leverage, target, change, wealth);
        });
      },
    },
    mounted: function () {
      const _this = this;
      let height = window.innerHeight / 6;
      $(".echarts-main").height(height);
      this.mychart = echarts.init($("#main")[0]);
      this.mychart1 = echarts.init($("#main1")[0]);
      let option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'}
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 1,
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 1,
            xAxisIndex: [0]
          }
        ],
        grid: [
          {
            left: 20,
            right: 100,
            height: '85%',
            top: "5%"
          },
        ],
        xAxis : [
          {
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 1,
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 2,
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 3,
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 4,
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true
            },
            axisLabel: {
              show: false,
            },
          },
          {
            gridIndex: 5,
            type : 'category',
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
        ],
        yAxis : [
          {
            name : 'k线 M5 M20',
            type : 'value',
            position: 'right',
            nameLocation : 'middle',
            nameGap : 85,
            min: "dataMin",
            max: "dataMax",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name : '标准差(风险)',
            type : 'value',
            position: 'right',
            min: "dataMin",
            max: "dataMax",
            nameLocation : 'middle',
            nameGap : 85,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name : 'leverage',
            type : 'value',
            position: 'right',
            nameLocation : 'middle',
            min: "dataMin",
            max: "dataMax",
            nameGap : 85,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 3,
            name : '目标持仓',
            type : 'value',
            position: 'right',
            min: "dataMin",
            max: "dataMax",
            nameLocation : 'middle',
            nameGap : 85,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 4,
            name : '持仓调整量',
            type : 'value',
            min: "dataMin",
            max: "dataMax",
            position: 'right',
            nameLocation : 'middle',
            nameGap : 85,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 5,
            name : '总资产',
            type : 'value',
            min: "dataMin",
            max: "dataMax",
            position: 'right',
            nameLocation : 'middle',
            nameGap : 85,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          }
        ],
        series : [
          {
            name:'k线',
            type:'candlestick',
            data:[],
            itemStyle: {
              color: "green",
              color0: "red",
              borderColor: "green",
              borderColor0: "red"
            }

          },
          {
            name:'MA5',
            type:'line',
            data:[]
          },
          {
            name:'MA20',
            type:'line',
            data:[]
          },
          {
            name:'风险',
            type:'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
          },
          {
            name:'leverage',
            type:'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: []
          },
          {
            name:'目标',
            type:'bar',
            barGap: 0,
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: []
          },
          {
            name:'调整量',
            type:'bar',
            xAxisIndex: 4,
            yAxisIndex: 4,
            data: []
          },
          {
            name:'总资产',
            type:'line',
            xAxisIndex: 5,
            yAxisIndex: 5,
            data: []
          },
        ]
      };
      option.xAxis =[{
        type : 'category',
        data: [],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: true
        }
      }];
      option.yAxis =[{
        name : 'k线 M5 M20',
        type : 'value',
        position: 'right',
        nameLocation : 'middle',
        nameGap : 85,
        min: "dataMin",
        max: "dataMax",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      }];
      option.series =[{
        name:'k线',
        type:'candlestick',
        data:[],
        itemStyle: {
          color: "green",
          color0: "red",
          borderColor: "green",
          borderColor0: "red"
        }
      },];
      this.mychart.setOption(option);
      option.yAxis =[{
        name : 'k线 M5 M20',
        type : 'value',
        position: 'right',
        nameLocation : 'middle',
        nameGap : 85,
        min: "dataMin",
        max: "dataMax",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      }];
      option.series =[{
        name:'k线',
        type:'candlestick',
        data:[],
        itemStyle: {
          color: "green",
          color0: "red",
          borderColor: "green",
          borderColor0: "red"
        }
      },];
      this.mychart1.setOption(option);
      this.mychart2.setOption(option);
      this.mychart3.setOption(option);
      this.mychart4.setOption(option);
      this.mychart5.setOption(option);
      echarts.connect([this.mychart, this.mychart1])
      this.mychart.on("datazoom", function(params){
        return
        // console.log("datazoom")
        // console.log(params)
        let start = params.start;
        let end = params.end;
        if(start != 0 && !start){
          start = params.batch[0].start;
          end = params.batch[0].end;
        }
        if(start == 0){
          console.log("start");
          let oldOption = _this.mychart.getOption();
          // console.log(_this.nowTimeData);
        }
        if(end == 100){
          console.log("end");
          console.log(_this.timeData);
          let endTime = _this.nowTimeData[_this.nowTimeData.length - 1];
          console.log(endTime);
          console.log(_this.timeData.indexOf(endTime));
        }
      })
      this.mychart.showLoading();
      // this.getData();
      this.getUrlData();
      $('#form_datetime').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 3,
        minView: 1,
        showMeridian: 0,
        language:  'zh-CN',
        pickerPosition: "bottom-right"
      }).on('changeDate', function(ev){
        let oldOption = _this.mychart.getOption();
        let timeArr = oldOption.xAxis[0].data;
        let chooseTime = new Date($("#form_datetime").val());
        let hasTime = -1;
        for(let i = 0; i < 10; i++){
          chooseTime.setMinutes(i);
          chooseTime.setSeconds(i);
          let dataStr = _this.formatTime(chooseTime);
          hasTime = timeArr.indexOf(dataStr);
          if(hasTime != -1){
            break;
          }
        }
        if(hasTime == -1){
          alert("未找到该时间");
        }else{
          let startValue = oldOption.dataZoom[0].startValue;
          let endValue = oldOption.dataZoom[0].endValue;
          let sub = endValue - startValue;
          let s, e;
          if(hasTime - _this.stepTimeNum <= 0){
            s = 0;
          }else{
            s = hasTime - _this.stepTimeNum;
          }
          if(hasTime + sub >= timeArr.length){
            e = timeArr.length;
          }else{
            e = hasTime + sub;
          }
          let o = {
            dataZoom: [
              {
                startValue: s,
                endValue: e,
              },
              {
                startValue: s,
                endValue: e,
              }
            ]
          };
          _this.mychart.setOption(o);
        }
      });
    },
  }
</script>
<style>
  @import "../assets/css/bootstrap-datetimepicker.min.css";
</style>
<style scoped>
  .echarts{
    position: relative;
  }
  .echarts .choose-time-con{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
  }
  .echarts .choose-time-con:after{
    content: '';
    display: block;
    clear: both;
  }
  .echarts .choose-time-con input{
    width: 143px;
    padding: 0 5px;
    float: left;
  }
  .echarts .choose-time-con{
    transition: left .2s linear;
  }
  .echarts .choose-time-con .choose-time-btn{
    float: left;
    width: 30px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
  }
  .echarts .choose-time-con .choose-time-btn img{
    width: 20px;
    height: 20px;
  }

  .echarts .echarts-main{
    width: 99%;
    height: 800px;
  }
</style>