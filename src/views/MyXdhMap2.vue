<template>
  <div>
    <Button @click="imgSrc='http://t4.tianditu.com/DataServer?T=vec_w&x=1684&y=779&l=11&tk=464554f64aa4f4e90e0321c17a57a331';myAddLayer()">
      添加
    </Button>
    <Button @click="myRemoveLayer">
      删除
    </Button>
    <xdh-map v-bind="xdhMapOption" ref="divMap" @ready="readyMap">
      <!--<xdh-map-track :routes="line1" :src="car" :steps="50"></xdh-map-track>-->
      <!--<xdh-map-line-->
        <!--:routes="line1"-->
        <!--stroke-color="blue"-->
        <!--:stroke-line-dash="[10]"-->
        <!--:stroke-width="4"-->
      <!--&gt;</xdh-map-line>-->

      <!--<xdh-map-track :routes="line2" :loop="false" :src="car"></xdh-map-track>-->
      <!--<xdh-map-line-->
        <!--:routes="line2"-->
        <!--stroke-color="red"-->
        <!--:stroke-width="4"-->
      <!--&gt;</xdh-map-line>-->

      <!--<xdh-map-track v-bind="trackOption" @move="handleMove"></xdh-map-track>-->
      <!--<xdh-map-line-->
        <!--:routes="passLine"-->
        <!--stroke-color="green"-->
        <!--:stroke-line-dash="[10]"-->
        <!--:stroke-width="4"-->
      <!--&gt;</xdh-map-line>-->
      <!--<xdh-map-line-->
        <!--:routes="toLine"-->
        <!--stroke-color="red"-->
        <!--:stroke-line-dash="[10]"-->
        <!--:stroke-width="4"-->
      <!--&gt;</xdh-map-line>-->
    </xdh-map>
  </div>
</template>

<script>
  import { XdhMap, XdhMapTrack, XdhMapLine, XdhMapCircle } from 'xdh-map';
  import posIcon from '../assets/imgs/jiantou.png'

  import img from '../assets/imgs/Amap.png'
  import {ImageStatic} from "ol/source";
  import ImageLayer from "ol/layer/Image";
  import { Projection } from "ol/proj";
  export default {
    name: 'MyXdhMap2',
    components: {
      XdhMap,
      XdhMapTrack,
      XdhMapLine,
      XdhMapCircle
    },
    data() {
      const _this = this;
      return {
        trackOption: {
          routes: [[119.534941, 29.817538], [120.401155, 29.827967], [121.401155, 29.057967]],
          src: posIcon

        },
        options: {
          position: [],
          src: posIcon
        },
        xdhMapOption: {
          layerConfig: {
            Amap: {
              title: '高德',
              url: `http://1.119.197.166:81/gaodeMap/mapabc/roadmap/{z}/{x}/{y}.png`,
              // server: `./styles/imgs/map/map_bg.png`,
            },
          },
          center: [116.42037200, 39.51866601],
          zoom: 11,//todo 机场查看具体等级
        },
        center: [120.0, 30.186209],
        car: require('../assets/imgs/bdz.png'),
        line1: [
          [119.960972, 30.246209],
          [119.975288, 30.235707],
          [119.979764, 30.235124],
          [120.039173, 30.24337],
          [120.05753, 30.217952],
          [120.058055, 30.21669],
          [120.054571, 30.20782],
          [120.0525, 30.19384],
          [120.054734, 30.185295],
          [120.073708, 30.166286],
          [120.081231, 30.160251]
        ],
        line2: [
          [119.40466, 30.167937],
          [119.553405, 30.22849],
          [119.58027, 30.028843],
          [119.872781, 30.159321]
        ],
        // line3: [[119.534941, 29.817538], [120.401155, 29.827967], [121.401155, 29.057967]],
        passLine: [],
        toLine: [],
        position: [],
        position2: [],
        isShow: true,
        myMap: null,
        imgLarer: null,
        imgSrc: '',
      };
    },
    methods: {
      myAddLayer(){
        const _this =  this;
        var extent = [116.362838, 39.451591, 116.498279, 39.539549];//表示图片的尺寸
        var projection = new Projection({
          code: 'EPSG:4326',
          extent: extent
        });
        let imageLayer = new ImageLayer({
          source: new ImageStatic({
            url: _this.imgSrc == '' ? img : _this.imgSrc,
            projection: 'EPSG:4326',
            // crossOrigin: '',
            imageExtent: extent,
          })
        })
        if(this.imgLarer){
          return
        }
        this.imgLarer = imageLayer;
        if(this.myMap){
          this.myMap.addLayer(imageLayer);
        }
      },
      myRemoveLayer(){
        if(this.myMap && this.imgLarer){
          this.myMap.removeLayer(this.imgLarer);
          this.imgLarer = null;
        }
      },
      readyMap(map, mv){
        this.myMap = map;
        var extent = [116.362838, 39.451591, 116.962838, 40.93549];//表示图片的尺寸   左 下 右 上
        var projection = new Projection({
          code: 'EPSG:4326',
          extent: extent
        });
        let imageLayer = new ImageLayer({
          source: new ImageStatic({
            url: img,
            projection: 'EPSG:4326',
            // crossOrigin: '',
            imageExtent: extent,
          })
        })
        this.imgLarer = imageLayer;

        map.addLayer(imageLayer);
        this.myRemoveLayer();
        this.myAddLayer();
        this.myRemoveLayer();
        this.myAddLayer();
        this.myRemoveLayer();
        this.myAddLayer();

        window.mv = mv;
        window.ol = map;
        window.img = imageLayer;

      },
      handleMove(routes, index) {
        this.passLine = routes.slice(0, index);
        this.toLine = routes.slice(index);
        this.position = routes[index];

        if(index > 50) {
          this.$set(this.options, 'position', routes[index - 50]);
        }
      }
    },
    mounted() {

    }
  };
</script>