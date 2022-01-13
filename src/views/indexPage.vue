<template>
  <div class="indexBody">
    <div class="headerIndexPage">
      <ul>
        <li><a @click="toActive">动态</a><b>|</b></li>
        <li><a @click="toHelp">帮助</a><b>|</b></li>
        <li><a @click="toHelp">联系站长</a></li>
        <li style="margin-top: 5px; float: right">
          <i class="el-icon-setting" @click="toSetting"></i>&nbsp;
        </li>
        <li style="margin-top: 5px; float: right">
          <i class="el-icon-switch-button" @click="exit"></i>&nbsp;
        </li>
        <li style="margin-top: 5px; float: right">
          <a>{{ name }}</a>
          &nbsp;
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
              margin-top: 2px;
            "
          />
          <!--  <avatar username="name"></avatar> -->
        </li>
      </ul>
    </div>
    <div style="height: calc(7vh); width: 100%; text-align: center">
      <p>欢迎来到LSP的留言板</p>
    </div>
    <div style="height: calc(7vh)">
      <el-dialog title="留下你的想法" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="20%">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              v-model="form.content"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertArticle">确 定</el-button>
        </span>
      </el-dialog>
      <div class="getArticle1">
        标题：
        <el-input
          type="text"
          v-model="cxqq.title"
          placeholder="标题"
          class="biaoti1"
        />
        内容：
        <el-input
          type="text"
          v-model="cxqq.content"
          placeholder="内容"
          class="biaoti"
        />
      </div>
      <div class="getArticle2">
        <el-button type="primary" class="but" @click="getArticle"
          >查看</el-button
        >
        <el-button type="primary" @click="dialogVisible = true"
          >新增留言</el-button
        >
      </div>
    </div>
    <div class="bodyResult">
      <el-card shadow="hover" class="tebale_card">
        <el-table
          :data="
            tableResult.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          :ref="getArticle"
          style="width: 100%"
          border
          :row-style="getRowClass"
          :header-row-style="getRowClass"
          :header-cell-style="getRowClass"
          stripe
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            prop="id"
            label="序号"
            min-width="30%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            min-width="50%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            min-width="125%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="urlKey"
            label="URL"
            min-width="90%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="missTime"
            label="时间"
            min-width="80%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            min-width="65%"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            min-width="59%"
            align="center"
          >
          </el-table-column>
        </el-table>
        <div style="text-align: center; margin-top: 30px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div style="height: calc(6.5vh); font-size: 25%; margin-top: calc(1vh)">
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
      <img
        data-v-fe7aa2b2=""
        src="http://www.ilan.ltd/group1/M00/00/01/CgAYCWHXuLKAW9T5AAEuND_1Kh8510.jpg"
        style="height: 14px"
      /><a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13011002000325"
        >冀公网安备 13011002000325号</a
      >&nbsp;<a href="https://beian.miit.gov.cn/">冀ICP备2021028982号-1</a>
    </div>
  </div>
</template>
<script>
import { postRequest } from "../uitls/api";
export default {
  data() {
    return {
      name: window.sessionStorage.getItem("username"),
      icon:
        null == window.sessionStorage.getItem("icon")
          ? "http://www.ilan.ltd/group1/M00/00/01/CgAYCWHQT3iAQlvIAAA7TqMmxYw358.jpg"
          : window.sessionStorage.getItem("icon"),
      cxqq: {
        title: "",
        size: 10,
        page: 1,
      },
      pagesize: 10,
      currentPage: 1,
      total: 0,
      tableResult: [
        {
          id: "",
          title: "",
          content: "",
          imgUrl: "",
          missTime: "",
          author: "",
          remark: "",
        },
      ],
      dialogVisible: false,
      form: {
        title: "",
        content: "",
      },
    };
  },

  mounted: function () {
    this.cxqq.size = this.pagesize;
    this.cxqq.page = this.currentPage;
    this.getTableResult(this.cqxx);
  },
  methods: {
    getTableResult() {
      postRequest("/blog/getArt", this.cxqq).then((resp) => {
        console.log(":@@@@@@@@@@:" + resp);
        if (resp.obj) {
          this.tableResult = resp.obj;
          this.total = resp.total;
        }
      });
    },
    toHelp() {
      alert("该功能暂未开发！");
    },
    toSetting() {
      alert("该功能暂未开发！");
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
    toActive() {
      this.$router.push({
        name: "spacePage",
      });
    },
    toUserInfo() {
      this.$router.push({
        name: "userInfoPage",
      });
    },
    getArticle() {
      (this.cxqq.size = this.pagesize),
        (this.cxqq.page = this.currentPage),
        postRequest("/blog/getArt", this.cxqq).then((resp) => {
          console.log(":@@@@@@@@@@:" + resp);
          if (resp.obj) {
            this.tableResult = resp.obj;
            this.total = resp.total;
          }
        });
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },
    insertArticle() {
      postRequest("/blog/insertArt", this.form).then((resp) => {
        console.log(":@@@@@@@@@@:" + resp);
        if (resp.obj) {
          location.reload();
        }
        this.dialogVisible = false;
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#000;";
    },
  },
};
</script>

<style scoped>
.bodyResult {
  width: 96%;
  padding-left: 2%;
  padding-right: 2%;
  text-align: center;
  background-color: #3f5c6d2c;
}
.biaoti1,
.biaoti {
  width: 200px;
}

.tebale_card {
  background-color: #3f5c6d2c;
}
.el-table,
.el-table__expanded-cell {
  background-color: #3f5c6d2c;
}

.indexBody {
  font-size: 200%;
  text-align: center;
  width: 100%;
  display: block;
  min-height: calc(100vh);
  overflow-y: auto;
  position: absolute;
  background: url("../assets/index.jpg") center center no-repeat;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
.headerIndexPage {
  height: calc(6vh);
  margin-top: -1%;
  font-size: 50%;
}
.lf1,
.lf2 {
  float: right;
  display: block;
  font-size: 120%;
  margin-bottom: calc(1.5vh);
}
#ul,
li {
  float: left;
  display: block;
  margin: 0, 0, 0, calc(1vh);
}
.getArticle1,
.getArticle2 {
  color: black;
  font-size: 80%;
  vertical-align: top;
  display: inline-block;
}
</style>