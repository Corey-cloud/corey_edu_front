<template>
  <div class="in-wrap">
    <no-ssr>
      <!-- 公共头引入 -->
      <header class="top" id="header">
        <section class="container">
          <h1 id="logo">
            <a href="/" title="科里学院">
              <img src="~/assets/img/logo.png" width="100%" alt="科里学院" />
            </a>
          </h1>
          <div class="h-r-nsl">
            <ul class="nav">
              <router-link to="/" tag="li" active-class="current" exact>
                <a>首页</a>
              </router-link>
              <router-link to="/course" tag="li" active-class="current">
                <a>课程</a>
              </router-link>
              <router-link to="/teacher" tag="li" active-class="current">
                <a>名师</a>
              </router-link>
              <router-link to="/article" tag="li" active-class="current">
                <a>文章</a>
              </router-link>
              <router-link to="/qa" tag="li" active-class="current">
                <a>问答</a>
              </router-link>
            </ul>
            <!-- / nav -->
            <ul class="h-r-login">
              <div v-if="!loginInfo.id">
                <li id="no-login">
                  <a href="/login" title="登录">
                    <em class="icon18 login-icon">&nbsp;</em>
                    <span class="vam ml5">登录</span>
                  </a>
                  <span>|</span>
                  <a href="/register" title="注册">
                    <span class="vam ml5">注册</span>
                  </a>
                </li>
              </div>
              <div v-else>
                <li class="mr10 undis" id="is-login-one">
                  <a href="#" title="消息" id="headerMsgCountId">
                    <em class="icon18 news-icon">&nbsp;</em>
                  </a>
                  <q class="red-point" style="display: none">&nbsp;</q>
                </li>
                <li class="h-r-user" id="is-login-two">
                  <a href="#" title>
                    <img
                      :src="loginInfo.avatar"
                      width="30"
                      height="30"
                      class="vam picImg"
                      alt
                    />
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{ loginInfo.nickname
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit"
                          >修改个人信息</el-dropdown-item
                        >
                        <el-dropdown-item command="collect"
                          >我的收藏</el-dropdown-item
                        >
                        <el-dropdown-item command="order"
                          >我的订单</el-dropdown-item
                        >
                        <el-dropdown-item command="updatePasswd"
                          >修改密码</el-dropdown-item
                        >
                        <el-dropdown-item command="exit" style="color: red"
                          >退出</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </a>
                  <!-- <a
                  href="javascript:void(0)"
                  title="退出"
                  @click="logout()"
                  class="ml5" style="color: red;">退出</a> -->
                </li>
              </div>

              <!-- /未登录显示第1 li；登录后显示第2，3 li -->
            </ul>
            <aside class="h-r-search">
              <form action="#" method="post">
                <label class="h-r-s-box">
                  <el-input
                    type="text"
                    placeholder="搜索..."
                    v-model="searchStr"
                    @change="handleEnter"
                  />
                  <a
                    type="submit"
                    :href="'/search/' + searchStr"
                    target="_blank"
                    class="s-btn"
                  >
                    <em class="icon18">&nbsp;</em>
                  </a>
                </label>
              </form>
            </aside>
          </div>
          <aside class="mw-nav-btn">
            <div class="mw-nav-icon"></div>
          </aside>
          <div class="clear"></div>
        </section>
      </header>
      <!-- /公共头引入 -->
      <nuxt />
      <!-- 公共底引入 -->
      <footer style="position: relative; bottom: 0" id="footer">
        <section class="container">
          <div>
            <h4 class="hLh30">
              <span class="fsize18 f-fM c-999">友情链接</span>
            </h4>
            <ul class="of flink-list">
              <li>
                <a href="/" title="科里学院" target="_blank">科里学院</a>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="b-foot">
            <section class="fl col-7">
              <section class="mr20">
                <section class="b-f-link">
                  <a href="#" title="关于我们" target="_blank">关于我们</a>|
                  <a href="#" title="联系我们" target="_blank">联系我们</a>|
                  <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                  <a href="#" title="资源下载" target="_blank">资源下载</a>|
                  <span>服务热线：13025826627</span>
                  <span>Email：1577067415@qq.com</span>
                </section>
                <section class="b-f-link mt10">
                  <span>©2021课程版权均归科里学院所有 京ICP备17055252号</span>
                </section>
              </section>
            </section>
            <aside class="fl col-3 tac mt15">
              <section class="gf-tx">
                <span>
                  <el-popover
                    placement="top"
                    width="200"
                    trigger="hover"
                  >
                    <img src="~/assets/img/wx.jpg" width="250" height="250" alt="">
                    <el-button type="text" slot="reference"> <img src="~/assets/img/wx-icon.png" alt /></el-button>
                  </el-popover>
                </span>
              </section>
              <section class="gf-tx">
                <span>
                  <a href="https://weibo.com/u/6686946488"><img src="~/assets/img/wb-icon.png" alt /></a>
                </span>
              </section>
            </aside>
            <div class="clear"></div>
          </div>
        </section>
      </footer>
      <!-- /公共底引入 -->
    </no-ssr>
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";
import "~/assets/css/activity_tab.css";
import "~/assets/css/bottom_rec.css";
import "~/assets/css/nice_select.css";
import "~/assets/css/order.css";
import "~/assets/css/swiper-3.3.1.min.css";
import "~/assets/css/pages-weixinpay.css";

import cookie from "js-cookie";

export default {
  data() {
    return {
      searchStr: "",
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
    };
  },

  created() {
    this.showInfo();
  },

  mounted() {
    setTimeout(() => {
      this.showInfo();
    }, 3000);
  },

  methods: {
    handleEnter() {
      const routerJ = this.$router.resolve({
        path: "/search/" + this.searchStr,
      });
      window.open(routerJ.href, "_blank");
    },

    showInfo() {
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr);
      } else {
        this.loginInfo = {};
      }
    },

    handleCommand(command) {
      if (cookie.get("guli_ucenter") == "") {
        this.loginInfo = {};
        return;
      }
      switch (command) {
        case "edit":
          let routerJu = this.$router.resolve({
            path: "/user/" + this.loginInfo.id,
          });
          window.open(routerJu.href, "_blank");
          break;
        case "collect":
          let routerJum = this.$router.resolve({
            path: "/course/mycollection/" + this.loginInfo.id,
          });
          window.open(routerJum.href, "_blank");
          break;
        case "order":
          let routerJump = this.$router.resolve({
            path: "/order/myorder/" + this.loginInfo.id,
          });
          window.open(routerJump.href, "_blank");
          break;
        case "updatePasswd":
          let routerJump2 = this.$router.resolve({
            path: "/user/updatePasswd/" + this.loginInfo.id,
          });
          window.open(routerJump2.href, "_blank");
          break;
        case "exit":
          this.logout();
          break;
      }
    },

    logout() {
      cookie.set("guli_ucenter", "");
      cookie.set("guli_token", "");

      //跳转页面
      // window.location.href = "/";
      this.$router.go(0)
    },
  },
};
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
/* .top {
  background-image: url(../pages/assets/img/banner_bg.png);
  color: #fff;
} */
</style>

