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
    <div class="header">
      <div class="lf1">
        <img
          v-bind:src="icon"
          @click="toUserInfo"
          style="
            width: 30px;
            height: 30px;
            overflow: hidden;
            border-radius: 50%;
            margin-top: -8px;
          "
        />
        <!--  <avatar username="name"></avatar> -->
      </div>
      <div class="lf1" :style="{ color: 'rgb(9, 13, 245)', float: 'right' }">
        &nbsp{{ name }}&nbsp
      </div>
      <div class="lf1">欢迎回来!</div>
    </div>
    <div class="body">姐姐怀中惊坐起，SP竟是我自己</div>
  </div>
</template>
<script>
import axios from "axios";
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
          : /*           "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftx20%2F51041101418690.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643165630&t=9fd3a57bb398957a4a31a60eddf64871"
             */ window.sessionStorage.getItem("icon"),
      back: "",
      backType: "",
      weatherToday: {},
      tianqi: "",
      ip: "",
    };
  },
  mounted: function () {
    this.getTianQi();
  },

  methods: {
    //获取当地城市及天气

    getTianQi() {
      //获取城市名

      var index = returnCitySN["cname"].lastIndexOf("省");
      var obj = returnCitySN["cname"].substring(
        index + 1,
        returnCitySN["cname"].length
      );
      console.log("我的城市地名", obj);
      //获取天气
      var result = axios.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=" + obj
      );
      result.then((res) => {
        this.tianqi = res.data.forecast[0].type;
        if ("晴" == res.data.forecast[0].type) {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg";
          /*  (this.indexBack.backgroundImage =
              "url(" + require("../assets/background晴天.jpg") + ")"); */
        } else if ("多云" == res.data.forecast[0].type) {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKiUKACsZaAABJLDVfXhc694.jpg";
          /*   this.indexBack.backgroundImage =
            "url(" + require("../assets/background阴天.jpg") + ")"; */
        } else {
          this.back =
            "http://101.42.232.134/group1/M00/00/00/CgAYCWHKiUmAX9h5AAE47Lj1MhY634.jpg";
          /*    this.indexBack.backgroundImage =
            "url(" + require("../assets/background雨天.jpg") + ")"; */
        }

        console.log("********************", this.back);
      });
    },
  },
};
</script>

<style>
.indexBack {
  width: 98.35%;
  height: 200%;
  color: crimson;
  font-size: 200%;
  text-align: center;

  position: absolute;

  padding: 10px;
}
.header {
  font-size: 50%;
}
.shenghua {
  text-align: center;
  font-size: 180%;
  color: blueviolet;
  width: 1250px;
  height: 700px;
  margin-top: 20px;
}
.lf1 {
  font-size: 50%;
  float: right;
  display: block;
  margin: 0, 0, 0, 10px;
}
</style>
