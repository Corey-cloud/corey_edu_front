<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="轮播图标题">
        <el-input v-model="banner.title" />
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="轮播图封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          
          :action="BASE_API+'/aliyun/oss/fileoss'"
          class="avatar-uploader">
          <img width="320" height="180" :src="banner.imageUrl">
        </el-upload>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number
          :min="0"
          v-model="banner.sort"
          controls-position="right"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入调用teacher.js文件
import banner from '@/api/edu/banner'

const defaultBanner = {
    title: '',
    imageUrl: '/static/default.jpg',
    linkUrl: '',
    sort: 0
}

export default {
  data() {
    return {
      banner: {
        title: '',
        imageUrl: '/static/default.jpg',
        linkUrl: '',
        sort: 0
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
    }
  },
  watch: { // 监听
    $route(to, from) { // 路由发生变化，方法就会执行
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    console.log('created')
    this.init()
  },
  methods: {
    init() {
      console.log("我进来了")
      if (this.$route.params && this.$route.params.id) {
        console.log("我进来了")
        this.fetchDataById(this.$route.params.id)
      } else {
        this.banner = {...defaultBanner}
      }
    },
    // 根据id获取轮播图
    fetchDataById(id) {
      banner.getBannerById(id).then(response => {
        if (response.code == 20000) {
            this.banner = response.data.item
        } else {
            this.$message({
                type: 'error',
                 message: '获取数据失败'
            })
        }
      })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.banner.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 保存
    saveData() {
      banner.saveBanner(this.banner).then(response => {
          if (response.success) {
              this.$message({
                type: 'success',
                message: '添加成功'
            })
            this.$router.push({ path: '/edu/banner/list' })
          } else {
              this.$message({
                 type: 'error',
                 message: '添加失败'
                })
            this.saveBtnDisabled = false
          }
      })
    },

    // 修改
    updateData() {
      this.saveBtnDisabled = true
      banner.updateBannerById(this.banner).then(response => {
          if (response.success) {
              this.$message({
                type: 'success',
                message: '修改成功'
            })
            // 修改成功，回到列表页面 路由跳转
            this.$router.push({ path: '/edu/banner/list' })
          } else {
              this.$message({
                type: 'error',
                message: '修改失败'
            })
            this.saveBtnDisabled = false
          }
      })  
    },

    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.banner.imageUrl = res.data.url
      this.$message({
        type: 'success',
        message: "封面上传成功"
      })
    },

    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG) {
    //     this.$message.error('上传封面只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传封面大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // }
  }
}
</script>
