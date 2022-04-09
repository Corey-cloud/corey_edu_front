<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="searchObj.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="searchObj.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item label="课程标题">
        <el-input prefix-icon="el-icon-search" clearable v-model="searchObj.title" placeholder="课程标题" />
      </el-form-item>
      <!-- 讲师 -->
      <el-form-item>
        <el-select v-model="searchObj.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程封面" align="center">
        <template slot-scope="scope">
            <img :src="scope.row.cover" alt="scope.row.title" width="150" height="80" >
        </template>
      </el-table-column>
      <el-table-column label="课程标题" prop="title" align="center" />
      <el-table-column label="总课时" prop="lessonNum" align="center" width="100" />
      <el-table-column label="创建时间" prop="gmtCreate" align="center" width="160" />
      <el-table-column label="更新时间" prop="gmtModified" align="center" width="160" />

      <el-table-column label="价格" width="100" align="center">
        <template slot-scope="scope">
          <b>
            {{Number(scope.row.price) === 0 ? "免费" : "¥" + scope.row.price.toFixed(2)}}
          </b>
        </template>
      </el-table-column>
      <el-table-column prop="buyCount" label="付费学员" width="100" align="center">
        <template slot-scope="scope"><b>{{ scope.row.buyCount }}</b>人</template>
      </el-table-column>
      <el-table-column label="课程状态" prop="status" align="center" width="120">
        <template slot-scope="scope">
          <span style="color:red;" v-if="scope.row.status === 'Draft' ">
            <b>未发布</b>
          </span>
          <span style="color:green;" v-else>
            <b>已发布</b>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/info/' + scope.row.id">
            <el-button type="primary" size="medium" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>
          <router-link :to="'/edu/course/chapter/' + scope.row.id">
            <el-button type="info" size="medium" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button style="margin-top: 10px" v-if="scope.row.status === 'Draft' " type="primary" size="medium" icon="el-icon-finished" @click="toPublish(scope.row.id)">去发布</el-button>
          <el-button style="margin-top: 10px" type="danger" size="medium" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import course from '@/api/edu/course'
import teacher from '@/api/edu/teacher'
import subject from '@/api/edu/subject'

export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      publishBtnDisabled: false,  // 发布按钮是否禁用
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {
        subjectParentId: '',
        subjectId: '',
        title: '',
        teacherId: ''
      }, // 查询条件
      teacherList: [], // 讲师列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [] // 二级分类列表
    }
  },
  created() {
    // 当页面加载时获取数据
    this.fetchData()
    // 初始化分类列表
    this.initSubjectList()
    // 获取讲师列表
    this.initTeacherList()
  },
  methods: {
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },

    fetchData(page = 1) {
      this.page = page
      const queryParam = {
        page: this.page,
        limit: this.limit,
        projectParentId: this.searchObj.projectParentId,
        projectId: this.searchObj.projectId,
        title: this.searchObj.title,
        teacherId: this.searchObj.teacherId
      }
      this.listLoading = true
      course.getPageList(queryParam).then(response => {
          if (response.success) {
            this.list = response.data.courseInfoList
            this.total = response.data.total
          }
          this.listLoading = false
        })
    },

    // 获取讲师列表
    initTeacherList() {
      teacher.getList().then(response => {
        this.teacherList = response.data.teacherList
      })
    },

    // 获取课程分类列表
    initSubjectList() {
      subject.getNestedTreeList().then(response => {
        this.subjectNestedList = response.data.items
      })
    },

    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children
          this.searchObj.subjectId = ''
        }
      }
    },
    resetData() {
      this.searchObj = {}
      this.subSubjectList = [] // 二级分类列表
      this.fetchData()
    },

    toPublish(courseId) {
      this.$router.push({ path: '/edu/course/publish/' + courseId })
    },

    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程，以及该课程下的章节和视频，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return course.removeById(id)
      }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .myClassList .info {
    width: 450px;
    overflow: hidden;
  }
  .myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
  }
  .myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .myClassList .info .pic img {
    display: block;
    width: 100%;
  }
  .myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
  }
  .myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
  }
  .myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
  }
</style>
