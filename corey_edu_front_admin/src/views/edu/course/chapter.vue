<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="编辑课程基本信息" />
      <el-step title="编辑课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节" :show-close=false :before-close="handleClose">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时" :show-close=false :before-close="handleClose">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio border :label="1">免费</el-radio>
            <el-radio border :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            class="upload-demo"
            :action="BASE_API+'/aliyun/vod/videos/upload'"
            :on-success="handleVodUploadSuccess"
            :on-exceed="handleUploadExceed"
            :before-remove="beforeVodRemove"
            :on-remove="handleVodRemove"
            :file-list="fileList"
            :limit="1">
            <el-button slot="trigger" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chapterList">
      <li
        v-for="chapter in chapterNestedList"
        :key="chapter.id">
          <span style="font-size: 19px; margin-right: 50px"><strong>{{ chapter.title }}</strong></span>
          <el-button type="text" @click="dialogVideoFormVisible = true; chapterId = chapter.id">添加课时</el-button>
          <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
          <el-button style="color: red" type="text" @click="removeChapter(chapter.id)">删除</el-button>

        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <div>
              <span style="font-size: 17px; margin-right: 50px">{{ video.title }}</span>
              <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
              <el-button style="color: red" type="text" @click="removeVideo(video.id)">删除</el-button>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <el-form label-width="120px">
      <el-form-item>
        <router-link style="margin-right: 80px" :to="'/edu/course/list'">
          <el-button type="info">返回课程列表</el-button>
        </router-link>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">去发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
import vod from '@/api/edu/vod'

const chapterForm = {
  id: '',
  title: '',
  sort: 0
}

const videoForm = {
  id: '',
  title: '',
  sort: 0,
  isFree: 0,
  videoSourceId: '',
  videoOriginalName: ''
}

export default {
  data() {
    return {
      courseId: '', // 所属课程
      chapterNestedList: [], // 章节嵌套课时列表
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false, // 是否显示章节表单
      chapter: { // 章节对象
        ...chapterForm
      },
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: '', // 课时所在的章节id
      video: {// 课时对象
        ...videoForm
      },
      fileList: [], // 上传文件列表
      BASE_API: process.env.BASE_API // 接口API地址
    }
  },
  created() {
    console.log('chapter created')
    this.init()
  },
  methods: {

    // 点击遮罩层时提示
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.resetData()
      }).catch(_ => {})
    },

    resetData() {
      this.fileList = []
      this.chapter = {...chapterForm}
      this.video = {...videoForm}
      this.dialogChapterFormVisible = false
      this.dialogVideoFormVisible = false
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        // 根据id获取课程基本信息
        this.fetchChapterNestedListByCourseId()
      }
    },

    fetchChapterNestedListByCourseId() {
      chapter.getNestedTreeList(this.courseId).then(response => {
        this.chapterNestedList = response.data.chapterNestedList
      })
    },

    // 添加和修改章节
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.chapter.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 保存章节
    saveData() {
      this.chapter.courseId = this.courseId
      chapter.save(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.resetData()
        this.fetchChapterNestedListByCourseId() // 刷新列表
      })
      this.saveBtnDisabled = false
    },

    // 修改章节
    updateData() {
      chapter.updateById(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.resetData()
        this.fetchChapterNestedListByCourseId() // 刷新列表
      })
      this.saveBtnDisabled = false
    },

    editChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapter.getById(chapterId).then(response => {
        this.chapter = response.data.item
      })
    },

    // 删除章节
    removeChapter(chapterId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return chapter.removeById(chapterId)
      }).then(() => {
        this.fetchChapterNestedListByCourseId()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = true
      if (!this.video.id) {
        this.saveDataVideo()
      } else {
        this.updateDataVideo()
      }
    },

    saveDataVideo() {
      this.video.courseId = this.courseId
      this.video.chapterId = this.chapterId
      video.saveVideoInfo(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.resetData()
        this.fetchChapterNestedListByCourseId() // 刷新列表
      })
      this.saveVideoBtnDisabled = false
    },

    updateDataVideo() {
      video.updateVideoInfoById(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.resetData()
        this.fetchChapterNestedListByCourseId() // 刷新列表
      })
      this.saveVideoBtnDisabled = false
    },

    editVideo(videoId) {
      this.dialogVideoFormVisible = true
      video.getVideoInfoById(videoId).then(response => {
        this.video = response.data.item
        this.fileList = [{ 'name': this.video.videoOriginalName }]
      })
    },

    removeVideo(videoId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return video.removeById(videoId)
      }).then(() => {
        this.fetchChapterNestedListByCourseId()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId
      console.log('response.data.videoId:', response.data.videoId)
      this.video.videoOriginalName = file.name
      console.log('this.video.videoOriginalName: ', this.video.videoOriginalName)
      console.log('this.video.videoSourceId: ', this.video.videoSourceId)
      this.$message({
        type: 'success',
        message: response.message
      })
    },
    // 视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },

    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleVodRemove(file, fileList) {
      vod.removeById(this.video.videoSourceId).then(response => {
        this.video.videoSourceId = ''
        this.video.videoOriginalName = ''
        this.fileList = []
        this.$message({
          type: 'success',
          message: response.message
        })
      })
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: `/edu/course/info/${this.courseId}` })
    },
    next() {
      console.log('next')
      this.$router.push({ path: `/edu/course/publish/${this.courseId}` })
    }
  }
}
</script>

<style scoped>
  .chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .chanpterList li{
    position: relative;
  }
  .chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }
  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }
  .videoList{
    padding-left: 50px;
  }
  .videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
</style>
