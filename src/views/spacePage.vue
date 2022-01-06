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
              <li class="lf1" style="fontsize: 200px color : #3f5c6d2c">
                <i class="el-icon-message" @click="toMessage">&nbsp;</i>
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
      <el-container style="flex-direction: row">
        <el-aside width="15%">
          <el-menu class="el-menu-space-left">
            <el-menu-item><i class="el-icon-share"></i>好友动态</el-menu-item>
            <el-menu-item><i class="el-icon-s-home"></i>我的空间</el-menu-item>
            <el-menu-item><i class="el-icon-picture"></i>我的相册</el-menu-item>
            <el-menu-item><i class="el-icon-menu"></i>我的应用</el-menu-item>
          </el-menu>
          <div class="guanggao1">
            <img
              src="http://www.ilan.ltd/group1/M00/00/01/CgAYCWHWnB2AKqN5AAAqUrTzAss324.jpg"
              style="width: 89%; height: 160%; margin-left: -55px"
            />
          </div>
        </el-aside>
        <el-main class="space_body">
          <div class="space-activity-insert">
            <el-input
              v-model="article.content"
              type="textarea"
              autosize=""
              placeholder="说点什么吧..."
              style="height: 50px"
            ></el-input>
            <div v-show="isShowImg">
              <el-upload
                ref="upload"
                :class="{ hideShow: false }"
                action="string"
                list-type="picture-card"
                :on-change="fileChange"
                :http-request="UploadImage"
                :file-list="urlArr"
              >
                <!--  <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-upload2"
                  @click="UploadImage()"
                  style="margin-left: 10px"
                ></el-button> -->
              </el-upload>
              <el-button @click="saveActivity"> 发表</el-button>
            </div>
          </div>
          <div style="height: 580px; overflow: auto">
            <div
              v-for="(items, index) in activityList"
              :key="(items, index)"
              style="margin-top: 120px"
            >
              <div class="author-style">
                <img
                  :src="items.author.icon"
                  @click="toUserInfo"
                  style="
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-top: -5px;
                  "
                />{{ items.author.username }}&nbsp;{{ items.createTime }}
              </div>
              <div class="arcitle-style">
                <div>&nbsp;&nbsp;{{ items.content }}</div>
                <img
                  style="width: 150px; height: 150px; margin-left: 50px"
                  :src="items.img"
                />
              </div>
            </div>
          </div>
        </el-main>
        <el-aside width="15%">Aside</el-aside>
      </el-container>
      <el-footer class="space_el_footer">
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
      ip: "",
      date: "",
      tianqi: "",
      isShowImg: true,
      urlArr: [],
      article: {
        author: {
          username: "ilan",
          icon: "https://img2.baidu.com/it/u=3683141353,2044374394&fm=26&fmt=auto",
        },
        content: "",
        imgs: [],
      },
      activityList: [
        {
          author: {
            username: "ilan",
            icon: "https://img2.baidu.com/it/u=3683141353,2044374394&fm=26&fmt=auto",
          },
          createTime: "2022-01-06 16:45",
          title: "",
          content:
            "哈哈哈哈笑死我了,张三吃碗炸酱面，使我不得开心颜，李四偷吃打卤面，至今没有被发现",
          img: "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg",
        },
        {
          author: {
            username: "ilan",
            icon: "https://img2.baidu.com/it/u=3683141353,2044374394&fm=26&fmt=auto",
          },
          createTime: "2022-01-06 16:45",
          title: "",
          content: "哈哈哈哈笑死我了",
          img: "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg",
        },
        {
          author: {
            username: "ilan",
            icon: "https://img2.baidu.com/it/u=3683141353,2044374394&fm=26&fmt=auto",
          },
          createTime: "2022-01-06 16:45",
          title: "",
          content: "哈哈哈哈笑死我了",
          img: "http://101.42.232.134/group1/M00/00/00/CgAYCWHKwi2AQog0AAQzBCR7_yY357.jpg",
        },
      ],
    };
  },
  mounted: function () {
    this.getTianQi();
  },
  methods: {
    toSetting() {
      alert("该功能暂未开发！");
    },
    toMessage() {
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
    UploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      postRequest("/file/uploadFast", formData)
        .then((resp) => {
          console.log("上传图片成功");
          const imgs = new Array();
          imgs.push(resp.obj.filePath);
          this.arcitle.imgs = imgs;
          param.onSuccess(); // 上传成功的图片会显示绿色的对勾
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        })
        .catch((resp) => {
          console.log("图片上传失败");
          param.onError();
        });
    },
    fileChange(file) {
      this.$refs.upload.clearFiles(); //清除文件对象
      this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      this.urlArr = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    //保存日志
    saveActivity() {
      //校验输入内容
      postRequest("/blog/insertArticle", article).then((resp) => {
        console.log("保存~");
        alter("发表成功");
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
  width: 98.46%;
  height: 100%;
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
.el-space-body {
  width: 100%;
}

.space_header {
  margin-top: -35px;
}
.space_el_footer,
.space_el_header {
  margin-top: -10px;
  margin-left: -8px;
  margin-right: -8px;
  height: 40px !important;
  color: aliceblue;
}
.space_el_header {
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
.el-upload {
  display: inline;
  text-align: center;
  cursor: pointer;
  outline: 0;
}

.space-activity-insert {
  width: 80%;
  height: 50px;
}
.el-menu-space-left {
  width: 80%;
  height: 50%;
  opacity: 0.5;
  margin-top: 20px;
}
.arcitle-style {
  text-align: left;
  font-size: 65%;
}
.author-style {
  text-align: left;
  font-size: 50%;
}

.guanggao1 {
  height: 30%;
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
