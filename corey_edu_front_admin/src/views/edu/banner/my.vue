<template>
  <div class="app-container">
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
      <el-table-column label="轮播图封面" align="center">
        <template slot-scope="scope">
            <img :src="scope.row.imageUrl" alt="scope.row.title" width="150" height="80" >
        </template>
      </el-table-column>
      <el-table-column label="轮播图标题" prop="title" align="center" />
      <el-table-column label="链接地址" prop="linkUrl" align="center" />
      
      <el-table-column label="排序" prop="sort" align="center" width="100" />
      <el-table-column label="创建时间" prop="gmtCreate" align="center" width="160" />
      <el-table-column label="更新时间" prop="gmtModified" align="center" width="160" />

      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/banner/info/' + scope.row.id">
            <el-button type="primary" size="medium" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button style="margin-top: 10px" type="danger" size="medium" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import banner from '@/api/edu/banner'

export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      page: 1, // 页码
      limit: 5, // 每页记录数
      total: 0, // 总记录数
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },

    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      banner.getBannerList(this.page, this.limit).then(response => {
          if (response.success) {
            this.list = response.data.items
            this.total = response.data.total
          }
          this.listLoading = false
        })
    },


    removeDataById(id) {
      this.$confirm('此操作将永久删除该轮播图，是否继续？','提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( _ => {
        banner.removeBannerById(id).then(res => {
            if (res.success) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '删除失败'
                })
            }
          this.fetchData(1)
        })
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