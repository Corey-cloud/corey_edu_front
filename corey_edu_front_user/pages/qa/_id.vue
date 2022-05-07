<template>
  <div>
    <div class="all">
      <div class="top-nav">
        <span>首页 \</span>
        <a href="/qa">全部问答 \</a>
        <span>{{ question.questionTitle }}</span>
      </div>
      <div class="list1">
        <div class="people">
          <div class="touxiang">
            <img :src="question.memberAvatar" alt="" />
          </div>
          <div class="username">{{ question.memberNickname }}</div>
        </div>
        <div class="question">
          <div class="wenti">
            <img src="~/assets/img/wenti.png" alt="" />
            <a>{{ question.questionTitle }}</a>
          </div>
          <div class="huida">
            <span>{{ question.questionDetails }}</span>
          </div>
          <div class="shijian">{{ question.gmtModified }}</div>
          <div class="dianzan">
            <img style="margin-left: 10px" src="~/assets/img/view.png" alt="" />
            <span style="color: #8B8B8B">{{ question.qaView }}</span>
            &nbsp;
            <img
              style="margin-left: 10px"
              @click="dialogVisible = true"
              src="~/assets/img/pinglun.png"
              alt=""
            />&nbsp;评论
            <span style="color: #8B8B8B">({{ question.qaComments }})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="show-title">讨论区</div>

    <div class="show-pinglun" v-for="(data, idx) in oneAnswer" :key="idx">
      <div class="touxiang">
        <img :src="data.memberAvatar" alt="" />
      </div>
      <div class="show-huifu">
        <span>{{ data.memberNickname }} </span><span> 回复:</span><br />
        <span>{{ data.answerDetails }}</span>
        <div class="dianzan1" display="display">
          <img
            @click="changeIsShowAnswer(data.id)"
            src="~/assets/img/pinglun.png"
            alt=""
          />&nbsp;评论
          <a href="javascript:void(0)" style="margin-left: 30px">
            <img
              width="18"
              src="~/assets/img/zanqian.png"
              @click="zan1(data.id)"
              alt=""
            />
          </a>
          <span style="color: #8B8B8B">{{ data.zanCount }}</span>
          <div class="shijian1" style="color: #999; font-size: 12px; font-family: Helvetica NeueHelvetica,Hiragino Sans GB,Arial,sans-serif;">
            <span style="color: #999; font-size: 12px; font-family: Helvetica NeueHelvetica,Hiragino Sans GB,Arial,sans-serif;" v-if="data.comeFrom">
              来自{{ data.comeFrom.substring(0,2) }}
              &nbsp;
            </span>
            {{ data.gmtModified }}
          </div>
        </div>
        <div class="son-input" v-show="data.isShowAnswer">
          <el-input type="textarea" 
            :autosize="{ minRows: 4, maxRows: 8}" v-model="input" placeholder="请输入内容"></el-input>
          <el-button
            type="primary"
            @click="replyAnswer2(data.id)"
            class="commit"
            >发送</el-button
          >
        </div>
        <div
          class="son-huifu"
          v-for="(sonData, idx) in data.answer2List"
          :key="idx"
        >
          <div class="touxiang">
            <img :src="sonData.memberAvatar" alt="" />
          </div>
          <div class="son-pinglun">
            <span>{{ sonData.memberNickname + " : " }}</span
            ><br />
            <span>{{ sonData.asDetails }}</span>
          </div>
          <br/>
          <br/>
          <br/>
          <div>
            <a href="javascript:void(0)" style="margin-left: 100px">
              <img
                width="18"
                src="~/assets/img/zanqian.png"
                @click="zan2(sonData.id)"
                alt=""
              />
            </a>
            <span style="color: #8B8B8B">{{ sonData.zanCount }}</span>
            <div class="shijian1" style="color: #999; font-size: 12px; font-family: Helvetica NeueHelvetica,Hiragino Sans GB,Arial,sans-serif;">
              <span style="color: #999; font-size: 12px; font-family: Helvetica NeueHelvetica,Hiragino Sans GB,Arial,sans-serif;" v-if="sonData.comeFrom">
                来自{{ sonData.comeFrom.substring(0,2) }}
                &nbsp;
              </span>
              {{ sonData.gmtModified }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="评论" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8 }"
        placeholder="请输入内容"
        v-model="textarea2"
      >
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="replyAnswer1()">发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qaApi from "@/api/qa";
import cookie from "js-cookie";
export default {
  data() {
    return {
      dialogVisible: false,
      textarea2: "",
      input: "",
      isShowAnswer: false,
      question: {},
      oneAnswer: [],
      reply1Answer: {}, //一级回复
      reply2Answer: {}, //二级回复
      userInfo: {},
    };
  },
  created() {
    this.initInfo();
  },
  methods: {
    changeIsShowAnswer(id) {
      this.oneAnswer.forEach((i) => {
        if (i.id == id) {
          i.isShowAnswer = !i.isShowAnswer;
        }
      });
    },
    initInfo() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        qaApi.getQuestionById(id).then((res) => {
          this.question = res.data.data.question;
        });
        qaApi.getQtAnswerList(id).then((res) => {
          let question = res.data.data.questionTree;
          question.qaAnswerList.forEach((i) => (i.isShowAnswer = false));
          this.question = question;
          this.oneAnswer = question.qaAnswerList;
        });
      }
    },
    //一级回复
    replyAnswer1() {
      if (!this.getLoginUserInfo()) {
        return;
      }
      this.dialogVisible = false;
      this.reply1Answer = {
        memberId: this.userInfo.id,
        memberNickname: this.userInfo.nickname,
        memberAvatar: this.userInfo.avatar,
        questionId: this.question.id,
        answerDetails: this.textarea2,
      };
      qaApi.reply1Answer(this.reply1Answer).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "评论成功",
            type: "success",
          });
          this.textarea2 = ""
          this.initInfo();
        } else {
          this.$message({
            message: "评论失败",
            type: "error",
          });
        }
      });
    },
    replyAnswer2(answerId) {
      if (!this.getLoginUserInfo()) {
        return;
      }
      this.isShowAnswer = false;
      this.reply2Answer = {
        memberId: this.userInfo.id,
        memberNickname: this.userInfo.nickname,
        memberAvatar: this.userInfo.avatar,
        questionId: this.question.id,
        asDetails: this.input,
        answerId: answerId,
      };
      qaApi.reply2Answer(this.reply2Answer).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "评论成功",
            type: "success",
          });
          this.initInfo();
          this.input = "";
        } else {
          this.$message({
            message: "评论失败",
            type: "error",
          });
        }
      });
    },
    zan1(id) {
      qaApi.zan1(id).then(res => {
        if (res.data.success) {
          this.initInfo()
        }  else {
          this.$message({
            type: 'error',
            message: "该评论不存在"
          })
        }
      })
    },
    zan2(id) {
      qaApi.zan2(id).then(res => {
        if (res.data.success) {
          this.initInfo()
        } else {
          this.$message({
            type: 'error',
            message: "该评论不存在"
          })
        }
      })
    },
    //获取登录用户信息
    getLoginUserInfo() {
      var userStr = cookie.get("guli_ucenter");
      //把字符串转换json对象
      if (userStr) {
        this.userInfo = JSON.parse(userStr);
        return true;
      } else {
        // 未登录提问（code:28000）处理
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
            return false;
          });
      }
    },
  },
};
</script>
<style lang="css" scoped>
.son-huifu {
  width: 90%;
  margin-top: 20px;
  display: flow-root;
  padding: 10px;
  background-color: #f5f5f5;
}
.son-input {
  margin-top: 10px;
}
.commit {
  float: right;
}
.son-huifu .touxiang {
  float: left;
}
.son-pinglun {
  float: left;
  width: 80%;
  margin-left: 10px;
}
.show-pinglun .touxiang {
  display: inline-block;
}
.show-huifu {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
  width: 85%;
}
.show-huifu span:nth-child(1) {
  color: #3580de;
}
.show-pinglun {
  padding: 20px;
  margin-left: 15%;
  width: 55%;
  margin-top: 20px;
  border: 1px solid #f0f0f0;
  background-color: #fff;
}
.show-title {
  width: 58%;
  margin-left: 15%;
  font-size: 20px;
  line-height: 40px;
  text-align: left;
  border-bottom: 2px solid #e4e1e1;
}
.shijian1 {
  float: right;
}
.dianzan1 {
  margin-top: 10px;
}
.dianzan1 span {
  font-size: 16px;
}
.dianzan1 img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.dianzan1 .time {
  position: absolute;
  font-size: 14px;
  color: #8c8c8c;
  right: 10%;
  bottom: 1%;
}
.dianzan {
  float: right;
  margin-top: 10px;
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
.list1 {
  position: relative;
  width: 100%;
  height: 130px;
  /* border-bottom: 1px solid #bfbfbf; */
  padding: 30px 20px;
}
.people {
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.touxiang {
  width: 60px;
  height: 60px;
  border-radius: 50%;

  vertical-align: top;
}
.touxiang img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.username {
  color: #bfbfbf;
}
.question {
  display: inline-block;
  width: 70%;
  margin-left: 30px;
}
.wenti {
  vertical-align: top;
}
.huida {
  width: 100%;
  text-align: left;
  margin-left: 7px;
  margin-top: 10px;
}
.shijian {
  font-size: 16px;
  color: #bfbfbf;
  margin-top: 10px;
  float: left;
}
.huida img {
  width: 20px;
  height: 20px;
}
.huida span {
  display: inline-block;
  color: #bfbfbf;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wenti img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.wenti a {
  display: inline-block;
  font-size: 20px;
  vertical-align: middle;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wenda {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 30%;
  right: 15%;
  font-size: 16px;
}
.view {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 30%;
  right: 5%;
  font-size: 16px;
}
.nav {
  width: 50%;
  margin-left: 10%;
  display: inline-block;
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
</style>
