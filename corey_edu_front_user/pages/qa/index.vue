<template>
  <div>
    <div class="nav">
      <div style="flex: 1" class="btn-panel">
        <ul class="clearfix">
          <li
            v-for="(item, idx) of btnDataList"
            :key="idx"
            :class="{ listyle: idx === currentIdx }"
            @click="handleLiClick(item, idx)"
          >
            <span class="dataNav">{{ item.name }}</span>
            <br />
          </li>
        </ul>
      </div>
      <div class="list1" v-for="(data, idx) in dataList.items" :key="idx">
        <div class="people">
          <div class="touxiang">
            <img :src="data.memberAvatar" alt="" />
          </div>
          <div class="username">{{ data.memberNickname }}</div>
        </div>
        <div class="question">
          <div class="wenti">
            <img src="~/assets/img/wenti.png" alt="" />
            <a :href="'/qa/' + data.id">{{ data.questionTitle }}</a>
          </div>
          <div class="huida">
            <img src="~/assets/img/pinglun.png" alt="" />
            <span>{{ data.questionDetails }}</span>
          </div>
          <div class="tag-group">
            <!-- <span class="tag-group__title">Dark</span> -->
            <el-tag
              style="margin-left: 5px"
              size="small"
              v-for="item in items[idx]"
              :key="item"
              type="info"
            >
              {{ item }}
            </el-tag>
          </div>
          <div class="shijian" style="color: #8B8B8B; font-size: 14px;">{{ data.gmtCreate }}</div>
        </div>
        <div style="text-align: center" class="wenda">
          <div class="wenda-word">回答数</div>
          <div class="wenda-num" style="color: #6B6B6B">{{ data.qaComments }}</div>
        </div>
        <div style="text-align: center" class="view">
          <div class="huida-word">浏览数</div>
          <div class="huida-num" style="color: #6B6B6B">{{ data.qaView }}</div>
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
            @click.prevent="getQtList(1)"
            >首</a
          >
          <a
            :class="{ undisable: !dataList.hasPrevious }"
            href="#"
            title="前一页"
            @click.prevent="getQtList(dataList.current - 1)"
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
            @click.prevent="getQtList(page)"
            >{{ page }}</a
          >
          <a
            :class="{ undisable: !dataList.hasNext }"
            href="#"
            title="后一页"
            @click.prevent="getQtList(dataList.current + 1)"
            >&gt;</a
          >
          <a
            :class="{ undisable: !dataList.hasNext }"
            href="#"
            title="末页"
            @click.prevent="getQtList(dataList.pages)"
            >末</a
          >
          <div class="clear" />
        </div>
      </div>
      <!-- 公共分页 结束 -->
    </div>

    <div class="right">
      <div class="tiwen" @click="isShow = !isShow">我要提问</div>
      <div class="lizi">
        <ul>
          <li v-for="(data, idx) in states" :key="idx">{{ data.typeName }}</li>
        </ul>
      </div>
      <div class="hot">
        <div class="hot-title">热门问答推荐</div>
        <ul>
          <li class="hot-list" v-for="(data, idx) in hotList" :key="idx">
            <img src="~/assets/img/wenti.png" alt="" /><a
              class="hot-title-a"
              :href="'/qa/' + data.id"
              >{{ data.questionTitle }}</a
            >
            <div class="hot-huida">
              <span>回答数</span>
              <br />
              <span style="color: #8B8B8B">{{ data.qaComments }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog
      class="prop"
      title="提问"
      :visible.sync="isShow"
      width="40%"
      :before-close="handleClose"
    >
      <span>问题标题: </span
      ><el-input
        v-model="title"
        placeholder="请输入问题标题"
        style="width: 200px"
      ></el-input>
      <br />
      <span style="margin: 20px 0">问题类型: </span>
      <el-select
        v-model="value"
        multiple
        style="margin: 20px 0"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
      ><br />
      <span>问题详情: </span
      ><el-input
        type="textarea"
        v-model="quseall"
        placeholder="请输入问题详情"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="commitQuestion">确 定</el-button>
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
      items: [],
      btnDataList: [
        { name: "综合" },
        { name: "最新" },
        { name: "热门" },
        { name: "等待回答" },
      ],
      currentIdx: 0,
      title: "",
      options: [],
      loading: false,
      type: "",
      quseall: "",
      value: [], //问题类型集合
      list: [],
      isShow: false,
      states: [],
      question: {
        memberId: "",
        memberNickname: "",
        memberAvatar: "",
        questionTitle: "",
        qtIds: "",
        questionDetails: "", //问题详情
      },
      userInfo: {},
      pageNo: 1,
      pageSize: 6,
      queryObj: {},
      dataList: {},
      hotList: [],
      tagList: [],
    };
  },
  mounted() {
    this.initType();
  },
  methods: {
    //加载问答类型列表
    initType() {
      qaApi.getTypes().then((res) => {
        if ((res.data.code = 20000)) {
          for (let i = 0; i < res.data.data.qTypeVoList.length; i++) {
            this.states.push(res.data.data.qTypeVoList[i]);
          }
          this.list = this.states.map((item) => {
            return { value: `${item.id}`, label: `${item.typeName}` };
          });
        }
      });
      this.getQtList(1);
      this.getHotList();
    },
    getHotList() {
      this.queryObj = {
        qt: `2`,
      };
      qaApi.getQuestionList(1, 4, this.queryObj).then((res) => {
        this.hotList = res.data.data.items;
      });
    },
    getQtList(pageNo, idx) {
      this.queryObj = {
        qt: `${idx}`,
      };
      qaApi
        .getQuestionList(pageNo, this.pageSize, this.queryObj)
        .then((res) => {
          this.dataList = res.data.data;
          this.rawList = res.data.data.items;
          this.items = new Array(this.rawList.length);
          for (let i = 0; i < this.rawList.length; i++) {
            this.items[i] = this.rawList[i].qtIds.split(",");
          }

          for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].length; j++) {
              for (let k = 0; k < this.list.length; k++) {
                if (this.items[i][j] === this.list[k].value) {
                  this.items[i][j] = this.list[k].label;
                  console.log(i,this.items[i]);
                  break;
                }
              }
            }
          }
        });
    },
    //动态获取类型
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleLiClick(item, idx) {
      if (this.currentIdx != idx) {
        this.currentIdx = idx;
      }
      this.getQtList(1, idx);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //提交问题
    commitQuestion() {
      this.isShow = false;
      if (!this.getLoginUserInfo()) {
        return;
      }
      this.question = {
        memberId: this.userInfo.id,
        memberNickname: this.userInfo.nickname,
        memberAvatar: this.userInfo.avatar,
        questionTitle: this.title,
        qtIds: this.value.join(","),
        questionDetails: this.quseall,
        status: 1,
        enable: 1
      };

      qaApi.publishQ(this.question).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "发布成功，等待审批",
            type: "success",
          });
        } else {
          this.$message({
            message: "发布失败",
            type: "error",
          });
        }
      });
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
.hot {
  width: 300px;
  margin-top: 20px;
}
.hot-huida {
  text-align: center;
  width: 60px;
  font-size: 14px;
  float: right;
  height: 10px;
  height: 100%;
}
.hot-huida span:nth-child(1) {
  color: black;
}
.hot-list {
  width: 100%;
  height: 50px;
  font-size: 20px;
  position: relative;
  padding-bottom: 20px;
  border-bottom: 1px solid #bfbfbf;
}
.hot-list img {
  transform: translateY(-80%);
}
.hot-list a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 70px;
  width: 200px;
}
.hot-title {
  font-size: 30px;
  line-height: 50px;
  color: #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
}
.lizi {
  width: 250px;
}
.lizi ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.lizi li {
  padding: 5px 10px;
  background-color: #eae7e4;
  color: #4e4e4e;
  font-size: 16px;
  margin: 5px;
}
.right {
  margin-top: 30px;
  display: inline-block;
  margin-left: 150px;
}
.tiwen {
  width: 300px;
  height: 60px;
  font-size: 30px;
  background-color: #264863;
  cursor: pointer;
  text-align: center;
  color: white;
  line-height: 60px;
}
.listyle {
  background-color: #4487f7 !important;
  color: white !important;
}
.btn-panel {
  display: inline-block;
  position: relative;
  height: 100%;
  padding-left: 0.75rem;
}
.btn-panel ul {
  float: left;
}
.btn-panel ul li {
  text-align: center;
  cursor: pointer;
  float: left;
  height: 100%;
  margin-right: 2rem;
  line-height: 1.69rem;
  color: #262a30;
  font-size: 16px;
  position: relative;
  border: none;
  padding: 5px 20px;
  border-radius: 3px;
  background-color: RGB(240, 244, 247);
}
.top-list {
  width: 100%;
  font-size: 24px;
}
.wenda {
  vertical-align: middle;
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
  vertical-align: top;
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
.hot-title-a {
  margin-bottom: -10px;
  font-size: 16px;
  display: inline-block;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav {
  width: 50%;
  margin-left: 10%;
  display: inline-block;
}
.list1 {
  position: relative;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #bfbfbf;
  padding: 20px 20px;
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
}
.touxiang img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.username {
  color: #bfbfbf;
}

</style>
