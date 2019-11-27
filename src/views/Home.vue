<template>
  <div class="home">
    <router-link :to="{name: 'Children'}"> children</router-link>
    <input type="text" v-model="msg1">
    <input type="text" v-model="msg2">
    <input type="text" v-model="msg3">
    <div class="div-btn">
      <button class="btn btn-default" @click="formatDate">执行</button>
    </div>
    <div class="con">sadasds1da31d2as</div>
    <Button>
      <router-link to="/">changeColor</router-link>
    </Button>
    <hr>
    <child1>
      <template v-slot:header>
        <h2>{{homeUser}}</h2>
      </template>
      <template v-slot:default="childData">
          <h2 >{{homeUser}}</h2>
          <h3>{{childData.childUser}}</h3>
      </template>
    </child1>

    <vue-msg></vue-msg>



    <video-player class="video-player vjs-custom-skin" :options="playerOptions"></video-player>
  </div>
</template>

<script>
// @ is an alias to /src
  import child1 from "../components/Child1"
// import videoPlayer from "./videoPlay"
import videoPlayer from './Player'
// import 'video.js/dist/video-js.css'
  export default {
    name: 'home',
    components: {
      child1,videoPlayer

    },
    data: function(){
      return {
        msg1: new Date().getTime(),
        msg2: "",
        msg3: "",
        homeUser: "aaaa",
        homeObj: {a: 1},
        playerOptions: {
          width: '888',
          height: '500',
          sources: [{
            // type: "rtmp/mp4",
            // src: "rtmp://58.200.131.2:1935/livetv/hunantv"
            // src: "rtmp://58.200.131.2:1935/livetv/cctv6hd"
            src: "rtmp://58.200.131.2:1935/livetv/cctv6"
          }],
          techOrder: ['flash'],
          "autoplay": true,
          "preload": "auto",
          "loop": false,
          controls: true,
          flash : {swf : './video-js.swf'},
          controlBar: {
            captionsButton: false,
            chaptersButton: false,
            remainingTimeDisplay: false,
            progressControl: false,
            fullscreenToggle: true
          }
        },
        playerOptions1: {
          width: '888',
          height: '500',
          sources: [{
            // type: "rtmp/mp4",
            // src: "rtmp://58.200.131.2:1935/livetv/hunantv"
            // src: "rtmp://58.200.131.2:1935/livetv/cctv6hd"
            src: "rtmp://58.200.131.2:1935/livetv/cctv8hd"
          }],
          techOrder: ['flash'],
          "autoplay": true,
          "preload": "auto",
          "loop": false,
          controls: true,
          flash : {swf : './video-js.swf'},
          controlBar: {
            captionsButton: false,
            chaptersButton: false,
            remainingTimeDisplay: false,
            progressControl: false,
            fullscreenToggle: true
          }
        },
        playerOptions2: {
          width: '888',
          height: '500',
          sources: [{
            // type: "rtmp/mp4",
            // src: "rtmp://58.200.131.2:1935/livetv/hunantv"
            // src: "rtmp://58.200.131.2:1935/livetv/cctv6hd"
            src: "rtmp://58.200.131.2:1935/livetv/cctv10hd"
          }],
          techOrder: ['flash'],
          "autoplay": true,
          "preload": "auto",
          "loop": false,
          controls: true,
          flash : {swf : './video-js.swf'},
          controlBar: {
            captionsButton: false,
            chaptersButton: false,
            remainingTimeDisplay: false,
            progressControl: false,
            fullscreenToggle: true
          }
        },
        playerOptions3: {
          width: '888',
          height: '500',
          sources: [{
            // type: "rtmp/mp4",
            // src: "rtmp://58.200.131.2:1935/livetv/hunantv"
            // src: "rtmp://58.200.131.2:1935/livetv/cctv6hd"
            src: "rtmp://58.200.131.2:1935/livetv/schd"
          }],
          techOrder: ['flash'],
          "autoplay": true,
          "preload": "auto",
          "loop": false,
          controls: true,
          flash : {swf : './video-js.swf'},
          controlBar: {
            captionsButton: false,
            chaptersButton: false,
            remainingTimeDisplay: false,
            progressControl: false,
            fullscreenToggle: true
          }
        },
      }
    },
    mounted: function () {
      this.ceshi = function(){
        console.log("-*------------------");
        console.log(this);
        console.log("-*------------------");
        this.data = 111;
        console.log(this.data);
      };
      this.ceshi.prototype.add = function(d){
        this.data = d
      }
      console.log(this.ceshi);
      let b = new  this.ceshi();
      console.log(b);
      b.add(20);
      console.log(b);
    },
    methods:{
      formatDate: function(){
        console.log(this.utils.formatTime(this.msg1, this.msg2, this.msg3));
      },
      ceshi(){},
    }

  }
</script>
<style lang="less">
 .home{
   .video-js .vjs-big-play-button{
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   .vjs-has-started .vjs-control-bar{
     display: flex;
     justify-content: space-between;
   }
   .vjs-button > .vjs-icon-placeholder:before {
     font-size: 1.8em;
     line-height: 2.67;
   }
   .video-js .vjs-volume-panel{
     display: none;
   }
 }

</style>

<style lang="less" scoped>
  .div-btn{
    margin: 20px;
  }
  .con{
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
  }
  .video-con{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
</style>
