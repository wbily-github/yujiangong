<template>
  <div
    class="indexBack"
    :style="{
      backgroundImage: 'url(' + back + ')',
      backgroundSize: '100% auto',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <el-container direction="vertical">
      <!--   <el-header class="header_login">
        <div class="header">
         
        </div>
      </el-header> -->
      <el-header class="space_el_header">
        <div class="space_header">
          <div class="head-bar">
            <div class="lf2">
              <li class="li1">{{ date }}</li>
              <li class="li1">&nbsp;{{ tianqi }}</li>
            </div>
          </div>
          <div>
            <ul class="space_header_daohang">
              <li class="tabs-item">
                <a @click="toSetting">首页</a>
              </li>
              <li class="tabs-item">
                <a @click="toIndex">留言</a>
              </li>
              <li class="tabs-item">
                <a @click="toSetting">活动</a>
              </li>
              <li class="tabs-item">
                <a @click="toSetting">应用</a>
              </li>
            </ul>
          </div>

          <div class="search-box">
            <form action="https://www.ilan.ltd/search">
              <div class="search-box__inner">
                <input
                  type="hidden"
                  name="identification"
                  value="1641395835589"
                />
                <input type="hidden" name="scope" value="blog" />
                <input
                  class="search-box__input"
                  aria-label="搜索"
                  placeholder="大家都在搜..."
                  name="q"
                  value=""
                  type="text"
                  required=""
                />
                <i type="submit" class="el-icon-search"> </i>
              </div>
            </form>
          </div>
          <div class="space_header_right">
            <ul class="lf">
              <li class="lf1" style="fontsize: 200px color : #3f5c6d2c">
                <i class="el-icon-setting" @click="toSetting">&nbsp;</i>
              </li>
              <li class="lf1" style="fontsize: 200px color : #3f5c6d2c">
                <i class="el-icon-switch-button" @click="exit">&nbsp;</i>
              </li>

              <li class="lf1">
                <a>{{ name }}&nbsp;</a>
              </li>
              <li class="lf1">
                <img
                  :src="icon"
                  @click="toUserInfo"
                  style="
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-top: -5px;
                  "
                />
              </li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-main class="login_body">
        <div class="body">姐姐怀中惊坐起，SP竟是我自己</div>
      </el-main>
      <el-footer>
        <p class="copyright_link">
          <a
            href="http://www.ilan.ltd/#/indexPage"
            target="_blank"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.suggestion');"
            >反馈建议</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.actqzone');"
            target="_blank"
            >空间活动</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.app');"
            target="_blank"
            >空间应用</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.original');"
            target="_blank"
            >成为会员</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.qqlogin');"
            target="_blank"
            >空间登录</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.socialpackage');"
            >pc版下载</a
          >
          |
          <a
            href="http://www.ilan.ltd/#/indexPage"
            onclick="TCISD.pv('ihome.qzone.qq.com','bottom.complaint');"
            target="_blank"
            >关于我们</a
          >
        </p>

        <p class="copyright_cn">
          冀公网安备 13053402000396号&nbsp;冀ICP备2021028982号-1
        </p>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import { postRequest } from "../uitls/api";
export default {
  data() {
    return {
      name:
        null == window.sessionStorage.getItem("username")
          ? "佚名"
          : " " + window.sessionStorage.getItem("username") + "  ",
      icon:
        null == window.sessionStorage.getItem("icon")
          ? "https://img2.baidu.com/it/u=3683141353,2044374394&fm=26&fmt=auto"
          : window.sessionStorage.getItem("icon"),
      back: "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg",
      backType: "",
      ip: "",
      date: "",
      weatherToday: {},
      tianqi: "",
      ip: "",
    };
  },
  mounted: function () {
    this.getTianQi();
  },

  methods: {
    toSetting() {
      alert("该功能暂未开发！");
    },
    toIndex() {
      this.$router.push({
        name: "IndexPage",
      });
    },
    exit() {
      postRequest("/blog/logout").then((resp) => {
        console.log(":@@@@@@@@@@:" + resp);
        if (resp) {
          window.sessionStorage.clear();
          this.$router.push({
            name: "Login",
          });
        }
      });
    },

    toUserInfo() {
      this.$router.push({
        name: "userInfoPage",
      });
    },
    //获取当地城市及天气
    getTianQi() {
      //获取城市名
      var city = returnCitySN["cname"];

      var index = city.lastIndexOf("省");
      this.ip = returnCitySN["cip"];
      var obj =
        null == city.substring(index + 1, city.length)
          ? city.substring(0, city.length - 1)
          : city.substring(index + 1, city.length);
      if (city.indexOf("省") == -1) {
        obj = "石家庄";
      }
      console.log("我的城市地名", index);

      //获取天气
      var result = axios.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=" + obj
      );
      result.then((res) => {
        console.log("天气查询结果", res.data.forecast[0]);
        this.date = res.data.forecast[0].date + " " + res.data.forecast[0].type;
        this.tianqi =
          res.data.forecast[0].low + "~" + res.data.forecast[0].high;
        if ("晴" == res.data.forecast[0].type) {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg";
        } else if ("多云" == res.data.forecast[0].type) {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKiUKACsZaAABJLDVfXhc694.jpg";
        } else {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKiUmAX9h5AAE47Lj1MhY634.jpg";
        }

        console.log("********************", this.back);
      });
    },
  },
};
</script>

<style>
.indexBack {
  width: 98.67%;
  height: 98%;
  top: 0;
  left: 0;
  font-size: 200%;
  text-align: center;
  position: absolute;
  padding: 10px;
}
.el-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.space_header {
  margin-top: -35px;
}
.space_el_header {
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  height: 40px !important;
  color: aliceblue;
  background: black;
}
.space_header_right {
  font-size: 80%;
  margin-top: -10px;
  float: right;
}
.el-main {
  height: 100%;
  overflow: hidden;
}
.el-footer {
  height: 4vh;
  width: 100%;
  align-items: center;
  font-size: 25%;
}
.tabs-item {
  font-size: 50%;
  float: left;
  margin: 10px;
}
.el-icon-search {
  font-size: 56%;
}
.lf {
  margin-top: -15px;
}
.lf1 {
  font-size: 80%;
  float: right;
  display: block;
  margin: 0, 0, 0, -10px;
}
.lf2 {
  font-size: 45%;
  float: left;
  display: block;
  margin-top: 7px;
  margin-right: 20px;
}
.li1 {
  list-style: none;
  margin-top: -2px;
  margin-left: -8px;
}
.body {
  /* float: left; */
  color: crimson;
  margin-top: 50px;
}
</style>
