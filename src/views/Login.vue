<template>
  <div
    class="index"
    v-loading="loading"
    element-loading-text="正在登录..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rpba(0,0,0,0.8)"
  >
    <div class="left">
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
        <el-checkbox type="checked" calss="loginRemember">记住密码</el-checkbox>
        <el-button type="primary" class="loginSubmit" @click="submit"
          >登录</el-button
        >
        <div class="reg">
          <a @click="register">没有账号？去注册~</a>
        </div>
      </el-form>
    </div>
    <div class="right">
      今日份热点：
      <h2>&nbsp;{{ title }}</h2>
      <h3 class="redian">&nbsp;&nbsp;{{ content }}</h3>
    </div>
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
  mounted: function () {
    this.getHot();
  },
  methods: {
    getHot() {
      postRequest("/blog/login/getHot").then((resp) => {
        console.log(":@@@@@@@@@@:" + resp.obj.title);
        if (resp.obj) {
          this.title = resp.obj.title;
          this.content = resp.obj.content;
        }
      });
    },
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
            console.log(":@@@@@@@@@@:" + resp);
            if (resp.obj) {
              this.loading = false;
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              //存到session里
              window.sessionStorage.setItem("tokenStr", tokenStr);
              window.sessionStorage.setItem("username", resp.obj.username);
              window.sessionStorage.setItem("ison", resp.obj.icon);
              this.$router.replace({
                name: "IndexPage",
              });
            } else {
              this.loading = false;
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
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px 35px 10px 35px;
  background-image: url("../assets/giegie.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.loginContain {
  margin: 10%;
  border-radius: 15px;
  background-clip: padding-box;
  height: 390px;
  width: 350px;
  padding: 10px 25px 10px 35px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px black;
}
.redian {
  color: blue;
}
.loginTitle {
  color: red;
  margin: 0px auto 30px auto;
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
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
