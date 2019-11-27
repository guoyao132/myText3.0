<template>
  <div>
    <div id="map">

    </div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content">
        <ul id="message">

        </ul>
      </div>
    </div>
    <form class="form-inline">
      <label>Geometry type &nbsp;</label>
      <select name="" id="type">
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
        <option value="None">None</option>
      </select>
    </form>
  </div>
</template>

<script>
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import VectorLayer from 'ol/layer/Vector';
  import OSM from 'ol/source/OSM';
  import VectorSource from 'ol/source/Vector';
  import {defaults} from 'ol/control'
  import Draw from 'ol/interaction/Draw'
  import Overlay from 'ol/Overlay'
  import {toStringHDMS} from 'ol/coordinate'
  import {transform} from 'ol/proj'

  export default {
    name: 'MainDiv',
    data () {
      return {
      }
    },
    mounted:function(){
      var container = document.getElementById('popup');
      var content = document.getElementById('popup-content');
      var closer = document.getElementById('popup-closer');
      //创建一个叠加层，将弹出式窗口定位到地图。
      var overlay = new Overlay(({
        element: container,
        autoPan: true,
        autoPanAnimation:{
          duration:250
        }
      }));
      //点击关闭按钮  关闭弹窗
      closer.onclick = function () {
        //不显示弹出框
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

      var raster = new TileLayer({
        source:new OSM()
      });
      var source = new VectorSource({wrapX:false});

      //ol.layer.Vector用于显示在客户端渲染的矢量数据。
      var vector = new VectorLayer({
        source:source
      });

      //地图部分
      var map = new Map({
        layers:[raster,vector],
        target:'map',
        overlays:[overlay],
        view:new View({
          projection:'EPSG:4326',
          center:[120,30],
          zoom:4
        }),
        controls:defaults({
          attributionOptions:{
            collapsible:false
          }
        })

      });

      var typeSelect = document.getElementById('type');
      var draw;
      function addInteraction() {
        var value = typeSelect.value;
        if(value !== 'None'){
          draw = new Draw({
            source:source,
            type: typeSelect.value
          });
          map.addInteraction(draw);
        }
      }
      typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
      };

      addInteraction();
      //向地图中添加点击处理程序以呈现弹出式窗口。
      map.on('click',function (evt) {
        console.log(evt)
        var coordinate = evt.coordinate;
        // var hdms = toStringHDMS(transform(
        //     coordinate,'EPSG:3857','EPSG:4326'
        // ));
        var hdms = toStringHDMS(coordinate);
        content.innerHTML = '<ul>'+'<li>'+"坐标："+'<span>'+'<code>'+hdms+'</code>'+'</span>'+'</li>'+'</ul>';
        overlay.setPosition(coordinate);
        console.log(source)
      });
    }
  }
</script>


<style scoped>
  #map{
    width: 100%;
    height: 500px;
  }
  ul li{list-style: none;}
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 350px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
</style>