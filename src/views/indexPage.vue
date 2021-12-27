<template>
  <div class="indexBody">
    <div class="header">
      <ul class="lf">
        <li><a @click="toActive">动态</a><b>|</b></li>
        <li><a @click="toHelp">帮助</a><b>|</b></li>
        <li><a @click="toHelp">联系站长</a></li>

        <li class="lf1">
          <img :src="icon" @click="toUserInfo" />
        </li>
        <li class="lf1"><a>欢迎登录：</a></li>
      </ul>
    </div>
    <h1>欢迎来到LSP的留言板,亲爱的LSP：{{ name }}</h1>
    <div class="body">
      <el-dialog title="留下你的想法" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.content"></el-input>
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
          <el-table-column prop="id" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="urlKey" label="URL" width="180" align="center">
          </el-table-column>
          <el-table-column
            prop="missTime"
            label="时间"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="118"
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

    <!--    <div class="shenghua">
      <ul>
        <li>姐姐怀中惊坐起，SP竟是我自己</li>
      </ul>
    </div> -->
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
          ? "../assets/nv1.jpg"
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
    toActive() {
      alert("该功能暂未开发！");
    },
    toUserInfo() {
      alert("该功能暂未开发！");
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
  width: 1080px;
  height: 500px;
  margin: auto;
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
  color: crimson;
  font-size: 200%;
  text-align: center;
  width: 98%;
  height: 200%;

  position: absolute;
  background: url("../assets/index.jpg") center center no-repeat;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% auto;

  padding: 10px;
}
.header {
  font-size: 50%;
}
#ul,
li {
  float: left;
  display: block;

  margin: 0, 0, 0, 10px;
}
.lf1 {
  float: right;
  display: block;
  margin: 0, 0, 0, 10px;
}

.getArticle1,
.getArticle2 {
  color: black;
  font-size: 80%;
  vertical-align: top;
  display: inline-block;
}
</style>