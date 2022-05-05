<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="成员昵称">
        <el-input
        v-model="memberQuery.nickname"
        placeholder="成员昵称"
        clearable
        prefix-icon="el-icon-search"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
        v-model="memberQuery.mobile"
        placeholder="手机号"
        clearable
        prefix-icon="el-icon-search"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="memberQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <span><b>: &nbsp;</b></span>
      <el-form-item>
        <el-date-picker
          v-model="memberQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select v-model="memberQuery.isDisabled" clearable placeholder="请选择">
          <el-option :value=true label="是" />
          <el-option :value=false label="否" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
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
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="成员头像" align="center">
        <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" width="150" height="80" >
        </template>
      </el-table-column>
      <el-table-column sortable prop="openid" label="微信OpenId" />
      <el-table-column prop="nickname" label="昵称" />
            <el-table-column sortable prop="age" label="年龄" />
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex===1?'女':'男' }}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="sign" label="个性签名" />
      <el-table-column label="是否禁用" width="80">
        <template slot-scope="scope">
          {{ scope.row.isDisabled=== true ?'是':'否' }}
        </template>
      </el-table-column>

      <el-table-column sortable prop="gmtCreate" label="创建时间" width="160"/>
      <el-table-column sortable prop="gmtModified" label="更新时间" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/member/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="getList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import member from '@/api/edu/member'

export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      memberQuery: {} // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义方法
    // 调用
    this.getList()
  },
  methods: {
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size
      this.getList(1)
    },

    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      // 请求参数封装
      const queryParam = {
        page: this.page,
        limit: this.limit,
        nickname: this.memberQuery.nickname,
        mobile: this.memberQuery.mobile,
        begin: this.memberQuery.begin,
        end: this.memberQuery.end,
        isDisabled: this.memberQuery.isDisabled
      }
      member.getPageList(queryParam).then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })
      this.listLoading = false
    },
    // 清空查询数据
    resetData() {
      this.memberQuery = {}
      this.getList()
    },
    // 根据ID删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        return member.removeById(id)
      }).then(() => {
        this.getList()
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
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    }
  }
}
</script>
