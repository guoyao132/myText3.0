<template>
  <div class="Login">
    <div class="content">
      <div class="login-con">
        <div class="header">
          <img src="../img/l_left.png"/>
          <span>北京大兴国际机场智慧能源综合服务平台</span>
          <img src="../img/l_right.png"/>
        </div>
        <div class="login">
          <div class="login-header">登录</div>
          <div class="input-con">
            <img src="../img/l_input.png" class="img-input">
            <img src="../img/l_input_light.png" class="img-input-light">
            <input id="iptUserName" type="text" placeholder="请输入用户名">
          </div>
          <div class="input-con">
            <img src="../img/l_input.png" class="img-input">
            <img src="../img/l_input_light.png" class="img-input-light">
            <input id="iptUserPwd" type="password" placeholder="请输入密码">
          </div>
          <div class="vcode-con">
            <div class="input-con">
              <img src="../img/l_vcode.png" class="img-input">
              <img src="../img/l_vcode_light.png" class="img-input-light">
              <input id="iptUserVcode" type="text" placeholder="验证码">
            </div>
            <div class="vcode">
              <div class="vcode-img"></div>
              <div class="reset-vcode">
                <img src="../img/l_rf_light.png"/>
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
            用户名或密码错误！
          </div>
          <div class="login-input" id="divLoginBtn">
            <img src="../img/l_login.png" class="img-login"/>
            <img src="../img/l_login_light.png" class="img-login-light"/>
          </div>
        </div>
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
      window.areaInfo = "http://192.168.1.114:8081";

//判断是否允许的登陆
      function isCanLogin() {
        var name = $("#iptUserName").val();
        var pwd = $("#iptUserPwd").val();
        var vcode = $("#iptUserVcode").val();
        var divLoginBtn = $("#divLoginBtn");
        if (name !== "" && pwd !== '' && vcode !== '') {
          divLoginBtn.addClass("canLogin");
          return true;
        }
        divLoginBtn.removeClass("canLogin");
        changShowMsg("");
        return false;
      }

//修改提示信息
      function changShowMsg(msg) {
        $("#divShowMsg").html(msg);
      }

//给input绑定时间
      $(".input-con").on("input", "input", function () {
        var thisIpt = $(this);
        var thisParent = thisIpt.parent();
        var val = thisIpt.val();
        if (val !== "") {
          thisParent.addClass("has-val");
        } else {
          thisParent.removeClass("has-val");
        }
        isCanLogin();
      })
//是否保存密码
      $("#divCheckPwd").on("click", function () {
        var thisDiv = $(this);
        thisDiv.toggleClass('checked');
      })
//登陆
      $("#divLoginBtn").on("click", function () {
        let thisDiv = $(this);
        var name = $("#iptUserName").val();
        var pwd = $("#iptUserPwd").val();
        var vcode = $("#iptUserVcode").val();
        if (thisDiv.hasClass("canLogin")) {
          $.ajax({
            url: areaInfo + "/eplatform/a/login",
            type: "post",
            data: {
              username: name,
              password: pwd,
              validateCode: vcode,
            },
            succcess: function (data) {
              console.log(data);
            },
            error: function () {
              console.error("err");
            }
          })
        }
      })

    },
  }
</script>

<style lang="less" scoped>
  .Login {
    html, body, .content {
      width: 2560px;
      height: 850px;
    }

    .content {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-color: #fff;
      background-image: url(../img/l_bg.png);
      position: relative;
      font-size: 16px;
      font-family: "Source Han Sans CN Regular", "Noto Sans CJK SC", "Source Han Sans CN";

      .login-con {
        position: absolute;
        top: 165px;
        right: 74px;

        .header {
          font-size: 40px;
          color: #00b8ff;

          span {
            margin: 0 16px
          }
        }

        .login {
          width: 450px;
          height: 480px;
          margin: 60px auto 0;
          background: url("../img/l_bg1.png") center center;
          background-size: 100% 100%;
          padding: 32px 60px 40px;

          .login-header {
            color: #01aff7;
            text-align: center;
            margin-bottom: 30px;
            font-size: 26px;
          }

          .input-con {
            margin-bottom: 28px;
            width: 100%;
            height: 50px;
            position: relative;

            img {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 50px;
            }

            .img-input {
              display: block;
            }

            .img-input-light {
              display: none;
            }

            input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: transparent;
              outline: none;
              border: none;
              height: 50px;
              line-height: 50px;
              padding: 0 15px;
              color: #cde4f7;
              font-size: 16px;
              z-index: 1;
            }

            input::-webkit-input-placeholder {
              color: #5991bf;
              font-size: 16px;
            }

            input:-moz-placeholder {
              color: #5991bf;
              font-size: 16px;
            }

            input::-moz-placeholder {
              color: #5991bf;
              font-size: 16px;
            }

            input:-ms-input-placeholder {
              color: #5991bf;
              font-size: 16px;
            }
          }

          .input-con.has-val {
            .img-input {
              display: none;
            }

            .img-input-light {
              display: block;
            }
          }

          .vcode-con {
            display: flex;

            .input-con {
              width: 174px;
              margin-bottom: 18px;
            }

            .vcode {
              width: 146px;
              margin-bottom: 18px;
              margin-left: 10px;
              display: flex;

              .vcode-img {
                width: 96px;
                background: #00294A;
              }

              .reset-vcode {
                width: 50px;
                height: 50px;
                line-height: 50px;
                cursor: pointer;
                background: #651891;
                text-align: center;
              }
            }
          }

          .pwd {
            display: flex;
            height: 20px;
            line-height: 20px;
            justify-content: space-between;
            align-items: center;
            color: #01aff7;

            .rem-pwd {
              display: flex;
              cursor: pointer;
              margin-left: 3px;

              .pwd-check {
                display: block;
                width: 20px;
                height: 20px;
                background: url('../img/l_check.png') center center;
                background-size: 100% 100%;
                margin-right: 8px;
              }

              .pwd-checked {
                display: none;
                background-image: url("../img/l_checked.png");
              }
            }

            .rem-pwd:hover {
              color: #3288b2;
            }

            .rem-pwd.checked {
              .pwd-check {
                display: none;
              }

              .pwd-checked {
                display: block;
              }
            }

            .forget-pwd {
              a {
                color: #01aff7;
              }

              a:visited {
                color: #01aff7;
              }

              a:hover {
                color: #3288b2;
              }

              a:active {
                color: #3288b2;
              }
            }
          }

          .show-msg {
            margin-top: 18px;
            height: 16px;
            line-height: 16px;
            color: #ffbe0d;
          }

          .login-input {
            margin-top: 18px;

            .img-login {
              display: block;
            }

            .img-login-light {
              display: none;
            }
          }

          .login-input.canLogin {
            .img-login {
              display: none;
            }

            .img-login-light {
              display: block;
            }
          }
        }
      }
    }
  }
</style>