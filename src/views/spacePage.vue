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
      <div class="lf2">
        <li class="li">{{ date }}</li>
        <li class="li">&nbsp{{ tianqi }}</li>
      </div>
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
      console.log("我的城市地名", obj);
      //获取天气
      var result = axios.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=" + obj
      );
      console.log("天气查询结果", result);
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
  width: 98.35%;
  height: 98.35%;

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
  font-size: 80%;
  float: right;
  display: block;
  margin: 0, 0, 0, 10px;
}
.lf2 {
  font-size: 80%;
  float: left;
  display: block;
  margin: 0, 0, 0, 10px;
}
.li {
  list-style: none;
}
.body {
  /* float: left; */
  color: crimson;
  margin-top: 20px;
}
</style>
