<script>
import RankingList from './RankingList.vue'
import Card from './Card.vue'
export default {
  name: 'Recommond',
  components: {
    RankingList,
    Card
  },
  props: ['recommondItems', 'rankinglist']
}
</script>

<template>
  <div class="main-item">
    <el-row>
      <el-col :span="17">
        <div class="title">
          <h2 style="text-align:left;font-weight:700;">
            课程推荐
            <a target="_blank" href="/course" class="more-span">更多></a>
          </h2>
        </div>
        <el-row>
          <el-col :span="7"
                  v-for="(item,index) in recommondItems" :key="index"
                  style="margin-right: 26px;margin-bottom: 30px;">
            <card :card="item"></card>
          </el-col>
        </el-row>
      </el-col>
      <!-- 排行榜 -->
      <el-col :span="7">
        <ranking-list :rankinglist="rankinglist"></ranking-list>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 20px;
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
.more-span {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.56);
  cursor: pointer;
  float: right;
  margin-right: 3em;
}
.more-span:hover {
  color: #32aaff;
}
</style>
