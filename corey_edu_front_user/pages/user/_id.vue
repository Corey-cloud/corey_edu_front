<template>
  <div class="app-container">
    <el-form style="margin-left: 50em; margin-top: 5em" label-width="120px">
      <el-form-item label="昵称">
        <el-input minlength="2" maxlength="8" show-word-limit v-model="user.nickname" style="max-width: 218px" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.sex" clearable placeholder="请选择">
          <el-option :value="2" label="男" />
          <el-option :value="1" label="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          :min="1"
          :max="100"
          v-model="user.age"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item style="max-width: 500px" label="个性签名">
        <el-input 
        type="textarea" 
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容" 
        v-model="user.sign" 
        />
      </el-form-item>
      <el-form-item label="我的头像">
        <pan-thumb :image="user.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="'/aliyun/oss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="updateById"
          >确认修改</el-button
        >
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/api/user";
import ImageCropper from "./ImageCropper";
import PanThumb from "./PanThumb";
import cookie from "js-cookie";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      user: {
        id: "",
        sex: 1,
        age: "",
        avatar: "",
        sign: "",
        nickname: ""
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
    };
  },

  created() {
    console.log("created");
    this.init();
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        user.getById(this.$route.params.id).then((res) => {
          this.user = res.data.data.user;
        });
      }
    },

    // 修改
    updateById() {
      this.saveBtnDisabled = true;
      user
        .updateById(this.user)
        .then((response) => {
          if (response.data.code == 20000) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            cookie.set("guli_ucenter", this.user)
            // 修改成功，回到列表页面 路由跳转
            this.$router.push({ path: "/" });
          } else {
            this.$message({
              type: "error",
              message: response.data.message,
            });
            this.saveBtnDisabled = false;
          }
        })
    },

    // 返回
    back() {
      this.$router.push({ path: "/" });
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.user.avatar = data.data.url;
      console.log("avatar:", this.user.avatar);
      this.$message({
        type: "success",
        message: "头像修改成功",
      });
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    // 关闭上传组件
    close() {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
  },
};
</script>
