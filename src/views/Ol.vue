<template>
  <div class="Ol">
    <br>
    <br>
    <br>
    <br>
    <hr>
    <hr>
    <div id="map" ref="rootmap">

    </div>
  </div>
</template>

<script>
  import "ol/ol.css";
  import { Map, View, Feature} from "ol";
  import { Point} from "ol/geom";
  import { fromLonLat, Projection } from "ol/proj";
  import { Style, Icon } from "ol/style";
  import TileLayer from "ol/layer/Tile";
  import ImageLayer from "ol/layer/Image";
  import {getCenter} from 'ol/extent';
  import {OSM, XYZ, Vector, ImageStatic} from "ol/source";
  import lyVector from "ol/layer/Vector"
  // import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer.js';
  import proj4 from 'ol/proj';

  import img from '../assets/imgs/Amap.png'

  export default {
    name: "Ol",
    create() {

    },
    data() {
      return {
        layers: [],
      }
    },
    methods: {
      tileClick(test){
        for (let l = 0; l < this.layers.length; l++) {
          if (this.layers[l].values_.title === test)
            this.layers[l].setVisible(true);
          else
            this.layers[l].setVisible(false);
        }
        console.log(this.layers);
      },
      init(){

        var saoguan = new Feature({
          geometry:new Point(fromLonLat([116.42037200, 39.51866601]))
        });


        saoguan.setStyle(new Style({
            image:new Icon({
              color:'#4271AE',
              src:'./style/imgs/map/bdz.png'
            })
          })
        );

        var source = new Vector({
          features:[saoguan]
        });
        var layerListeners = {
          featureclick: function (e) {
            console.log(e.object.name + " says: " + e.feature.id + " clicked.");
            return false;
          }
        }
        var layer = new lyVector({
          source: source,
          eventListeners: layerListeners
        });


        var mapcontainer = this.$refs.rootmap;
        this.map = new Map({
          layers: [
            new TileLayer({
              visible: true,
              title: '高德',
              source: new XYZ({
                url: "http://39.98.46.73:81/gaodeMap/mapabc/roadmap/{z}/{x}/{y}.png"
                // url: "https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
                // url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
              })
            }),
            layer
          ],
          target: "map",
          view: new View({
            center: [116.42037200, 39.51866601],
            projection: 'EPSG:4326',
            zoom: 14,
            minZoom: 14,
            maxZoom: 18,
          })

        });
      },
      init1(){
        var extent = [116.362838, 39.451591, 116.498279, 39.539549];//表示图片的尺寸
        var projection = new Projection({
          code: 'EPSG:4326',
          extent: extent
        });
        var map = new Map({  //初始化map
          target: 'map',
          layers: [
            new TileLayer({
              visible: true,
              title: '高德',
              source: new XYZ({
                url: `http://1.119.197.166:81/gaodeMap/mapabc/roadmap/{z}/{x}/{y}.png`,
              })
            }),
            new ImageLayer({
              source: new ImageStatic({
                url: img,
                projection: 'EPSG:4326',
                imageExtent: extent
              })
            })
          ],
          view: new View({
            // projection: projection,
            projection: 'EPSG:4326',
            center: [116.42037200, 39.51866601],
            zoom: 13
          })
        });

      },
    },
    mounted() {
      this.init1();
    },
  }
</script>

<style lang="less" scoped>
  .Ol {
    #map{
      width: 100%;
      height: 720px;
    }
  }
</style>