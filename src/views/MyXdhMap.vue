<template>
  <div class="XdhMap">
    <h1 @click="zhanshiType = 'biandianzhan'">变电站</h1>
    <h1 @click="zhanshiType = 'kaibizhan'">开闭站</h1>
    <h1 @click="zhanshiType = 'peidianshi'">配电室</h1>
    <h1 @click="zhanshiType = 'kehu'">客户</h1>
    <xdh-map v-bind="xdhMapOption">
      <template v-for="(list, key) in mapIconData">
        <xdh-map-html
          v-show="key == zhanshiType"
          :position="[item.lon, item.lat]"
          v-for="item in list">
          <div :class="key + ' show_child_h4'"
               :data-marker_id="item.id"
               style="cursor: pointer; width: 42px; height: 64px;">
            <img src="../assets/imgs/bdz.png" :class="key" style="width: 100%; height: 100%;">
            <h4 :class="key"
                style="min-width: max-content; transform: translateX(-50%); padding-left: 42px; opacity: 0; height: 0px; overflow: hidden;">
              {{item.stationName || item.customer_name}}
            </h4>
          </div>
        </xdh-map-html>
      </template>
    </xdh-map>
  </div>
</template>

<script>

  export default {
    name: "MyXdhMap",
    create() {

    },
    data() {
      return {
        zhanshiType: "",
        xdhMapOption: {
          center: [116.42037200, 39.51866601],
          minZoom: 14,
          maxZoom: 18,
          zoom: 14,
          layerConfig: {
            Amap: {
              title: '高德',
              // server: 'https://vdata.amap.com/tiles?mapType=normal&v=3&style=5&rd=2&flds=region,road&t=10,837,395;10,835,397;10,834,393;10,836,393;10,837,394;10,837,396;10,834,397;10,836,397;10,837,393;10,837,397&lv=10&key=49eb15ce402e714f99c9b93c377d459c&preload=0',
              // server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn',
              server: 'http://39.98.46.73:81/gaodeMap/mapabc/roadmap/{z}/{x}/{y}.png',
              preview: require('../assets/imgs/Amap.png')
            },
          },
          type: 'Amap',
        },
        htmlPosition: [116.42037200, 39.51866601],
        mapIconData: [],
      }
    },
    methods: {},
    mounted() {
      $(".XdhMap").on("mouseover", ".show_child_h4 img", function () {
        $(this).parent().css({
          "z-index": 1,
          "transform" : "scale(1.1)",
        });
        $(this).next(':not(".dingwei")').css({
          opacity: 1,
          height: 18
        })
      }).on("mouseout", ".show_child_h4 img", function () {
        $(this).parent().css({
          "z-index": 0,
          "transform" : "scale(1)",
        });
        $(this).next(':not(".dingwei")').css({
          opacity: 0,
          height: 0
        })
      });

      this.axios.get("/eplatform/a/dpweb/station/getStationList").then(resp => {
        let data = resp.data.data;
        console.log(data);
        this.mapIconData = data;
      })
    },
  }
</script>

<style lang="less" scoped>
  .XdhMap {

  }
</style>