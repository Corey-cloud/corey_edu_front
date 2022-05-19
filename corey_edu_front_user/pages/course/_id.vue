<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <span title class="c-999 fsize14">{{
          courseWebVo.subjectLevelOne
        }}</span>
        \
        <span class="c-333 fsize14">{{ courseWebVo.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              height="357px"
              :src="courseWebVo.cover"
              :alt="courseWebVo.title"
              style="width: 100%"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseWebVo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b
                v-if="Number(courseWebVo.price) == 0"
                class="c-yellow"
                style="font-size: 24px"
                >免费</b
              >
              <b v-else class="c-yellow" style="font-size: 24px"
                >￥{{ courseWebVo.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲讲师：
                {{ courseWebVo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <div v-if="!this.isCollect">
                  <img
                    class="icon18 scIcon"
                    src="~/assets/img/shoucangf.png"
                    alt="收藏"
                  />
                  <a class="c-fff vam" title="收藏" href="#" @click="collect"
                    >收藏</a
                  >
                </div>
                <div v-else>
                  <img
                    class="icon18 scIcon"
                    src="~/assets/img/shoucang.png"
                    alt="收藏"
                  />
                  <a
                    style="color: red"
                    class="c-fff vam"
                    title="收藏"
                    href="#"
                    @click="collect"
                    >收藏</a
                  >
                </div>
              </span>
            </section>
            <section
              v-if="Number(courseWebVo.price) === 0 || isbuy"
              class="c-attr-mt"
            >
              <a
                target="_blank"
                :href="
                  '/player/' +
                  this.chapterVideoList[0].children[0].videoSourceId
                "
                title="立即观看"
                class="comm-btn c-btn-3"
                >立即观看</a
              >
            </section>
            <section v-else class="c-attr-mt">
              <a
                @click="createOrder()"
                href="javascript:void(0)"
                title="立即购买"
                class="comm-btn c-btn-3"
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />

                <h6
                  class="c-fff f-fM mt10"
                  v-if="courseWebVo.viewCount >= 100000000"
                >
                  {{
                    parseFloat((courseWebVo.viewCount / 100000000).toFixed(1))
                  }}亿
                </h6>
                <h6
                  class="c-fff f-fM mt10"
                  v-else-if="courseWebVo.viewCount >= 10000"
                >
                  {{ parseFloat(courseWebVo.viewCount / 10000).toFixed(1) }}万
                </h6>
                <h6 class="c-fff f-fM mt10" v-else>
                  {{ parseFloat(courseWebVo.viewCount) }}
                </h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>

                            <ol
                              class="lh-menu-ol"
                              style="display: block"
                              v-if="chapter.children"
                            >
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <span v-if="video.isFree">
                                  <a
                                    :href="'/player/' + video.videoSourceId"
                                    target="_blank"
                                  >
                                    <span class="fr">
                                      <i class="free-icon vam mr10">免费试看</i>
                                    </span>
                                    <em class="lh-menu-i-2 icon16 mr5"
                                      >&nbsp;</em
                                    >{{ video.title }}
                                  </a>
                                </span>
                                <span v-else>
                                  <span v-if="isbuy">
                                    <a
                                      :href="'/player/' + video.videoSourceId"
                                      target="_blank"
                                    >
                                      <em class="lh-menu-i-2 icon16 mr5"
                                        >&nbsp;</em
                                      >{{ video.title }}
                                    </a>
                                  </span>
                                  <span v-else>
                                    <a href="javascript:void(0)">
                                      <em class="lh-menu-i-2 icon16 mr5"
                                        >&nbsp;</em
                                      >{{ video.title }}
                                    </a>
                                  </span>
                                </span>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <a target="_blank" :href="'/teacher/' + courseWebVo.teacherId">
                <section class="stud-act-list">
                  <ul style="height: auto">
                    <li>
                      <div class="u-face">
                        <a
                          target="_blank"
                          :href="'/teacher/' + courseWebVo.teacherId"
                        >
                          <img
                            :src="courseWebVo.avatar"
                            width="50"
                            height="50"
                            alt
                          />
                        </a>
                      </div>
                      <section class="hLh30 txtOf">
                        <a
                          target="_blank"
                          class="c-333 fsize16 fl"
                          :href="'/teacher/' + courseWebVo.teacherId"
                          >{{ courseWebVo.teacherName }}</a
                        >
                      </section>
                      <section class="hLh20 txtOf">
                        <span class="c-999" v-html="courseWebVo.intro"></span>
                      </section>
                    </li>
                  </ul>
                </section>
              </a>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
      <div class="mt50 commentHtml">
        <div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="comment.avatar"
                  />
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea
                        name=""
                        v-model="comment.content"
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
                        @click="addComment()"
                        value="发送"
                        class="lh-reply-btn"
                      />
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment, index) in data.items" v-bind:key="index">
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
                    <a href="javascript:void(0)" style="margin-left: 60px">
                      <img
                        width="18"
                        src="~/assets/img/zanqian.png"
                        @click="zan(comment.id)"
                        alt=""
                      />
                    </a>
                    <span style="color: #8b8b8b">{{ comment.zanCount }}</span>
                    <span class="fr"
                      ><font class="fsize12 c-999 ml5">
                        <span v-if="comment.comeFrom">
                          来自{{ comment.comeFrom.substring(0, 2) }}
                          &nbsp;
                        </span>
                        {{ comment.gmtCreate }}</font
                      ></span
                    >
                  </div>
                </li>
              </ul>
            </section>
          </section>
          <!-- 公共分页 开始 -->
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              >首</a
            >
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current - 1)"
              >&lt;</a
            >
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{
                current: data.current == page,
                undisable: data.current == page,
              }"
              :title="'第' + page + '页'"
              href="#"
              @click.prevent="gotoPage(page)"
              >{{ page }}</a
            >
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current + 1)"
              >&gt;</a
            >
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)"
              >末</a
            >
            <div class="clear" />
          </div>
          <!-- 公共分页 结束 -->
        </div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import courseApi from "@/api/course";
import ordersApi from "@/api/order";
import comment from "@/api/comment";
import collect from "@/api/collect";
import cookie from "js-cookie";

export default {
  asyncData({ params, error }) {
    return { courseId: params.id };
  },
  data() {
    return {
      isCollect: false,
      data: {},
      page: 1,
      limit: 4,
      total: 10,
      comment: {
        avatar: "https://edu-425.oss-cn-chengdu.aliyuncs.com/tx.jpg",
        content: "",
        courseId: "",
      },
      courseWebVo: {},
      chapterVideoList: [],
      isbuy: false,
      loginInfo: {},
    };
  },
  created() {
    //在页面渲染之前执行
    this.initCourseInfo();
    this.initComment();
  },
  methods: {
    //查询课程详情信息
    initCourseInfo() {
      courseApi.getById(this.courseId).then((response) => {
        (this.courseWebVo = response.data.data.course),
          (this.chapterVideoList = response.data.data.chapterVoList),
          (this.isbuy = response.data.data.isBuyCourse);
        this.isCollect = response.data.data.isCollect;
      });
    },

    collect() {
      var jsonStr = cookie.get("guli_ucenter");
      if (!jsonStr) {
        // 未登录收藏（code:28000）处理
        this.$confirm(
          "您尚未登录，无法收藏课程，是否跳转至登录页面？",
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
        return
      }
      var jsonStr = cookie.get("guli_ucenter");
      if (this.isCollect) {
        if (jsonStr) {
          this.loginInfo = JSON.parse(jsonStr);
        }
        let memberId = this.loginInfo.id;
        let courseId = this.courseWebVo.id;
        collect.cancel(memberId, courseId).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "取消收藏成功",
            });
            this.isCollect = false;
          }
        });
        return;
      } else {
        if (jsonStr) {
          this.loginInfo = JSON.parse(jsonStr);
        } else {
          // 未登录收藏（code:28000）处理
          this.$confirm(
            "您尚未登录，无法收藏课程，是否跳转至登录页面？",
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
        let memberId = this.loginInfo.id;
        let courseId = this.courseWebVo.id;
        let collectBody = { memberId, courseId };
        collect.collectCourse(collectBody).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.isCollect = true;
          }
        });
      }
    },

    initComment() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        var userStr = cookie.get("guli_ucenter");
        if (userStr) {
          this.userInfo = JSON.parse(userStr);
          this.comment.memberId = this.userInfo.id;
          this.comment.avatar = this.userInfo.avatar;
          this.comment.nickname = this.userInfo.nickname;
        } else {
          //未登录
          this.comment.avatar =
            "https://edu-425.oss-cn-chengdu.aliyuncs.com/tx.jpg";
        }
      } else {
        console.log("=== 你从何而来？我没拿到课程id");
      }
      comment
        .getPageList(this.page, this.limit, this.courseId)
        .then((response) => {
          this.data = response.data.data;
        });
    },
    addComment() {
      this.comment.courseId = this.courseId;
      this.comment.teacherId = this.courseWebVo.teacherId;
      comment.addComment(this.comment).then((response) => {
        // 未登录评论（code:28000）处理
        if (response.data.code == 28000) {
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
        if (response.data.success) {
          this.comment.content = "";
          this.initComment();
        }
      });
    },

    gotoPage(page) {
      comment.getPageList(page, this.limit, this.courseId).then((response) => {
        this.data = response.data.data;
      });
    },

    zan(id) {
      comment.zan(id).then((res) => {
        // this.$message({
        //   type: "success",
        //   message: "点赞成功",
        // });
        this.gotoPage(this.page);
      });
    },

    //生成订单
    createOrder() {
      ordersApi.createOrder(this.courseId).then((response) => {
        // 未登录购买（code:28004）处理
        if (response.data.code == 28004) {
          this.$confirm(
            "您尚未登录，无法进行购买，是否跳转至登录页面？",
            "用户未登录提示",
            {
              confirmButtonText: "去登录",
              cancelButtonText: "算了",
              type: "warning",
            }
          ).then(() => {
            this.$router.push({ path: "/login" });
          });
          // 当前订单已存在待支付
        } else if (response.data.code == 28001) {
          this.$alert("当前存在已创建待支付的订单，请稍候再试");
        } else {
          //获取返回订单号
          //生成订单之后，跳转订单显示页面
          let routerJump = this.$router.resolve({
            path: "/order/" + response.data.data.orderId,
          });
          window.open(routerJump.href, "_blank");
        }
      });
    },
  },
};
</script>
