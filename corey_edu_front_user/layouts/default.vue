<template>
  <div class="in-wrap">
    <no-ssr>
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="Corey在线教育">
            <img src="~/assets/img/logo.png" width="100%" alt="Corey在线教育" />
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
                    alt />
                  <span class="" id="userName">{{ loginInfo.nickname }}</span>
                </a>
                <a
                  href="javascript:void(0)"
                  title="退出"
                  @click="logout()"
                  class="ml5" style="color: red;">退出</a>
              </li>
            </div>

            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="搜索..."
                  name="queryCourse.courseName"
                  value/>
                <a type="submit" href="/course" class="s-btn">
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
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.baidu.com/" title="百度" target="_blank">Corey在线教育</a>
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
                <span>©2021课程版权均归Corey在线教育所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
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
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import login from '@/api/login'
export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },

  created() {
    this.token = this.$route.query.token
      if (this.token) {
      this.wxLogin()
    }
    this.showInfo()
    
  },

  methods: {
    showInfo() {
      //debugger
      var jsonStr = cookie.get("guli_ucenter");
      //console.log("guli_ucenter：", jsonStr)
      if (jsonStr) {
        this.loginInfo =JSON.parse(jsonStr)
      }
    },

    wxLogin() {
      if (this.token == '') return
      cookie.set('guli_token', this.token, {domain: 'localhost'})
      cookie.set('guli_ucenter', '', {domain: 'localhost'})
      login.getLoginUserInfo().then(response => {
        this.loginInfo = response.data.data.userInfo
        //获取返回用户信息，放到cookie里面
        cookie.set('guli_ucenter',this.loginInfo,{domain: 'localhost'})
      })
    },

    logout() {
     cookie.set("guli_ucenter", "")
     cookie.set("guli_token", "")

     //跳转页面
     window.location.href = "/"
    }
  }
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
</style>

