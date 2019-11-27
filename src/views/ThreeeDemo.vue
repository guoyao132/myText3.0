<template>
  <div class="ThreeeDemo">
    <div class="three-con" ref="divThreeCon">

    </div>
  </div>
</template>

<script>
  export default {
    name: "ThreeeDemo",
    create() {
    },
    data() {
      return {}
    },
    methods: {
      //代码格式样例
      init(){
        var renderer, width, height;
        function initThree() {
          width = document.getElementById('canvas-frame').clientWidth;
          height = document.getElementById('canvas-frame').clientHeight;
          renderer = new THREE.WebGLRenderer({
            antialias : true
          });
          renderer.setSize(width, height);
          document.getElementById('canvas-frame').appendChild(renderer.domElement);
          renderer.setClearColor(0xFFFFFF, 1.0);
        }

        var camera;
        function initCamera() {
          camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
          camera.position.x = 0;
          camera.position.y = 1000;
          camera.position.z = 0;
          camera.up.x = 0;
          camera.up.y = 0;
          camera.up.z = 1;
          camera.lookAt({
            x : 0,
            y : 0,
            z : 0
          });
        }

        var scene;
        function initScene() {
          scene = new THREE.Scene();
        }

        var light;
        function initLight() {
          light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
          light.position.set(100, 100, 200);
          scene.add(light);
        }

        var cube;
        function initObject() {

          var geometry = new THREE.Geometry();
          var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
          var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

          // 线的材质可以由2点的颜色决定
          var p1 = new THREE.Vector3( -100, 0, 100 );
          var p2 = new THREE.Vector3(  100, 0, -100 );
          geometry.vertices.push(p1);
          geometry.vertices.push(p2);
          geometry.colors.push( color1, color2 );

          var line = new THREE.Line( geometry, material, THREE.LinePieces );
          scene.add(line);
        }
        function render()
        {
          renderer.clear();
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        }
        function threeStart() {
          initThree();
          initCamera();
          initScene();
          initLight();
          initObject();
          render();
        }
      },
      //样例 一个旋转的正方体
      init1(){
        const THREE = this.$THREE;
        const _this = this;
        let width = _this.$refs.divThreeCon.clientWidth;
        let height = _this.$refs.divThreeCon.clientHeight;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);



        var geometry = new THREE.BoxGeometry(2, 5, 2);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate(){
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          // cube.rotation.y += 0.01;
          // cube.rotation.z += 0.01;
          renderer.render(scene, camera);
        }
        animate();
        _this.$refs.divThreeCon.appendChild(renderer.domElement);
      },
      //绘制一条线
      init2(){
        const THREE = this.$THREE;
        const _this = this;

        var renderer, width, height;
        let conDom = _this.$refs.divThreeCon;
        width = conDom.clientWidth;
        height = conDom.clientHeight;


        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height);
        conDom.appendChild( renderer.domElement );

        var camera = new THREE.PerspectiveCamera( 85, width / height, 1, 100 );
        camera.position.set( 0, 0, 30 );
        camera.lookAt( 0, 0, 0 );

        var scene = new THREE.Scene();

        //create a blue LineBasicMaterial
        var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( -10, 10, 10));
        geometry.vertices.push(new THREE.Vector3( 0, 10, 10));
        geometry.vertices.push(new THREE.Vector3( 10, 0, 10));

        var line = new THREE.Line( geometry, material );
        scene.add( line );
        renderer.render( scene, camera );
        //
        //
        // var renderer, width, height;
        // function initThree(){
        //   console.log(_this.$refs.divThreeCon);
        //   width = _this.$refs.divThreeCon.clientWidth;
        //   height = _this.$refs.divThreeCon.clientHeight;
        //   console.log(width);
        //   console.log(height);
        //   renderer = new THREE.WebGLRenderer({
        //     antialias: true
        //   });
        //   renderer.setSize(width, height);
        //   _this.$refs.divThreeCon.appendChild(renderer.domElement);
        //   renderer.setClearColor(0x000000, 1.0);
        // }
        // var scene;
        // function initScene(){
        //   scene = new THREE.Scene();
        // }
        // var camera;
        // function initCamera(){
        //   camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        // };
        // var light;
        // function initLight(){
        //   light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        //   light.position.set(0,0,0);
        //   scene.add(light);
        // }
        // var cube;
        // function initObject(){
        //   var geometry = new THREE.Geometry();
        //   var material = new THREE.LineBasicMaterial({color: 0x00FF00});
        //   geometry.vertives.push(new THREE.Vector3(-100, 0, 100));
        //   geometry.vertives.push(new THREE.Vector3(0, 10, 0));
        //   geometry.vertives.push(new THREE.Vector3(10, 0, 0));
        //   let line = new THREE.Line(geometry, material);
        //   scene.add(line);
        // }
        // function threeStart(){
        //   initScene();
        //   initCamera();
        //   initThree();
        //   // initLight();
        //   renderer.clear();
        //   renderer.render(scene, camera);
        // }
        // threeStart();
      },
    },
    mounted() {
      this.init2();
    },
  }
</script>

<style lang="less" scoped>
  .ThreeeDemo {
    .three-con{
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      margin: 20px auto;
    }
  }
</style>