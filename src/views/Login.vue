<template>
  <div class="Login">
    <div class="content">
      <div class="div-img-con">
        <div class="img-con img-bg-map"></div>
        <div class="img-con img-bg-xianlu"></div>
        <div class="img-con img-bg-fangzi"></div>
        <div class="img-con img-bg-fangzi1"></div>
        <div class="img-con img-bg-zuobiao"></div>
        <div class="img-con img-bg-zuobiao1"></div>
      </div>
      <div class="login-con">
        <div class="header">
          <img src="../assets/imgs/l_left.png" class="img-m img-s"/>
          <img src="../assets/imgs/l_left_l.png" class="img-l"/>
          <span>北京大兴国际机场智慧能源综合服务平台</span>
          <img src="../assets/imgs/l_right.png" class="img-m img-s"/>
          <img src="../assets/imgs/l_right_l.png" class="img-l"/>
        </div>
        <form id="loginForm" class="form-signin" action="${ctx}/login" method="post">
          <div class="login">
            <div class="login-header">登录</div>
            <div class="input-con">
              <img src="../assets/imgs/l_input.png" class="img-input img-m img-s"/>
              <img src="../assets/imgs/l_input_light.png" class="img-input-light img-m img-s"/>
              <img src="../assets/imgs/l_input_l.png" class="img-input img-l"/>
              <img src="../assets/imgs/l_input_light_l.png" class="img-input-light img-l"/>
              <input autoComplete="off" id="iptUserName" name="username" type="text" placeholder="请输入用户名">
            </div>
            <div class="input-con">
              <img src="../assets/imgs/l_input.png" class="img-input img-m img-s"/>
              <img src="../assets/imgs/l_input_light.png" class="img-input-light img-m img-s"/>
              <img src="../assets/imgs/l_input_l.png" class="img-input img-l"/>
              <img src="../assets/imgs/l_input_light_l.png" class="img-input-light img-l"/>
              <input autoComplete="off" id="iptUserPwd" name="password" type="password" placeholder="请输入密码">
            </div>
            <div class="vcode-con">
              <div class="input-con">
                <img src="../assets/imgs/l_vcode.png" class="img-input img-m img-s"/>
                <img src="../assets/imgs/l_vcode_light.png" class="img-input-light img-m img-s"/>
                <img src="../assets/imgs/l_vcode_l.png" class="img-input img-l"/>
                <img src="../assets/imgs/l_vcode_light_l.png" class="img-input-light img-l"/>
                <input autoComplete="off" id="iptUserVcode" name="validateCode" type="text" placeholder="验证码">
              </div>
              <div class="vcode">
                <div class="vcode-img">
                  <img src="" id="imgVCode"/>
                </div>
                <div class="reset-vcode" id="divChangVCode">
                  <i></i>
                  <img src="../assets/imgs/l_rf.png" class="img-rf img-m img-s"/>
                  <img src="../assets/imgs/l_rf_light.png" class="img-rf-light img-m img-s"/>
                  <img src="../assets/imgs/l_rf_l.png" class="img-rf img-l"/>
                  <img src="../assets/imgs/l_rf_light_l.png" class="img-rf-light img-l"/>
                </div>
              </div>
            </div>
            <div class="pwd">
              <div class="rem-pwd" id="divCheckPwd">
                <div class="pwd-check"></div>
                <div class="pwd-check pwd-checked"></div>
                记住密码
              </div>
              <div class="forget-pwd">
                <a href="javascript: void(0)">忘记密码?</a>
              </div>
            </div>
            <div class="show-msg" id="divShowMsg">
              ${message}
            </div>
            <div class="login-input" id="divLoginBtn">
              <img src="../assets/imgs/l_login.png" class="img-login img-s img-m"/>
              <img src="../assets/imgs/l_login_light.png" class="img-login-light img-s img-m"/>
              <img src="../assets/imgs/l_login_l.png" class="img-login img-l"/>
              <img src="../assets/imgs/l_login_light_l.png" class="img-login-light img-l"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {}
    },
    methods: {},
    mounted() {
      /*
       * @Author: gy
       * @Date: 2019-06-18 9:58:00
       * @Last Modified by: gy
       * @Last Modified time: 2019-06-18 11:12:00
       */
      window.areaInfo = "";
      var sessionName = window.localStorage.getItem("eplatformUsername");
      var sessionPwd = window.localStorage.getItem("eplatformUserpwd");
      $("#iptUserName").val("");
      $("#iptUserPwd").val("");
      if(sessionName && sessionPwd){
        $("#iptUserName").val(sessionName);
        $("#iptUserPwd").val(sessionPwd);
      }
      //判断是否允许的登陆
      function isCanLogin(){
        var name = $("#iptUserName").val();
        var pwd = $("#iptUserPwd").val();
        var vcode = $("#iptUserVcode").val();
        var divLoginBtn = $("#divLoginBtn");
        if(name !== "" && pwd !== '' && vcode !== ''){
          divLoginBtn.addClass("canLogin");
          return true;
        }
        divLoginBtn.removeClass("canLogin");
        changShowMsg("");
        return false;
      }
      //修改提示信息
      function changShowMsg(msg){
        $("#divShowMsg").html(msg);
      }
      //给input绑定时间
      $(".input-con").on("input", "input", function(){
        var thisIpt = $(this);
        var thisParent = thisIpt.parent();
        var val = thisIpt.val();
        if(val !== ""){
          thisParent.addClass("has-val");
        }else{
          thisParent.removeClass("has-val");
        }
        isCanLogin();
      })
      //是否保存密码
      $("#divCheckPwd").on("click", function(){
        var thisDiv = $(this);
        thisDiv.toggleClass('checked');
      })
      //登陆
      $("#divLoginBtn").on("click", function(){
        var thisDiv = $(this);
        var name = $("#iptUserName").val();
        var pwd = $("#iptUserPwd").val();
        var vcode = $("#iptUserVcode").val();
        if(thisDiv.hasClass("canLogin")){
          var name = $("#iptUserName").val();
          var pwd = $("#iptUserPwd").val();
          var vcode = $("#iptUserVcode").val();
          if($("#divCheckPwd").hasClass("checked")){
            window.localStorage.setItem("eplatformUsername", name);
            window.localStorage.setItem("eplatformUserpwd", pwd);
          }
          $("#loginForm").submit();
        }
      })
      function reVcode(){
        var date = new Date().getTime();
        $("#imgVCode").attr("src", "/eplatform/servlet/validateCodeServlet?" + date);
      }
      $("#divChangVCode").parent().on("click", reVcode);

      $("html").on("keydown", function(e){
        if(e.keyCode === 13){
          $("#divLoginBtn").click();
        }
      })
    },
  }
</script>

<style lang="less" scoped>
  .content, body, html{
    min-width: 1440px;
    width: 2560px;
    height: 850px;
  }
  .content{
    overflow: hidden;
  }
  .content {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;
    background-image: url(../assets/imgs/l_bg.png);
    background-size: 100% 100%;
    position: relative;
    font-size: 16px;
    font-family: "Source Han Sans CN Regular", "Noto Sans CJK SC", "Source Han Sans CN";
  }
  .content .div-img-con .img-con {
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    z-index: 2;
  }

  .content .div-img-con .img-con.img-bg-map {
    width: 1701px;
    height: 832px;
    background: url("../assets/imgs/l_bg_map.png") center center;
    top: 18px;
    left: 15px;
    z-index: 1;
  }
  .content .div-img-con .img-con.img-bg-xianlu {
    width: 1199px;
    height: 577px;
    background: url("../assets/imgs/l_bg_xianlu.gif") center center;
    top: 110px;
    left: 180px;
    z-index: 1;
  }

  .content .div-img-con .img-con.img-bg-fangzi {
    width: 87px;
    height: 85px;
    background: url("../assets/imgs/l_bg_fangzi.png") center center;
    top: 229px;
    left: 154px;
  }

  .content .div-img-con .img-con.img-bg-fangzi1 {
    width: 87px;
    height: 89px;
    background: url("../assets/imgs/l_bg_fangzi1.png") center center;
    top: 311px;
    left: 699px;
  }
  .content .div-img-con .img-con.img-bg-zuobiao {
    width: 60px;
    height: 65px;
    background: url("../assets/imgs/l_bg_zuobiao.png") center center;
    top: 629px;
    left: 359px;
  }

  .content .div-img-con .img-con.img-bg-zuobiao1 {
    width: 60px;
    height: 60px;
    background: url("../assets/imgs/l_bg_zuobiao1.png") center center;
    top: 287px;
    left: 1338px;
  }

  .content .login-con {
    position: absolute;
    top: 165px;
    right: 74px;
    z-index: 10;
  }

  .content .login-con .header {
    font-size: 40px;
    color: #00b8ff;
    letter-spacing: 6px;
  }

  .content .login-con .header span {
    margin: 0 16px
  }

  .content .login-con .login {
    width: 450px;
    height: 480px;
    margin: 60px auto 0;
    background: url(../assets/imgs/l_bg1.png) center center;
    background-size: 100% 100%;
    padding: 32px 60px 40px
  }

  .content .login-con .login .login-header {
    color: #01aff7;
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px
  }

  .content .login-con .login .input-con {
    margin-bottom: 28px;
    width: 100%;
    height: 50px;
    position: relative
  }

  .content .login-con .login .input-con img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px
  }

  .content .login-con .login .input-con .img-input {
    display: block
  }

  .content .login-con .login .input-con .img-input-light, .content .login-con .login .input-con.has-val .img-input {
    display: none
  }

  .content .login-con .login .input-con input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: 0 0;
    outline: 0;
    border: none;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    color: #cde4f7;
    font-size: 16px;
    z-index: 1
  }

  .content .login-con .login .input-con input::-webkit-input-placeholder {
    color: #5991bf;
    font-size: 16px
  }

  .content .login-con .login .input-con input:-moz-placeholder {
    color: #5991bf;
    font-size: 16px
  }

  .content .login-con .login .input-con input::-moz-placeholder {
    color: #5991bf;
    font-size: 16px
  }

  .content .login-con .login .input-con input:-ms-input-placeholder {
    color: #5991bf;
    font-size: 16px
  }

  .content .login-con .login .input-con.has-val .img-input-light {
    display: block
  }

  .content .login-con .login .vcode-con {
    display: flex
  }

  .content .login-con .login .vcode-con .input-con {
    width: 174px;
    margin-bottom: 18px
  }

  .content .login-con .login .vcode-con .vcode {
    width: 146px;
    margin-bottom: 18px;
    margin-left: 10px;
    display: flex;
    background: #031a42;
    cursor: pointer;
  }

  .content .login-con .login .vcode-con .vcode .vcode-img {
    width: 96px;
  }

  .content .login-con .login .vcode-con .vcode .vcode-img img {
    width: 100%;
    height: 50px
  }

  .content .login-con .login .vcode-con .vcode .reset-vcode {
    position: relative;
    width: 50px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    text-align: center
  }

  .content .login-con .login .vcode-con .vcode .reset-vcode i {
    display: block;
    position: absolute;
    left: 0;
    top: 5px;
    width: 1px;
    height: 40px;
    background: #01112b;
  }

  .content .login-con .login .vcode-con .vcode .reset-vcode img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .content .login-con .login .vcode-con .vcode .reset-vcode img.img-rf{
    display: inline-block;
  }
  .content .login-con .login .vcode-con .vcode .reset-vcode img.img-rf-light{
    display: none;
  }
  .content .login-con .login .vcode-con .vcode:hover .reset-vcode img.img-rf{
    display: none;
  }
  .content .login-con .login .vcode-con .vcode:hover .reset-vcode img.img-rf-light{
    display: inline-block;
  }

  .content .login-con .login .pwd {
    display: flex;
    height: 20px;
    line-height: 20px;
    justify-content: space-between;
    align-items: center;
    color: #01aff7
  }

  .content .login-con .login .pwd .rem-pwd {
    display: flex;
    cursor: pointer;
    margin-left: 3px
  }

  .content .login-con .login .pwd .rem-pwd .pwd-check {
    display: block;
    width: 20px;
    height: 20px;
    background: url(../assets/imgs/l_check.png) center center;
    background-size: 100% 100%;
    margin-right: 8px
  }

  .content .login-con .login .pwd .rem-pwd .pwd-checked {
    display: none;
    background-image: url(../assets/imgs/l_checked.png)
  }

  .content .login-con .login .pwd .rem-pwd:hover {
    color: #3288b2
  }

  .content .login-con .login .pwd .rem-pwd.checked .pwd-check {
    display: none
  }

  .content .login-con .login .login-input .img-login, .content .login-con .login .pwd .rem-pwd.checked .pwd-checked {
    display: block
  }

  .content .login-con .login .pwd .forget-pwd a, .content .login-con .login .pwd .forget-pwd a:visited {
    color: #01aff7
  }

  .content .login-con .login .pwd .forget-pwd a:active, .content .login-con .login .pwd .forget-pwd a:hover {
    color: #3288b2
  }

  .content .login-con .login .show-msg {
    margin-top: 18px;
    height: 16px;
    line-height: 16px;
    color: #ffbe0d
  }

  .content .login-con .login .login-input img{
    margin: 0 auto;
  }
  .content .login-con .login .login-input {
    margin-top: 18px
  }

  .content .login-con .login .login-input .img-login-light, .content .login-con .login .login-input.canLogin .img-login {
    display: none
  }

  .content .login-con .login .login-input.canLogin .img-login-light {
    display: block
  }

  @media screen and (max-width: 1921px){
    .content, body, html{
      width: 100%;
      height: 1080px;
    }
    .content{
      background-image: url(../assets/imgs/l_bg_s.png);
    }
    .content .login-con{
      transform: scale(0.7);
      right: -150px;
    }
    .img-m, .img-s{
      display: inline-block;
    }
    .img-l{
      display: none !important;
    }
    .content .div-img-con .img-con.img-bg-map{
      top: 98px;
      background-image: url("../assets/imgs/l_bg_map_s.png");
      height: 906px;
    }
    .content .div-img-con .img-con.img-bg-xianlu{
      top:190px;
    }
    .content .div-img-con .img-con.img-bg-fangzi{
      top: 308px;
    }
    .content .div-img-con .img-con.img-bg-fangzi1{
      top: 392px;
    }
    .content .div-img-con .img-con.img-bg-zuobiao{
      top: 709px;
    }
    .content .div-img-con .img-con.img-bg-zuobiao1{
      top: 367px;
    }
    .content .login-con .login{
      width: 440px;
      padding: 32px 46px 40px;
    }
  }
  @media screen and (max-width: 1601px){
    .content .div-img-con{
      transform: scale(0.61);
      position: absolute;
      top: 204px;
      left: 0;
    }
    .content .login-con{
      transform: scale(0.6);
      top: 204px;
      right: -220px;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1701px){
    .content .div-img-con{
      transform: scale(0.7);
      position: absolute;
      top: 164px;
      left: 0;
    }
    .content .login-con{
      transform: scale(0.65);
      top: 217px;
      right: -220px;
    }
  }
  @media screen and (min-width: 1700px) and (max-width: 1801px){
    .content .div-img-con{
      transform: scale(0.77);
      position: absolute;
      top: 130px;
      left: 0;
    }
    .content .login-con{
      transform: scale(0.7);
      top: 217px;
      right: -220px;
    }
  }
  @media screen and (min-width: 1800px) and (max-width: 1921px){
    .content .div-img-con{
      transform: scale(0.8);
      position: absolute;
      top: 123px;
      left: 0;
    }
    .content .login-con{
      transform: scale(0.7);
      top: 217px;
      right: -183px;
    }
  }
  @media screen and (min-width: 1921px) and (max-width: 2561px){
    .img-m, .img-s{
      display: inline-block;
    }
    .img-l{
      display: none !important;
    }
  }
  @media screen and (min-width: 2561px){
    .img-m, .img-s{
      display: none !important;
    }
    .img-l{
      display: inline-block;
    }
    .content, body, html{
      width: 9600px;
      height: 2700px;
    }
    .content{
      font-size: 48px;
      background-image: url(../assets/imgs/l_bg_l.png);
    }
    .content .div-img-con .img-con.img-bg-map{
      display: none;
    }
    .content .div-img-con .img-con.img-bg-xianlu{
      width: 3621px;
      height: 1714px;
      top: 445px;
      left: 1710px;
      background-image: url(../assets/imgs/l_bg_xianlu_l.gif);
    }
    .content .div-img-con .img-con.img-bg-fangzi{
      width: 312px;
      height: 323px;
      top: 738px;
      left: 1591px;
      background-image: url(../assets/imgs/l_bg_fangzi_l.png);
    }
    .content .div-img-con .img-con.img-bg-fangzi1{
      width: 328px;
      height: 349px;
      top: 985px;
      left: 3233px;
      background-image: url(../assets/imgs/l_bg_fangzi1_l.png);
    }
    .content .div-img-con .img-con.img-bg-zuobiao{
      width: 191px;
      height: 215px;
      top: 2005px;
      left: 2241px;
      background-image: url(../assets/imgs/l_bg_zuobiao_l.png);
    }
    .content .div-img-con .img-con.img-bg-zuobiao1{
      width: 200px;
      height: 225px;
      top: 950px;
      left: 5214px;
      background-image: url(../assets/imgs/l_bg_zuobiao_l.png);
    }
    .content .login-con .header {
      font-size: 120px;
    }
    .content .login-con {
      top: 449px;
      transform: scale(0.9);
      right: 908px;
    }
    .content .login-con .login{
      margin-top:180px;
      padding: 94px 175px 94px;

      width: 1350px;
      height: 1440px;
    }
    .content .login-con .login .login-header{
      margin-bottom: 94px;
      font-size: 78px;
    }
    .content .login-con .login .input-con{
      margin-bottom: 86px;
      height: 148px;
      line-height: 148px;
    }
    .content .login-con .login .input-con img{
      height: 148px;
    }
    .content .login-con .login .input-con input{
      height: 148px;
      line-height: 148px;
      padding: 0 50px;
    }
    .content .login-con .login .vcode-con .input-con{
      margin-bottom: 54px;
      width: 530px;
    }
    .content .login-con .login .vcode-con .vcode{
      margin-bottom: 54px;
      margin-left: 50px;
      width: 420px;
    }
    .content .login-con .login .vcode-con .vcode .reset-vcode{
      width: 148px;
      height: 148px;
    }
    .content .login-con .login .vcode-con .vcode .vcode-img{
      width: 380px;
    }
    .content .login-con .login .vcode-con .vcode .vcode-img img{
      height: 148px;
    }
    .content .login-con .login .pwd{
      height: 60px;
      line-height: 60px;
    }
    .content .login-con .login .pwd .rem-pwd{
      margin-left: 17px;
    }
    .content .login-con .login .pwd .rem-pwd .pwd-check{
      width: 60px;
      height: 60px;
      background-image: url("../assets/imgs/l_check_l.png")
    }
    .content .login-con .login .pwd .rem-pwd .pwd-checked{
      background-image: url("../assets/imgs/l_checked_l.png")
    }
    .content .login-con .login .show-msg{
      margin-top: 61px;
      height: 48px;
      line-height: 48px;
    }
    .content .login-con .login .login-input{
      margin-top: 48px;
    }
  }
</style>