<template>
  <div class="register">
    <div v-if="showModal">注册成功！</div>
    <el-dialog
      title="注册提示"
      :visible.sync="showModal"
      :close-on-click-modal="true"
      :modal="true"
      :show-close="true"
      :center="true"
      class="tankuang"
    >
      <h1 @click="backTologin" class="tiaozhuan">注册成功！点我去登录</h1>
    </el-dialog>
    <el-container direction="vertical">
      <el-main class="login_body">
        <div class="leftRegister">
          <el-form
            :rules="rules"
            ref="registerForm"
            :model="registerForm"
            class="loginContain"
          >
            <h3 class="registerTitle">欢迎新朋友加入</h3>
            <el-form-item prop="username">
              <el-input
                type="text"
                auto-complete="false"
                v-model="registerForm.username"
                placeholder="用戶名"
                >用户名：</el-input
              >
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                auto-complete="false"
                v-model="registerForm.password"
                placeholder="密码"
                >密码：</el-input
              >
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                type="text"
                auto-complete="false"
                v-model="registerForm.code"
                placeholder="验证码"
                style="width: 250px; margin: 0px 0px 0px 0px"
              ></el-input>
              <img :src="captchaUrl" @click="updateCaptcha" />
            </el-form-item>
            <el-input
              type="text"
              v-model="registerForm.accountToken"
              auto-complete="false"
              placeholder="权限令牌"
              class="qx"
              >权限令牌</el-input
            >
            <el-button type="primary" class="registerSubmit" @click="submit"
              >注册</el-button
            >
          </el-form>
        </div>
        <div class="rightRegister">
          简介：
          <h2>{{ kjjj }}</h2>
        </div>
      </el-main>
      <el-footer>
        <div class="footer_login1">
          <a href="http://www.ilan.ltd">i懒空间,上班摸鱼的好地方</a>
        </div>
        <div class="footer_login">
          <img
            data-v-fe7aa2b2=""
            src="http://www.ilan.ltd/group1/M00/00/01/CgAYCWHXuLKAW9T5AAEuND_1Kh8510.jpg"
            style="height: 14px"
          /><a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13011002000325"
            >冀公网安备 13011002000325号</a
          >&nbsp;<a href="https://beian.miit.gov.cn/">冀ICP备2021028982号-1</a>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { postRequest } from "../uitls/api";
export default {
  name: "register",
  data() {
    return {
      captchaUrl: "/blog/captcha?time" + new Date(),
      showModal: false,
      kjjj: "",
      registerForm: {
        username: "",
        password: "",
        accountToken: "",
        code: "",
      },
      rules: {
        username: [{ required: true, message: "账号账号！", trigger: "blur" }],
        password: [{ required: true, message: "密码啊亲！", trigger: "blur" }],
        code: [{ required: true, message: "验证码！", trigger: "blur" }],
        accountToken: [
          { required: true, message: "有令牌才是自己人", trigger: "blur" },
        ],
      },
    };
  },
  mounted: function () {
    this.getKjjj();
  },
  methods: {
    getKjjj() {
      postRequest("/blog/login/kjjj", this.registerForm).then((resp) => {
        console.log(":@@@@@@@@@@:" + resp.obj.kjjj);
        if (resp.obj) {
          this.kjjj = resp.obj.kjjj;
        }
      });
    },
    backToLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    updateCaptcha() {
      this.captchaUrl = "/blog/captcha?time" + new Date();
    },
    submit() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          postRequest("/blog/login/register", this.registerForm).then(
            (resp) => {
              console.log(":@@@@@@@@@@:" + resp);
              if (resp.obj) {
                this.showModal = true;
              }
            }
          );
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
.register {
  position: absolute;
  width: 100%;
  height: calc(100vh);
  background-image: url("../assets/register.jpeg");
  background-size: 100% calc(100vh);
  background-repeat: no-repeat;
  margin: 0 auto;
}
.loginContain {
  border-radius: 15px;
  background-clip: padding-box;
  width: calc(60vh);
  height: calc(60vh);
  margin-right: calc(5vh);
  margin-top: calc(15vh);
  padding: 10px 18px 5px 18px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px black;
}
.registerTitle {
  margin: 0px auto 25px auto;
  text-align: center;
}
.qx {
  margin: 0px auto 5px 0px;
}
.tankuang {
  height: 100%;
  width: 80%;
}
.tiaozhuan {
  color: rgb(5, 65, 121);
  font-size: 100%;
  text-align: center;
}
.leftRegister,
.rightRegister {
  width: 50%;
  float: right;
}
.registerSubmit {
  margin: 0px 10px 0px auto;
  width: 100%;
}
</style>
