<template>
  <div class="userInfoIndex">
    <div class="header"></div>
    <div class="body">
      <div class="left"></div>
      <div class="center">
        <el-input
          type="text"
          auto-complete="false"
          v-model="userForm.username"
          placeholder="用戶名"
        ></el-input>
        <el-upload
          action="http://localhost:8088/upload/file/"
          :headers="headers"
          list-type="picture-card"
          :file-list="fileArr"
          :limit="1"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">
            限制上传一张, 只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-button @click="saveUserInfo">保存</el-button>
      </div>
      <div class="right">{{ fileArr }}</div>
    </div>
  </div>
</template>
<script>
import { getRequest } from "../uitls/api";
export default {
  name: "CategoryView",
  data() {
    return {
      userForm: {
        username: "",
        passsowrd: "",
        id: "",
        icon_url: "", // 默认url
      },
      fileArr: [],
    };
  },
  created: function () {
    this.getIcon();
  },
  computed: {
    headers() {
      // 上传图片添加请求头header
      return {
        "Access-Control-Allow-Origin": "*",
        Authorization: window.sessionStorage.getItem("tokenStr"), // 从本地获取token就行
      };
    },
  },
  methods: {
    getIcon() {
      getRequest("/blog/user/info").then((resp) => {
        console.log(":@@@@@@@@@@:" + resp.icon);
        if (resp) {
          this.userForm = resp;
          this.userForm.icon_url = resp.icon;
          this.fileArr = [{ url: this.userForm.icon_url }];
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.userForm.icon_url = res.data.image;
      } else {
        this.$message.error(`图片上传失败:${res.message}`);
      }
    },
    saveUserInfo() {
      getRequest("/blog/user/update").then((resp) => {
        console.log(":@@@@@@@@@@:" + resp.icon);
        if (resp) {
          this.userForm.icon_url = resp.icon;
          this.fileArr = [{ url: this.userForm.icon_url }];
        }
      });
    },
  },
};
</script>

<style>
.userInfoIndex {
  position: absolute;
  width: 95.35%;
  height: 800%;
  padding: 10px 35px 10px 35px;
  background-image: url("../assets/giegie.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.body {
  float: left;
  width: 100%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.left,
.right {
  float: left;
  text-align: center;
  width: 10%;
}
.center {
  float: left;
  text-align: center;
  width: 40%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
