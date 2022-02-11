<template>
  <div
    class="indexBack"
    v-loading="loading"
    element-loading-text="正在提交..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rpba(0,0,0,0.8)"
    :style="{
      backgroundImage: 'url(' + back + ')',
      backgroundSize: '100% calc(100vh)',
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
                <a @click="toSetting" class="dhCss" href="#">首页</a>
              </li>
              <li class="tabs-item">
                <a @click="toIndex" class="dhCss" href="#">留言</a>
              </li>
              <li class="tabs-item">
                <a @click="toSetting" class="dhCss" href="#">活动</a>
              </li>
              <li class="tabs-item">
                <a @click="toSetting" class="dhCss" href="#">应用</a>
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
                    border-radius: 50%;
                    margin-top: -5px;
                  "
                />
              </li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-container style="flex-direction: row; height: calc(87vh)">
        <el-aside width="15%" style="height: calc(80vh)">
          <el-menu class="el-menu-space-left">
            <router-link to="/spacePage" class="daohang-link" exact=""
              ><el-menu-item
                ><i class="el-icon-share"></i>好友动态</el-menu-item
              ></router-link
            >
            <router-link to="/mySpace" class="daohang-link" exact="">
              <el-menu-item
                ><i class="el-icon-s-home"></i>我的空间</el-menu-item
              ></router-link
            >
            <router-link to="/myPhoto" class="daohang-link" exact=""
              ><el-menu-item
                ><i class="el-icon-picture"></i>我的相册</el-menu-item
              ></router-link
            >
            <router-link to="/myApp" class="daohang-link" exact=""
              ><el-menu-item
                ><i class="el-icon-menu"></i>我的应用</el-menu-item
              ></router-link
            >
          </el-menu>
        </el-aside>
        <el-main class="space_el_main">
          <div class="space-activity-insert">
            <el-input
              v-model="article.content"
              type="textarea"
              resize="none"
              :rows="3"
              placeholder="说点什么吧..."
              style="width: 80%"
            >
            </el-input>
            <div style="width: 10%">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="string"
                :http-request="fileUpload"
                :show-file-list="false"
              >
                <i
                  class="el-icon-camera"
                  type="primary"
                  style="width: 100%; margin-left: 5%"
                >
                </i>
              </el-upload>
              <el-button
                @click="saveArticle"
                style="margin-top: calc(3vh); margin-left: 10%"
                >发表</el-button
              >
            </div>
          </div>
          <!-- 图片展示 -->
          <div style="display: flex; text-align: left">
            <div
              :v-show="showImgLst"
              v-for="(item, index) in article.imgs"
              :key="(item, index)"
              @mouseover="mouseOver(item.url)"
              @mouseleave="mouseLeave(item.url)"
            >
              <img :src="item.url" style="width: 35px; height: calc(6vh)" />
              <div class="el-delete-icon">
                <i
                  class="el-icon-delete"
                  style="color: red; width: 35px; height: calc(6vh)"
                  v-show="item.isDeleteShow"
                  @click="removeLst(item.url)"
                ></i>
              </div>
            </div>
          </div>
          <!-- 动态内容 -->
          <div :class="dtContent">
            <div
              v-for="(items, index) in activityList"
              :key="(items, index)"
              style="margin-top: 10px"
            >
              <div style="text-align: left">
                <!-- 头信息内容 -->
                <div class="author-style">
                  <img
                    :src="items.author.icon"
                    @click="toUserInfo"
                    style="width: 30px; height: 30px; border-radius: 50%"
                  />{{ items.author.username }}&nbsp;{{ items.createTime }}
                  <a
                    style="font-size: 70%; color: blue"
                    @click="deleteActivity(items.id)"
                    v-show="items.ismine"
                    >删除</a
                  >
                </div>
                <!-- 文章内容 -->
                <div class="arcitle-style">
                  <div>&nbsp;&nbsp;{{ items.content }}</div>
                  <div style="height: 90px" v-show="items.imgs.length > 0">
                    <div
                      class="artimg"
                      v-for="(im, index) in items.imgs"
                      :key="(im, index)"
                    >
                      <img
                        style="width: 90px; height: 90px; margin-left: 10px"
                        :src="im.url"
                      />
                    </div>
                  </div>
                </div>
                <div style="height: 20px; width: 80%; text-align: right">
                  <i
                    :class="dianzana(items.id)"
                    @mouseover="dianzanact(items.id)"
                    @mouseleave="undianzanact(items.id, items.ysdz)"
                    @click="toZan(items)"
                  >
                  </i>
                  <i class="iconfont icon-message-fill"> </i>
                </div>
                <div
                  style="
                    height: 20px;
                    width: 80%;
                    text-align: left;
                    font-size: 40%;
                    margin-left: 3%;
                  "
                  v-if="items.dianzan.length > 0"
                >
                  <i class="iconfont icon-dianzan"> </i>{{ items.dianzan }}
                </div>
                <div
                  style="height: calc(10vh); text-align: left"
                  v-show="isPinglunShow"
                >
                  <el-input rows="1" placeholder="留下你的想法..."></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-footer style="padding: 0px; height: calc(6.5vh)">
        <div class="space_el_footer">
          <div>
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
          </div>
          <div style="margin-top: 10px">
            <img
              data-v-fe7aa2b2=""
              src="http://www.ilan.ltd/group1/M00/00/01/CgAYCWHXuLKAW9T5AAEuND_1Kh8510.jpg"
              style="height: 14px"
            /><a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13011002000325"
              >冀公网安备 13011002000325号</a
            >&nbsp;<a href="https://beian.miit.gov.cn/"
              >冀ICP备2021028982号-1</a
            >
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import { postRequest } from "../uitls/api";
import { L2Dwidget } from "live2d-widget";
export default {
  inject: ["reload"],

  data() {
    return {
      loading: false,
      showImgLst: false,
      isPinglunShow: false,
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
      isShowImg: false,
      urlArr: [],
      article: {
        username: "",
        content: "",
        imgs: [],
      },
      activityList: [],
    };
  },
  mounted: function () {
    this.getTianQi();
    this.queryArticle();
    this.article.imgs.isDeleteShow = false;
  },
  created() {
    //瞎搞
    L2Dwidget.init({
      model: {
        jsonPath:
          "https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json",
        /*  "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json", */
        scale: 1,
      },
      display: {
        position: "left",
        width: 150,
        height: 350,
        hOffset: 0,
        vOffset: -20,
      },
      mobile: {
        show: true,
        scale: 0.5,
      },
      react: {
        opacityDefault: 0.8,
        opacityOnHover: 1,
      },
      /*  dialog: {
        enable: true,
        script: {
          "tap body": "哎呀！别碰我！",
          "tap face": "弄疼人家了~",
        },
      }, */
    });
  },

  computed: {
    //动态文章大小
    dtContent() {
      if (this.showImgLst) {
        return "spaceContent1";
      } else {
        return "spaceContent";
      }
    },
    //点赞
    dianzana: function () {
      return function (param) {
        var acts = this.activityList;
        let suoyin = acts.findIndex((item) => {
          if (item.id == param) {
            return true;
          }
        });
        return undefined == this.activityList[suoyin].dianzanStyle
          ? "iconfont icon-dianzan"
          : this.activityList[suoyin].dianzanStyle;
      };
    },
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
    toUserInfo() {
      this.$router.push({
        name: "userInfoPage",
      });
    },
    //退出
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
    //删除按钮鼠标悬停事件
    mouseOver(param) {
      var imgs = this.article.imgs;
      let suoyin = imgs.findIndex((item) => {
        if (item.url == param) {
          return true;
        }
      });
      var img = {};
      img.url = param;
      img.isDeleteShow = true;
      imgs.splice(suoyin, 1, img);
    },
    mouseLeave(param) {
      var imgs = this.article.imgs;
      let suoyin = imgs.findIndex((item) => {
        if (item.url == param) {
          return true;
        }
      });
      this.article.imgs[suoyin].isDeleteShow = false;
    },
    //点赞按钮悬停事件
    dianzanact(param) {
      var acts = this.activityList;
      let suoyin = acts.findIndex((act) => {
        if (act.id == param) {
          console.log("俺改了", act);
          return true;
        }
      });
      var newact = this.activityList[suoyin];
      newact.dianzanStyle = "iconfont icon-dianzan_kuai";

      acts.splice(suoyin, 1, newact);
    },
    //点赞悬停离开事件
    undianzanact(param, param1) {
      console.log("lala", param1);
      var acts = this.activityList;
      if (true != param1) {
        let suoyin = acts.findIndex((act) => {
          if (act.id == param) {
            return true;
          }
        });
        var newact = this.activityList[suoyin];
        newact.dianzanStyle = "iconfont icon-dianzan";
        acts.splice(suoyin, 1, newact);
      }
    },

    //点赞
    toZan(param) {
      postRequest("/blog/zanToArticle", param.id).then((resp) => {
        if (resp) {
          this.$message.closeAll();
          var acts = this.activityList;
          let suoyin = acts.findIndex((act) => {
            if (act.id == param.id) {
              return true;
            }
          });
          var newact = this.activityList[suoyin];
          var zanStr = newact.dianzan;
          if (resp.total == 1) {
            //点赞成功

            newact.dianzan =
              newact.dianzan.length == 0
                ? window.sessionStorage.getItem("username")
                : newact.dianzan +
                  "," +
                  window.sessionStorage.getItem("username");
            newact.dianzanStyle = "iconfont icon-dianzan_kuai";
            newact.ysdz = true;
          } else {
            //取消点赞
            newact.dianzan = newact.dianzan
              .split("," + window.sessionStorage.getItem("username"))
              .join("");
            newact.dianzan = newact.dianzan
              .split(window.sessionStorage.getItem("username") + ",")
              .join("");
            newact.dianzan = newact.dianzan
              .split(window.sessionStorage.getItem("username"))
              .join("");
            /* var zanLst = zanStr.split(",");
            zanStr = zanLst
              .splice(
                zanLst.indexOf(window.sessionStorage.getItem("username")),
                1
              )
              .join(","); */
            newact.dianzanStyle = "iconfont icon-dianzan";
            //变空心
            newact.ysdz = false;
          }
          acts.splice(suoyin, 1, newact);
        }
      });
    },

    //移除已上传图片
    removeLst(param) {
      var imgs = this.article.imgs;
      let suoyin = imgs.findIndex((item) => {
        if (item.url == param) {
          return true;
        }
      });
      imgs.splice(suoyin, 1);
    },
    // 文件上传
    fileUpload(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      postRequest("/file/uploadFast", formData)
        .then((resp) => {
          console.log("上传图片成功", resp);
          this.showImgLst = true;
          this.article.imgs.push({ name: param.name, url: resp.obj.filePath });
        })
        .catch((resp) => {
          console.log("图片上传失败");
          param.onError();
        });
    },
    //查询日志
    queryArticle() {
      postRequest("/blog/queryArticle", this.article).then((resp) => {
        if (resp.obj) {
          var objlst = resp.obj;
          var actlst = [];
          for (let item of objlst) {
            item.ismine = false;
            if (
              item.author.username == window.sessionStorage.getItem("username")
            ) {
              item.ismine = true;
            }
            if (
              item.dianzan.includes(
                window.sessionStorage.getItem("username") + ","
              )
            ) {
              item.dianzanStyle = "iconfont icon-dianzan_kuai";
              item.ysdz = true;
              console.log("param~", item.dianzan);
            } else {
              item.ysdz = false;
            }
            this.isReflash = true;
            item.dianzan = item.dianzan.substring(0, item.dianzan.length - 1);
            actlst.push(item);
          }
          this.activityList = actlst;
          console.log("###qqqqqq#####3", actlst);
          this.$message.closeAll();
        }
      });
    },
    //保存日志
    saveArticle() {
      this.loading = true;
      //校验输入内容
      var con = this.article.content;
      if (!con) {
        this.loading = false;
        this.$message.error("请编写文案");
        return;
      }
      postRequest("/blog/insertArticle", this.article).then((resp) => {
        if (resp) {
          this.loading = false;
          this.reload();
        }
      });
    },
    //删除日志
    deleteActivity(id) {
      this.loading = true;
      console.log("************", id, "$$$");
      postRequest("/blog/deleteArticle", id).then((resp) => {
        if (resp) {
          this.loading = false;
          this.reload();
        }
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
        console.log("天气查询结果", res.data.obj);
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
  width: 100%;
  height: calc(100vh);
  overflow: hidden;
  top: 0;
  left: 0;
  font-size: 200%;
  text-align: center;
  position: absolute;
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
.space_el_header {
  margin-left: -8px;
  margin-right: -8px;
  height: calc(6.5vh) !important;
  background: black;
  color: aliceblue;
}
.space_el_main {
  height: calc(85vh) !important;
  padding: 10px !important;
  background-color: rgba(255, 255, 255, 0.5);
}
.spaceContent {
  height: calc(62vh);
  width: 100%;
  border: 1px;
  font-size: 80%;
  margin-top: calc(0.5vh);
  font-size: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
}
.spaceContent1 {
  height: calc(56vh);
  width: 100%;
  border: 1px;
  margin-top: calc(1.5vh);
  font-size: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
}
.space_el_footer {
  background: dimgrey;
  height: calc(10vh) !important;
  width: 100%+7px;
  margin-left: -6px;
  color: aliceblue;
}
.space_header_right {
  font-size: 80%;
  margin-top: -10px;
  float: right;
}
.el-upload {
  display: inline;
  text-align: center;
  cursor: pointer;
  outline: 0;
}

.space-activity-insert {
  width: 100%;
  height: 100px;
  display: flex;
  text-align: left;
}
.el-menu-space-left {
  width: 80%;
  height: 50%;
  opacity: 0.5;
  margin-top: 30px;
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
.el-delete-icon {
  margin-left: 25%;
  margin-top: -32.5px;
  height: calc(3vh);

  font-size: 16px;
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
.daohang-link {
  text-decoration: none;
}
.artimg {
  float: left;
}
.dhCss {
  text-decoration: none;
  color: white;
}
.body {
  color: crimson;
  margin-top: 50px;
}
</style>
