<template>
  <div
    class="index"
    v-loading="loading"
    element-loading-text="正在登录..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rpba(0,0,0,0.8)"
  >
    <el-container direction="vertical">
      <el-header class="header_login"> 这是一个导航栏 </el-header>
      <el-main class="login_body">
        <div class="logform">
          <el-form
            :rules="rules"
            ref="loginForm"
            :model="loginForm"
            class="loginContain"
          >
            <h3 class="loginTitle">欢迎来到LovelySpecialPerson广场</h3>
            <el-form-item prop="username">
              <el-input
                type="text"
                auto-complete="false"
                v-model="loginForm.username"
                placeholder="用戶名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                auto-complete="false"
                v-model="loginForm.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                type="text"
                auto-complete="false"
                v-model="loginForm.code"
                placeholder="验证码"
                style="width: 250px; margin: 0px 0px 0px 0px"
              ></el-input>
              <img :src="captchaUrl" @click="updateCaptcha" />
            </el-form-item>
            <el-checkbox type="checked" calss="loginRemember"
              >记住密码</el-checkbox
            >
            <el-button type="primary" class="loginSubmit" @click="submit"
              >登录</el-button
            >
            <div class="reg">
              <a @click="register">没有账号？去注册~</a>
            </div>
          </el-form>
        </div>
        <div class="erweima">
          &nbsp;&nbsp;
          <img
            src="http://www.ilan.ltd/group1/M00/00/01/CgAYCWHU9COAE_WUAABG2Ev4CJ4911.jpg"
          />
          <h3 style="">扫码使用手机登录</h3>
        </div>
      </el-main>
      <el-footer class="footer_login"> </el-footer>
    </el-container>
  </div>
</template>
<script>
import { postRequest } from "../uitls/api";
export default {
  name: "Login",
  data() {
    return {
      title: "标题",
      content: "没有内容",
      captchaUrl: "/blog/captcha?time" + new Date(),
      loading: false,
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [{ required: true, message: "账号账号！", trigger: "blur" }],
        password: [{ required: true, message: "密码啊亲！", trigger: "blur" }],
        code: [{ required: true, message: "验证码！", trigger: "blur" }],
      },
    };
  },
  mounted: function () {},
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/blog/captcha?time" + new Date();
    },
    register() {
      this.$router.push({
        name: "register",
      });
    },
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          postRequest("/blog/login/login", this.loginForm).then((resp) => {
            this.loading = false;
            if (resp.obj) {
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              //存到session里
              window.sessionStorage.setItem("tokenStr", tokenStr);
              window.sessionStorage.setItem("username", resp.obj.username);
              window.sessionStorage.setItem("icon", resp.obj.icon);
              this.$router.replace({
                name: "spacePage",
              });
            }
          });
        } else {
          this.$message.error("你不配");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.index {
  background-image: url("https://img0.baidu.com/it/u=120612477,1050689788&fm=26&fmt=auto");
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px 35px 10px 35px;
  background-size: 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
}
.logform {
  margin-top: -100px;
}
.loginContain {
  height: 120px;
  width: 80px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px black;
  float: right;
}
.redian {
  color: blue;
}
/* .redian1 {
  color: blue;
  float: right;
} */
.loginTitle {
  color: red;
  margin: 0px auto 10px auto;
  text-align: center;
}
.loginSubmit {
  width: 100%;
  text-align: center;
}
.reg {
  color: blue;
  text-align: right;
  margin: 0px auto 40px auto;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 0px 0px;
}
/* .login_body1 {
  margin-right: 50px;
  align-items: center;
} */
.erweima {
  float: right;
  text-align: center;
  margin-top: 50px;
  margin-right: 128px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}

.footer_login {
  font-size: 50%;

  height: 4vh;
  width: 100%;
  align-items: center;
}
.header_login {
  text-align: center;
}
</style>
