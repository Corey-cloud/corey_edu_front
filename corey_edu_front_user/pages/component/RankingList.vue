<script>
export default {
  name: 'RankingList',
  props: ['rankinglist'],
  methods: {
    onMouseEnter: function (id) {
      this.rankinglist.forEach(rank => {
        rank.showWord = true
      })

      this.rankinglist[id].showWord = false
    }
    // onMouseLeave: function (id) {
    //   this.rankinglist[id].showWord = true
    // }
  }
}
</script>
<template>
  <div style="padding-left:20px;">
    <!-- title -->
    <el-row class="title">
      <el-col :span="20">
        <h2 style="text-align:left;font-weight:700;">排行榜</h2>
      </el-col>
      <el-col :span="4" style="margin-top:20px">
        <a target="_blank" href="/course" class="more-span">更多></a>
      </el-col>
    </el-row>
    <!-- 排行 -->
    <div v-for="(rank,id) in rankinglist"
         :key="id"
         @mouseenter="onMouseEnter(id)">
      <el-row class="rank-item"
              v-show="rank.showWord">
        <el-col :span="4">
          <p :class="id<3?'id-p-gold':'id-p'">{{id+1}}</p>
        </el-col>
        <el-col :span="12">
          <p class="name-p">{{rank.title}}</p>
        </el-col>
        <el-col :span="8">
          <p class="update-p">{{(rank.gmtCreate).substring(0, 10)}}</p>
        </el-col>
      </el-row>
      <!-- image -->
      <el-container class="rank-item img-item"
                    style="height:160px"
                    v-show="!rank.showWord">
        <el-aside width="240px"
          style="overflow-y: hidden;">
          <a target="_blank" :href="'/course/'+rank.id">
            <img :src="rank.cover" height="100%" width="240px" />
          </a>
        </el-aside>
        <el-container>
          <el-main style="padding-left: 20px" class="img-name">
            <p :title="rank.title"
               class="line-limit-length">{{rank.title}}</p>
            <p class="img-word line-limit-length">课时:{{rank.lessonNum}}</p>
            <p v-if="rank.viewCount*1.2 > 100000000" class="img-word line-limit-length">热度:{{parseFloat((rank.viewCount*1.2/100000000).toFixed(1))}}亿</p>
            <p v-else-if="rank.viewCount*1.2 > 10000" class="img-word line-limit-length">热度:{{parseFloat((rank.viewCount*1.2/10000).toFixed(1))}}万</p>
            <p v-else class="img-word line-limit-length">热度:{{parseFloat((rank.viewCount*1.2).toFixed(1))}}</p>
          </el-main>
          <el-footer style="padding-right:0px">
            <el-row>
              <el-col :span="12"
                      :class="id<3?'img-id-gold':'img-id'">
                {{id+1}}
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 10px;
}
.more-span {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.56);
  margin-top: 25px;
  cursor: pointer;
}
.more-span:hover {
  color: #32aaff;
}
.rank-item {
  cursor: pointer;
  margin-bottom: 10px;
}
.img-item {
  background-color: rgba(21, 21, 21, 0.11);
}
.id-p-gold {
  font-size: 18px;
  font-weight: 700;
  color: #cf9870;
  text-align: left;
}
.id-p {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.34);
  text-align: left;
}
.name-p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.update-p {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34);
  text-align: right;
  line-height: 22px;
}
.img-name {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  text-align: left;
  padding-top: 0px;
}
.img-word {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34);
  text-align: left;
  margin: 0px;
  margin-top: 10px;
}
.img-id-gold {
  font-size: 64px;
  font-weight: 700;
  color: #cf9870;
  text-align: right;
  margin: 0px;
  line-height: 50px;
}
.img-id {
  font-size: 64px;
  color: rgba(0, 0, 0, 0.34);
  text-align: right;
  margin: 0px;
  line-height: 50px;
  white-space: nowrap;
}
.line-limit-length {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px;
}
.main {
  font-family: Arial, "Microsoft YaHei", "Microsoft Sans Serif",
    "Microsoft SanSerf", 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
}
h2 {
  display: block;
  font-size: 24px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

</style>
