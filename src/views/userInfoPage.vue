<template>
  <div class="userInfoIndex">
    <div class="header"></div>
    <div class="body">
      <div class="left"></div>
      <div class="center">
        <el-upload
          action="http://127.0.0.1:8010/api/mall/v1/admin/utils/upload/file/"
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
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CategoryView",
  data() {
    return {
      icon_url: "", // 默认url
    };
  },
  computed: {
    headers() {
      // 上传图片添加请求头header
      return {
        token: window.sessionStorage.getItem("tokenStr"), // 从本地获取token就行
      };
    },
    fileArr() {
      // 上传图片 显示默认图片
      return this.icon_url ? [{ url: this.icon_url }] : [];
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.icon_url = res.data.image;
      } else {
        this.$message.error(`图片上传失败:${res.message}`);
      }
    },
  },
};
</script>

<style>
.userInfoIndex {
  position: absolute;
  width: 95.35%;
  height: 100%;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
