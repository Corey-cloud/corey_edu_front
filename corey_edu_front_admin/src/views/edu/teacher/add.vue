<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          :min="0"
          v-model="teacher.sort"
          controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number-->
          <el-option :value=1 label="高级讲师" />
          <el-option :value=2 label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item label="讲师头像">
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
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
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
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
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultTeacher = {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: process.env.OSS_API + '/avatar/default.jpg'
      }

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {...defaultTeacher},
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
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
      if (this.$route.params && this.$route.params.id) {
        this.fetchDataById(this.$route.params.id)
      } else {
        this.teacher = {...defaultTeacher}
      }
    },
    // 根据id查询讲师
    fetchDataById(id) {
      teacher.getById(id).then(response => {
        this.teacher = response.data.item
      }).catch(_ => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 保存
    saveData() {
      teacher.save(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push({ path: '/edu/teacher/list' })
      }).catch(_ => {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
        this.saveBtnDisabled = false
      })
    },

    // 修改
    updateData() {
      this.saveBtnDisabled = true
      teacher.updateById(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // 修改成功，回到列表页面 路由跳转
        this.$router.push({ path: '/edu/teacher/list' })
      }).catch(_ => {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
        this.saveBtnDisabled = false
      })
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.$message({
        type: 'success',
        message: '头像上传成功'
      })
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 关闭上传组件
    close() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>
