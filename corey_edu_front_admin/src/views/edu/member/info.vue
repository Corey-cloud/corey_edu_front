<template>
  <div class="app-container">
    <el-form style="margin-left: 50em; margin-top: 5em" label-width="120px">
      <el-form-item label="昵称">
        <el-input minlength="2" maxlength="8" show-word-limit v-model="member.nickname" style="max-width: 218px" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="member.sex" clearable placeholder="请选择">
          <el-option :value="2" label="男" />
          <el-option :value="1" label="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          :min="1"
          :max="100"
          v-model="member.age"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input maxlength="11" show-word-limit v-model="member.mobile" style="max-width: 218px" />
      </el-form-item>
      <el-form-item style="max-width: 500px" label="个性签名">
        <el-input 
        type="textarea" 
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容" 
        v-model="member.sign" 
        />
      </el-form-item>
      <el-form-item label="头像">
        <pan-thumb :image="member.avatar" />
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
      <el-form-item label="是否禁用">
        <el-select v-model="member.isDisabled" clearable placeholder="请选择">
          <el-option :value=true label="是" />
          <el-option :value=false label="否" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="updateById"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import member from "@/api/edu/member";
import ImageCropper from "./ImageCropper";
import PanThumb from "./PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      member: {
        id: "",
        sex: 1,
        age: "",
        avatar: "",
        sign: "",
        nickname: "",
        mobile: "",
        isDisabled: false
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      // BASE_API: '"http://127.0.0.1:8222"', // 接口API地址
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
        member.getById(this.$route.params.id).then((res) => {
          this.member = res.data.member;
        });
      }
    },

    // 修改
    updateById() {
      this.saveBtnDisabled = true;
      member
        .updateById(this.member)
        .then((response) => {
          if (response.code == 20000) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            // 修改成功，回到列表页面 路由跳转
            this.$router.go(-1)
          } else {
            this.$message({
              type: "error",
              message: '修改失败',
            });
            this.saveBtnDisabled = false;
          }
        })
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.member.avatar = data.url;
      console.log("avatar:", this.member.avatar);
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
