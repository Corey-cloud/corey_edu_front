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
            <span class="dataNav">{{ item.name }}</span
            ><br />
          </li>
        </ul>
      </div>
      <div class="list1" v-for="(data, idx) in dataList.records" :key="idx">
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
          <div class="shijian">{{ data.gmtCreate }}</div>
        </div>
        <div class="wenda">
          <div class="wenda-num">{{ data.qaComments }}</div>
          <div class="wenda-word">回答数</div>
        </div>
        <div class="view">
          <div class="huida-num">{{ data.qaView }}</div>
          <div class="huida-word">浏览数</div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="tiwen" @click="isShow = !isShow">我要提问</div>
      <div class="lizi">
        <ul>
          <li>全部</li>
          <li v-for="(data, idx) in states" :key="idx">{{ data.typeName }}</li>
        </ul>
      </div>
      <div class="hot">
        <div class="hot-title">热门问答推荐</div>
        <ul>
          <li
            class="hot-list"
            v-for="(data, idx) in hotList.records"
            :key="idx"
          >
            <img src="~/assets/img/wenti.png" alt="" /><a
              class="hot-title-a"
              :href="'/qa/' + data.id"
              >{{ data.questionTitle }}</a
            >
            <div class="hot-huida">
              <span>{{ data.qaComments }}</span
              ><br />
              <span>回答数</span>
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
          >末页</a
        >

        <div class="clear" />
      </div>
    </div>
    <!-- 公共分页 结束 -->
  </div>
</template>
<script>
import qaApi from "@/api/qa";
import cookie from "js-cookie";
export default {
  data() {
    return {
      btnDataList: [{ name: "最新" }, { name: "热门" }, { name: "等待回答" }],
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
      pageSize: 3,
      queryObj: {},
      dataList: [],
      hotList: [],
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
          for (let i = 0; i < res.data.data.length; i++) {
            this.states.push(res.data.data[i]);
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
        this.hotList = res.data.data;
      });
    },
    getQtList(pageNo, idx) {
      if (!idx) {
        this.queryObj = {
          qt: "",
        };
      } else {
        this.queryObj = {
          qt: `${idx + 1}`,
        };
      }
      qaApi
        .getQuestionList(pageNo, this.pageSize, this.queryObj)
        .then((res) => {
          this.dataList = res.data.data;
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
      this.getLoginUserInfo();
      this.question = {
        memberId: this.userInfo.id,
        memberNickname: this.userInfo.nickname,
        memberAvatar: this.userInfo.avatar,
        questionTitle: this.title,
        qtIds: this.value.join(","),
        questionDetails: this.quseall,
      };

      qaApi.publishQ(this.question).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "发布成功，等待审批!",
            type: "success",
          });
        } else {
          this.$message({
            message: "发布失败!",
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
      } else {
        this.$notify({
          title: "登录提示！",
          message: "请登录后发表帖子",
          duration: 0,
        });
        return;
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
  width: 50px;
  font-size: 16px;
  float: right;
  height: 30px;
  padding: 5px;
  height: 100%;
}
.hot-huida span:nth-child(1) {
  color: #ff5f16;
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
  margin-top: 10px;
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
  height: 130px;
  border-bottom: 1px solid #bfbfbf;
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
