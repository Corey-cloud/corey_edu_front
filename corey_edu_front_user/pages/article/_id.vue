<template>
  <div>
    <div class="all">
      <div class="top-nav">
        <span>首页 \</span>
        <a href="/article">文章列表 \</a>
        <span>{{ content.contentTitle }}</span>
      </div>
      <div class="top-title">
        {{ content.contentTitle }}
        <div class="top-time">
          {{ content.gmtCreate }}
          <div class="pinglun">
            <img src="~/assets/img/pinglun.png" alt="" />
            <span> {{ "(" + cmNum + ")" }}</span>
            <a href="javascript:void(0)">
              <img src="~/assets/img/zanqian.png" @click="hitZan(content.id)" alt="文章不错，赞一个~" />
            </a>
            <span>{{ "(" + content.contentHit + ")" }}</span>
          </div>
        </div>
      </div>
      <div class="wenzhang" v-html="content.contentDetails"></div>
    </div>

    <!-- 评论 开始-->

    <div class="mt50 commentHtml i-box pl">
      <div>
        <h6 class="c-c-content c-infor-title pl-title" id="i-art-comment">
          <span class="commentTitle">文章评论</span>
        </h6>

        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img
                  width="50"
                  height="50"
                  class="picImg"
                  :src="myComment.avatar"
                />
              </aside>

              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea
                      name=""
                      v-model="myComment.content"
                      placeholder="输入您要评论的文字"
                      id="commentContent"
                    ></textarea>
                  </fieldset>

                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                        style="display: none"
                      ></tt
                    ></span>

                    <input
                      type="button"
                      @click="commitComment()"
                      value="回复"
                      class="lh-reply-btn"
                    />
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>

        <section class="mt20">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li
                v-for="(comment, index) in pageData.items"
                v-bind:key="index"
              >
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="comment.avatar"
                  />
                </aside>
                <div class="of">
                  <span class="fl">
                    <font class="fsize12 c-blue">
                      {{ comment.nickname }}</font
                    >
                    <font class="fsize12 c-999 ml5">评论：</font></span
                  >
                </div>

                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>

                <div class="of mt5">
                  <span class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      comment.gmtCreate
                    }}</font></span
                  >
                </div>
              </li>
            </ul>
          </section>
        </section>
        <!-- 评论 结束-->

        <!-- 公共分页 开始 -->
        <div :style="!pageDisable ? 'display: none' : ''">
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->

            <a
              :class="{ undisable: !pageData.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              >首</a
            >

            <a
              :class="{ undisable: !pageData.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(pageData.current - 1)"
              >&lt;</a
            >

            <a
              v-for="page in pageData.pages"
              :key="page"
              :class="{
                current: pageData.current == page,
                undisable: pageData.current == page,
              }"
              :title="'第' + page + '页'"
              href="#"
              @click.prevent="gotoPage(page)"
              >{{ page }}</a
            >

            <a
              :class="{ undisable: !pageData.hasNext }"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(pageData.current + 1)"
              >&gt;</a
            >

            <a
              :class="{ undisable: !pageData.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(pageData.pages)"
              >末页</a
            >

            <div class="clear" />
          </div>
        </div>

        <!-- 公共分页 结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article";
import cookie from "js-cookie";
export default {
  data() {
    return {
      content: {},
      pageData: {},
      //评论提交信息
      myComment: {
        id: null,
        articleId: "",
        memberId: "",
        mickname: "",
        avatar: "https://edu-425.oss-cn-chengdu.aliyuncs.com/tx.jpg",
        content: "",
      },
      pageDisable: false, //是否显示分页条
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {
    cmNum() {
      if (this.pageData.total) {
        return this.pageData.total;
      } else {
        return "0";
      }
    },
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getArticleInfo(id);
        this.gotoPage(1);
        var userStr = cookie.get("guli_ucenter");
        if (userStr) {
          //把字符串转换json对象
          if (userStr) {
            this.userInfo = JSON.parse(userStr);
            this.myComment.memberId = this.userInfo.id;
            this.myComment.avatar = this.userInfo.avatar;
            this.myComment.nickname = this.userInfo.nickname;
            this.myComment.articleId = id;
          } else {
            //未登录
            this.myComment.avatar =
              "https://edu-425.oss-cn-chengdu.aliyuncs.com/tx.jpg";
          }
        }
      } else {
        console.log("=== 你从何而来？我没拿到文章id");
      }
    },
    getArticleInfo(id) {
      articleApi.getArticle(id).then((res) => {
        this.content = res.data.data.article;
      });
    },
    //提交评论
    commitComment() {
      articleApi.commitComment(this.myComment).then((res) => {
        // 未登录评论（code:28000）处理
        if (res.data.code == 28000) {
          this.$confirm('您尚未登录，无法进行评论，是否跳转至登录页面？','用户未登录提示',{
            confirmButtonText: '去登录',
            cancelButtonText: '算了',
            type: 'warning'
          }).then(() => {
            this.$router.push({path: '/login'})
          }).catch(_ => {
            return
          })
        }
        if (res.data.code === 20000) {
          this.myComment.content = "";
          this.$message({
            message: "评论成功",
            type: "success",
          });
          this.gotoPage(1);
          this.myComment.content = "";
        }
      });
    },
    //评论分页
    gotoPage(page) {
      articleApi.getCommentList(page, 4, this.$route.params.id).then((res) => {
        if (res.data.data.items) {
          this.pageDisable = true;
          this.pageData = res.data.data;
        } else {
          this.pageDisable = false;
        }
      });
    },
    hitZan(id) {
      articleApi.hitZan(id).then((res) => {
        this.$message({
          type: "success",
          message: "点赞成功",
        })
        this.getArticleInfo(id)
      });
    },
  },
};
</script>
<style lang="css" scoped>
.mt50 {
  margin-left: 15%;
  width: 55%;
}
.all {
  width: 55%;
  margin-left: 15%;
}
.top-nav {
  padding: 30px 0;
  font-size: 20px;
}
.top-nav span {
  color: #8c8c8c;
}
.top-nav a {
  color: #8c8c8c;
}
.top-title {
  font-size: 26px;
  padding-bottom: 20px;
  border-bottom: 1px solid #8c8c8c;
}
.top-time {
  position: relative;
  width: 100%;
  font-size: 16px;
  color: #bfbfbf;
}
.pinglun {
  position: absolute;
  right: 1%;
  bottom: 1%;
  font-size: 16px;
}
.pinglun img {
  width: 20px;
  height: 20px;
}
.pinglun span {
  color: #bfbfbf;
}
.wenzhang {
  width: 100%;
  padding: 20px;
  margin-bottom: 50px;
}
</style>
