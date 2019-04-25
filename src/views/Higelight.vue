<template>
  <div class="echarts7">
    <div class="left">
      <div v-for="v in languageArr" @click="language=v">
        {{v}}
      </div>
      <div class="textarea-con">
        <highlight-code :lang="language">
          @requires_authorization
          def somefunc(param1='', param2=0):
          r'''A docstring'''
          if param1 > param2: # interesting
          print 'Gre\'ater'
          return (param2 - param1 + 1 + 0b10l) or None

          class SomeClass:
          pass

          >>> message = '''interpreter
          ... prompt'''
        </highlight-code>

        <!-- Inline Code Block -->
        <highlight-code :lang="language">
          function $initHighlight(block, cls) {
          try {
          if (cls.search(/\bno\-highlight\b/) != -1)
          return process(block, true, 0x0F) +
          ` class="${cls}"`;
          } catch (e) {
          /* handle exception */
          }
          for (var i = 0 / 2; i < classes.length; i++) {
          if (checkCondition(classes[i]) === undefined)
          console.log('undefined');
          }
          }

          export  $initHighlight;
        </highlight-code>
        <div class="text-left">
          <pre>
            <code v-html="content"></code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Highlight',
    data: function () {
      return {
        content: '\nvar vector int\n' +
          'var sum int\n' +
          'var lastClose float64\n' +
          '\n' +
          'var interval int = 1\n' +
          'func ProcessKline(data *Kline) int{\n' +
          '   interval++\n' +
          '   if lastClose>0{\n' +
          '      if data.high>lastClose{\n' +
          '         if vector>0{\n' +
          '            sum++\n' +
          '         }else{\n' +
          '            if sum>2{\n' +
          '               setOrder(string(interval),"limit", 100, data.high+1, 1)\n' +
          '            }\n' +
          '            vector = 1\n' +
          '            sum = 1\n' +
          '         }\n' +
          '      }else if data.high<lastClose{\n' +
          '         if vector<0{\n' +
          '            sum++\n' +
          '         }else{\n' +
          '            if sum>2{\n' +
          '               setOrder(string(interval),"limit", 100, data.high-1, -1)\n' +
          '            }\n' +
          '            vector = -1\n' +
          '            sum = 1\n' +
          '         }\n' +
          '      }\n' +
          '      lastClose = data.high\n' +
          '   }else{\n' +
          '      lastClose = data.high\n' +
          '   }\n' +
          '   return 0\n' +
          '}\n',
        isRight: true,
        language: "javascript",
        languageArr: ['javascript', 'python']
      }
    },
    methods: {
    },
    mounted: function () {
      $('.echarts7').height(window.innerHeight)
      window.onresize = function () {
        $('.echarts7').height(window.innerHeight)
      }
    },
  }
</script>

<style scoped>
  .echarts7{
    box-sizing: border-box;
    overflow: hidden;
  }
  .echarts7{
    display: flex;
    justify-content: space-between;

  }
  .echarts7 > div{
    width: 50%;
  }
  .echarts7 > div.left{
    padding-right: 20px;
  }
  .echarts7 > div.left .header{
    background: #E9ECF0;
    padding: 5px 10px;
  }
  .echarts7 > div.left .textarea-con{
    width: 100%;
    height: 100%;
  }
  .echarts7 > div.left textarea{
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #141414;
    color: #fff;
  }
  .echarts-con{
    min-height: 670px;
  }
</style>