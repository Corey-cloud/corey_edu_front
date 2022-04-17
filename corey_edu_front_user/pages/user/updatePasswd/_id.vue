<template>
  <div style="margin-top: 100px" class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="100px">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="user.pass" style="width:350px">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" style="width:350px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled"  type="primary" @click="updatePasswd">确认修改</el-button>
        <el-button @click="back">返回</el-button>
        <!-- <el-button :disabled="saveBtnDisabled" @click="resetForm">清空</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/user'
import cookie from "js-cookie"

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位!'))
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.user.validateField('checkPass');
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位!'))
      }
      if (value !== this.user.pass) {
        callback(new Error('两次输入密码不一致!'))
      }
      callback()
    }
    return {
      memberId: '',
      user: {
        id: '',
        pass: '',
        checkPass: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        pass: [{ required: true, trigger: 'blur', validator: validatePass }],
        checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }],
      }
    }
  },

  asyncData({ params, error }) {
    console.log("params.id:",params.id)
    if (params != null) {
      return {
        memberId: params.id
      }
    }
  },

  created() {
    this.user.id = this.memberId
    console.log("user.id", this.user.id)
  },

  methods: {
    // 确认修改
    updatePasswd() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          this.updateData()
        } else {
          this.$message({
            type: 'error',
            message: '表单校验不通过，请检查！'
          })
        }
      })
    },
    back() {
      console.log("返回")
      this.$router.push({ path: '/' })
    },

    // 调用api修改密码
    updateData() {
      const user = { ...this.user }
      userApi.updatePasswd(user).then(response => {
        if (response.data.success) {
          this.$message({
            type: 'success',
            message: '密码修改成功，请重新登录'
          })
          cookie.set("guli_ucenter", "");
          cookie.set("guli_token", "");
          this.$router.push({ path: '/' })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '密码修改失败，请重试'
        })
        this.saveBtnDisabled = false
      })
    },
  }
}
</script>
