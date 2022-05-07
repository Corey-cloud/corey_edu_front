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
        <div class="tag-group">
          <!-- <span class="tag-group__title">Dark</span> -->
          <el-tag
            style="margin-left: 5px"
            size="small"
            v-for="item in items"
            :key="item"
            type="info"
          >
            {{ item }}
          </el-tag>
        </div>
        <div class="top-time">
          {{ content.gmtCreate }}
          <div class="view">
            <img style="left: 10px" src="~/assets/img/view.png" alt="" />
            <span style="color: #8b8b8b">{{ content.contentView }}</span>
          </div>
        </div>
      </div>
      <div class="wenzhang" v-html="content.contentDetails"></div>
      <div class="pinglun">
        <a href="javascript:void(0)">
          <img
            src="~/assets/img/zanqian.png"
            @click="hitZan(content.id)"
            alt=""
          />
        </a>
        <span style="color: #8b8b8b">{{ content.contentHit }}</span>
        &nbsp;
        <a href="#comment">
          <img src="~/assets/img/pinglun.png" alt="" />
        </a>
        <span style="color: #8b8b8b"> {{ cmNum }}</span>
      </div>
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

              <div id="comment" class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea
                      name=""
                      v-model="myComment.content"
                      placeholder="写评论"
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
                      value="发送"
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
              <li v-for="(comment, index) in pageData.items" v-bind:key="index">
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
                    <font class="fsize12 c-blue"> {{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span
                  >
                </div>

                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>

                <div class="of mt5">
                  <a href="javascript:void(0)" style="margin-left: 60px">
                    <img
                      width="18"
                      src="~/assets/img/zanqian.png"
                      @click="zan(comment.id)"
                      alt=""
                    />
                  </a>
                  <span style="color: #8b8b8b">{{ comment.zanCount }}</span>
                  <span class="fr">
                    <font class="fsize12 c-999 ml5">
                      <span v-if="comment.comeFrom">
                        来自{{ comment.comeFrom.substring(0, 2) }}
                        &nbsp;
                      </span>
                      {{ comment.gmtCreate }}
                    </font>
                  </span>
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
      items: [],
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
      } else {
        console.log("=== 你从何而来？我没拿到文章id");
      }
    },
    getArticleInfo(id) {
      articleApi.getArticle(id).then((res) => {
        this.content = res.data.data.article;
        this.items = res.data.data.article.contentType.split(",");
      });
    },
    //提交评论
    commitComment() {
      articleApi.commitComment(this.myComment).then((res) => {
        // 未登录评论（code:28000）处理
        if (res.data.code == 28000) {
          this.$confirm(
            "您尚未登录，无法进行评论，是否跳转至登录页面？",
            "用户未登录提示",
            {
              confirmButtonText: "去登录",
              cancelButtonText: "算了",
              type: "warning",
            }
          )
            .then(() => {
              this.$router.push({ path: "/login" });
            })
            .catch((_) => {
              return;
            });
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
      this.page = page;
      articleApi
        .getCommentList(this.page, 4, this.$route.params.id)
        .then((res) => {
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
        // this.$message({
        //   type: "success",
        //   message: "点赞成功",
        // });
        this.getArticleInfo(id);
      });
    },
    zan(id) {
      articleApi.zan(id).then((res) => {
        // this.$message({
        //   type: "success",
        //   message: "点赞成功",
        // });
        this.gotoPage(this.page);
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
.view {
  position: absolute;
  right: 75%;
  bottom: 1%;
  font-size: 16px;
}
.view img {
  width: 20px;
  height: 20px;
}
.view span {
  color: #bfbfbf;
}
.pinglun {
  position: fixed;
  right: 50%;
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
