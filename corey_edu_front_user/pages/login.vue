<template>
  <div class="main" style="min-width: auto">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://8.130.98.98:8005/ucenter/wx/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

import cookie from "js-cookie";
import loginApi from "@/api/login";

export default {
  layout: "sign",

  data() {
    return {
      //封装登录手机号和密码对象
      user: {
        mobile: "",
        password: "",
      },
      //用户信息
      loginInfo: {},
      pathUrl: "",
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(to);
      console.log(from);
      vm.pathUrl = from.fullPath;
    });
  },

  methods: {
    //登录的方法
    submitLogin() {
      //第一步 调用接口进行登录，返回token字符串
      loginApi.submitLogin(this.user).then((response) => {
        if (response.data.code == 20000) {
          //第二步 获取token字符串放到cookie里面
          //第一个参数cookie名称，第二个参数值，第三个参数作用范围
          // cookie.set('guli_token',response.data.data.token,{domain: 'localhost'})
          cookie.set("guli_token", response.data.data.token);

          //第四步 调用接口 根据token获取用户信息，为了首页面显示
          loginApi.getLoginUserInfo().then((response) => {
            this.loginInfo = response.data.data.userInfo;
            //获取返回用户信息，放到cookie里面
            // cookie.set('guli_ucenter',this.loginInfo,{domain: 'localhost'})
            cookie.set("guli_ucenter", this.loginInfo);
            this.$message({
              type: "success",
              message: "登录成功",
            });
            //跳转页面,登录成功后路由原路跳转，除了注册路由至此
            console.log("this.pathUrl:", this.pathUrl);
            if (this.pathUrl == "/" || this.pathUrl == "/register") {
              this.$router.push({ path: "/" });
            } else {
              this.$router.go(-1);
              // window.location.href = "/";
            }
          });
        } else {
          this.$message({
            type: "error",
            message: response.data.message,
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
