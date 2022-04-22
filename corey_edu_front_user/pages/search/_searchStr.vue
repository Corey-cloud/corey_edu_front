<template>
  <div>
    <div id="aCoursesList" class="bg-fa of">
      <el-input
        placeholder="通过课程名搜索"
        v-model="searchStr"
        class="searchClass"
        @change="handleEnter"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- /课程搜索结果列表 开始 -->
      <section class="container">
        <section class="c-sort-box">
          <div class="mt40">
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="!data || data.length == 0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam"
                >没有相关数据，小编正在努力整理中...</span
              >
            </section>
            <!-- /无数据提示 结束-->
            <article v-if="data && data.length > 0" class="comm-course-list">
              <span class="c-666 fsize14 ml10 vam"
                ><h1>为您检索到以下<span style="color: blue; font-size: 22px;"> {{data.length}} </span>条结果：</h1></span
              >
              <ul class="of" id="bna">
                <li v-for="item in data" :key="item.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="item.cover"
                        class="img-responsive"
                        :alt="item.title"
                      />
                      <div class="cc-mask">
                        <a
                          :href="'/course/' + item.id"
                          title="开始学习"
                          target="_blank"
                          class="comm-btn c-btn-1"
                          >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        :href="'/course/' + item.id"
                        :title="item.title"
                        target="_blank"
                        class="course-title fsize18 c-333"
                        ><p v-html="item.title"></p
                      ></a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span
                        class="fr jgTag bg-green"
                        v-if="Number(item.price) === 0"
                      >
                        <i class="c-fff">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc">
                        <i class="c-999">
                          <span v-if="Number(item.viewCount) >= 100000000">
                            {{ (item.viewCount / 100000000).toFixed(1) }}亿播放
                          </span>
                          <span v-else-if="Number(item.viewCount) >= 10000">
                            {{ (item.viewCount / 10000).toFixed(1) }}万播放
                          </span>
                          <span v-else> {{ item.viewCount }}播放 </span>
                        </i>
                        |
                        <i class="c-999">
                          <span v-if="Number(item.commentCount) >= 100000000">
                            {{
                              (item.commentCount / 100000000).toFixed(1)
                            }}亿评论
                          </span>
                          <span v-else-if="Number(item.commentCount) >= 10000">
                            {{ (item.commentCount / 10000).toFixed(1) }}万评论
                          </span>
                          <span v-else> {{ item.commentCount }}评论 </span>
                        </i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
          </div>
        </section>
      </section>
      <!-- /课程列表 结束 -->
    </div>
  </div>
</template>
<script>
import courseApi from "@/api/course";

export default {
  data() {
    return {
      data: [],
      searchStr: "", // 查询内容
    };
  },
  asyncData({ params, error }) {
    return courseApi.searchCourse(params.searchStr).then((response) => {
      return {
        searchStr: params.searchStr,
        data: response.data.data.courseList,
      };
    });
  },
  created() {
    if (this.data && this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].title = this.data[i].title.replace(
          eval("/" + this.searchStr + "/g"),
          `<span style="color:red">${this.searchStr}</span>`
        );
      }
    }
  },

  methods: {
    handleEnter() {
      courseApi.searchCourse(this.searchStr).then((response) => {
        this.data = response.data.data.courseList;
        if (this.data && this.data.length > 0) {
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].title = this.data[i].title.replace(
              eval("/" + this.searchStr + "/g"),
              `<span style="color:red">${this.searchStr}</span>`
            );
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
<style>
.searchClass {
  width: 50%;
  margin-top: 50px;
  margin-left: 500px;
  margin-right: 500px;
}
</style>
