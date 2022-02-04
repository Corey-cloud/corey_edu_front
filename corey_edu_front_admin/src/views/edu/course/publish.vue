<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="编辑课程基本信息" />
      <el-step title="编辑课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublishInfo.cover">
      <div class="main">
        <h2>{{ coursePublishInfo.title }}</h2>
        <p>共<b>    {{ coursePublishInfo.lessonNum }}</b>课时</p>
        <p><span>所属分类：{{ coursePublishInfo.subjectLevelOne }} — {{
        coursePublishInfo.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ coursePublishInfo.teacherName }}</p>
        <h3 class="red">￥{{ coursePublishInfo.price }}</h3>
      </div>
    </div>
    <el-form label-width="120px">
      <el-form-item>
        <router-link style="margin-right: 80px" :to="'/edu/course/list'">
          <el-button type="info">返回课程列表</el-button>
        </router-link>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '', // 所属课程
      coursePublishInfo: {}
    }
  },
  created() {
    console.log('publish created')
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        // 根据id获取课程发布信息
        this.fetchCoursePublishInfoById()
      }
    },
    fetchCoursePublishInfoById() {
      course.getCoursePublishInfoById(this.courseId).then(response => {
        this.coursePublishInfo = response.data.item
      })
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: '/edu/course/chapter/' + this.courseId })
    },

    publish() {
      course.publishCourse(this.courseId).then(response => {
        this.$message({
          type: 'success',
          message: '课程发布成功'
        })
        this.$router.push({ path: '/edu/course/list' })
      })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
  }
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
