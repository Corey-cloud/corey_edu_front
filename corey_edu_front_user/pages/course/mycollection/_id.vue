<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程收藏列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">收藏列表</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="!data || data.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >您还没有收藏过课程，去课程中心看看吧...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data && data.length > 0" class="comm-course-list">
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
                      >{{ item.title }}</a
                    >
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
                          {{ (item.commentCount / 100000000).toFixed(1) }}亿评论
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
    <!-- 收藏列表 结束 -->
  </div>
</template>
<script>
import collect from "@/api/collect";

export default {
    asyncData({ params, error }) {
    return { memberId: params.id };
  },
  data() {
    return {
        memberId: '',
      data: {}, //收藏列表
    };
  },
  created() {
    console.log("memberId:", this.memberId)
    this.list();
  },
  methods: {
      list() {
        collect.list(this.memberId).then(res => {
            this.data = res.data.data.collectList
        })
      }
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
