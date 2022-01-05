<template>
  <div class="userInfoIndex">
    <div class="header"></div>
    <div class="userBody">
      <div class="left"></div>
      <div class="center">
        <el-form
          ref="userForm"
          :model="userForm"
          label-width="80px"
          class="login-box"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              class="username"
              type="text"
              auto-complete="false"
              v-model="userForm.username"
              placeholder="用戶名"
            ></el-input>
          </el-form-item>

          <el-form-item label="头像" prop="icon">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="string"
              list-type="picture-card"
              :http-request="UploadImage"
              :on-change="fileChange"
              :file-list="fileArr"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/jpeg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>

          <el-button @click="saveUserInfo">保存</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getRequest, postRequest } from "../uitls/api";
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
          this.$refs.upload.clearFiles(); //清除文件对象
          this.fileArr = [{ name: "icon", url: resp.icon }];
        }
      });
    },
    UploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      postRequest("/file/uploadFast", formData)
        .then((resp) => {
          console.log("上传图片成功");
          this.userForm.icon_url = resp.obj.filePath;
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
      this.fileArr = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },

    saveUserInfo() {
      console.log(":@@@@@@@@@@:" + this.userForm);
      this.userForm.icon = this.userForm.icon_url;
      postRequest("/blog/user/update", this.userForm).then((resp) => {
        console.log(":@@@@@@@@@@:" + resp);
        if (resp) {
          const tokenStr = resp.obj.tokenHead + resp.obj.token;
          window.sessionStorage.setItem("tokenStr", tokenStr);
          window.sessionStorage.setItem("username", resp.obj.username);
          console.log("@#$%^&)*&^%%%%%%%%%%%%#^&^", resp.obj.icon);
          window.sessionStorage.setItem("icon", resp.obj.icon);
          this.$router.replace({
            name: "IndexPage",
          });
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
  background-image: url("https://img0.baidu.com/it/u=120612477,1050689788&fm=26&fmt=auto");
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
.userBody {
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
.username {
  float: none;
  width: 30%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
