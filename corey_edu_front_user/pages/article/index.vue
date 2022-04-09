<template>
  <div>
    <div class="left-nav">
      <div class="left-title">
        文章
        <div class="left-list">
          <ul>
            <li v-for="data in dataList.records" :key="data.id">
              <div class="img">
                <img :src="data.contentImg" alt="" />
              </div>
              <div class="right-word">
                <a :href="'/article/' + data.id">{{ data.contentTitle }}</a>
                <span class="fuwenben">{{ data.contentDescription }}</span>
                <div class="dianzan">
                  <img src="~/assets/img/pinglun.png" alt="" />
                  <span>{{ "(" + data.contentComment + ")" }}</span>
                  <img
                    @click="hitZan(data.id)"
                    src="~/assets/img/zanqian.png"
                    alt=""
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
      <div class="paihang-list" v-for="(data, idx) in hotData" :key="data.id">
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
            <img
              @click="hitZan(data.id)"
              src="~/assets/img/zanqian.png"
              alt=""
            />
            <span>{{ "(" + data.contentHit + ")" }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 公共分页 开始 -->
    <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->

        <a
          :class="{ undisable: !dataList.hasPrevious }"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)"
          >首</a
        >

        <a
          :class="{ undisable: !dataList.hasPrevious }"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(dataList.current - 1)"
          >&lt;</a
        >

        <a
          v-for="page in dataList.pages"
          :key="page"
          :class="{
            current: dataList.current == page,
            undisable: dataList.current == page,
          }"
          :title="'第' + page + '页'"
          href="#"
          @click.prevent="gotoPage(page)"
          >{{ page }}</a
        >

        <a
          :class="{ undisable: !dataList.hasNext }"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(dataList.current + 1)"
          >&gt;</a
        >

        <a
          :class="{ undisable: !dataList.hasNext }"
          href="#"
          title="末页"
          @click.prevent="gotoPage(dataList.pages)"
          >末页</a
        >

        <div class="clear" />
      </div>
    </div>
    <!-- 公共分页 结束 -->
  </div>
</template>
<script>
import contentApi from "@/api/article";
export default {
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      dataList: [],
      hotData: [],
    };
  },
  mounted() {
    this.getCommentList();
    this.getHotData();
  },
  methods: {
    hitZan(id) {
      contentApi.hitZan(id).then((res) => {
        this.$message({
          type: "success",
          message: "点赞成功",
        });
      });
    },
    //3.分页切换的方法
    gotoPage(page) {
      contentApi.getContentList(page, this.pageSize).then((res) => {
        this.dataList = res.data.data;
      });
    },
    getCommentList() {
      contentApi.getContentList(this.pageNum, this.pageSize).then((res) => {
        this.dataList = res.data.data;
      });
    },
    getHotData() {
      contentApi.getHotContent().then((res) => {
        this.hotData = res.data.data;
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
