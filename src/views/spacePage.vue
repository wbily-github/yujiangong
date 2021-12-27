<template>
  <div class="spaceground">
    this is spacePage
    <div class="shenghua">
      <ul>
        <li>姐姐怀中惊坐起，SP竟是我自己</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { postRequest } from "../uitls/api";
import axios from "axios";
export default {
  data() {
    return {
      backType: "",
      weatherToday: {},
      city: "",
      ip: "",
    };
  },
  mounted: function () {
    this.getTianQi();
  },
  methods: {
    //获取当地城市及天气
    getTianQi() {
      var result = axios.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=" + "10000"
      );
      console.log(result.data.data.forecast);
      this.City = result.data.data.forecast[0];
      console.log(this.City);
    },
  },
};
</script>

<style>
</style>
