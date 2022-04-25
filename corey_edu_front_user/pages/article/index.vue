<template>
  <div>
    <div class="left-nav">
      <div class="left-title">
        文章
        <div class="left-list">
          <ul>
            <li v-for="data in articleList.items" :key="data.id">
              <div class="img">
                <a :href="'/article/' + data.id">
                  <img :src="data.contentImg" alt="" />
                </a>
              </div>
              <div class="right-word">
                <a :href="'/article/' + data.id">
                  {{ data.contentTitle }}
                  <span class="fuwenben">{{ data.contentDescription }}</span>
                </a>
                <div class="dianzan">
                  <img src="~/assets/img/pinglun.png" alt="" />
                  <span>{{ "(" + data.contentComment + ")" }}</span>
                  <img
                    @click="hitZan(data.id)"
                    src="~/assets/img/zanqian.png"
                    alt="文章不错，赞一个~"
                  />
                  <span>{{ "(" + data.contentHit + ")" }}</span>
                  <div class="time">
                    {{ data.gmtCreate }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="paihang">
      <div class="paihang-title">文章排行榜</div>
      <div class="paihang-list" v-for="(data, idx) in hotArticle" :key="data.id">
        <div class="paihang-first">
          <div class="paihang-box">{{ idx + 1 }}</div>
          <div class="paihang-word">
            <a :href="'/article/' + data.id">{{ data.contentTitle }}</a>
          </div>
        </div>
        <div class="paihang-time">
          {{ data.gmtCreate }}
          <div class="paihang-dianzan">
            <img src="~/assets/img/pinglun.png" alt="" />
            <span>{{ "(" + data.contentComment + ")" }}</span>
            <a href="javascript:void(0)">
              <img
                src="~/assets/img/zanqian.png"
                @click="hitZan(data.id)"
                alt="文章不错，赞一个~"
              />
            </a>
            <span>{{ "(" + data.contentHit + ")" }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
        <el-pagination
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-sizes="[8, 16, 32, 48, 64, 80]"
          style="padding: 30px 0; text-align: center;"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="gotoPage"
          @size-change="changeSize"
        />
  </div>
</template>
<script>
import articleApi from "@/api/article";
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      articleQuery: {},
      articleList: {},
      hotArticle: {},
    };
  },
  created() {
    this.gotoPage(this.page);
    // this.getCommentList();
    this.getHotArticle();
  },
  methods: {
    hitZan(id) {
      articleApi.hitZan(id).then((res) => {
        // this.$message({
        //   type: "success",
        //   message: "点赞成功",
        // })
        this.gotoPage(1)
        this.getHotArticle()
      });
    },
    changeSize(size) {
      this.limit = size
      this.gotoPage(1)
    },
    //3.分页切换的方法
    gotoPage(page = 1) {
      this.page = page
      articleApi.getArticleList(this.page, this.limit).then((res) => {
        this.articleList = res.data.data;
        this.total = res.data.data.total
      });
    },
    //获取文章评论列表
    getCommentList() {
      articleApi.getCommentList(this.page, this.limit).then((res) => {
        this.commentList = res.data.data;
      });
    },
    //获取热门文章
    getHotArticle() {
      articleApi.getHotArticle().then((res) => {
        this.hotArticle = res.data.data.hotArticle;
        console.log("hotArticle:", this.hotArticle)
      });
    },
  },
};
</script>
<style lang="css" scoped>
.paihang {
  display: inline-block;
  width: 20%;
  margin-left: 30px;
  margin-top: 80px;
  vertical-align: top;
}
.paihang-title {
  font-size: 30px;
  margin-top: 10px;
}
.paihang-list {
  padding-top: 30px;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.paihang-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ca9191;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  transform: translateY(-100%);
}
.paihang-time img {
  width: 20px;
  height: 20px;
}
.paihang-time {
  position: relative;
  font-size: 14px;
  color: #8c8c8c;
}
.paihang-dianzan {
  position: absolute;
  right: 2%;
  bottom: 1%;
}
.fuwenben {
  display: inline-block;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #8c8c8c;
}
.paihang-word {
  display: inline-block;
  margin-left: 10px;
  font-size: 30px;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left-nav {
  display: inline-block;
  width: 60%;
  margin-left: 10%;
  margin-top: 80px;
}
.left-title {
  font-size: 30px;
  margin: 10px;
}
.left-list {
  width: 100%;
  border-top: 1px solid #d9d9d9;
}
ul {
  width: 100%;
  overflow: hidden;
}
li {
  width: 100%;
  padding: 30px;
  border-bottom: 1px solid #d9d9d9;
}
.img {
  display: inline-block;
  width: 20%;
  height: 150px;
}
.img img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.right-word {
  display: inline-block;
  vertical-align: top;
  margin-left: 30px;
  height: 150px;
  width: 75%;
}
.right-word a {
  font-size: 26px;
}
.dianzan {
  width: 100%;
  position: relative;
}
.dianzan span {
  font-size: 16px;
}
.dianzan img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.dianzan .time {
  position: absolute;
  font-size: 14px;
  color: #8c8c8c;
  right: 10%;
  bottom: 1%;
}
</style>
