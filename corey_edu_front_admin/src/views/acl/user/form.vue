<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" style="width:350px"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="user.nickName" style="width:350px"/>
      </el-form-item>
      <el-form-item v-if="!user.id" label="密码" prop="pass">
        <el-input type="password" v-model="user.pass" style="width:350px">
        </el-input>
      </el-form-item>
      <el-form-item v-if="!user.id" label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" style="width:350px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled"  type="primary" @click="saveOrUpdate">保存</el-button>
        <!-- <el-button :disabled="saveBtnDisabled" @click="resetForm">清空</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/acl/user'
import { JSEncrypt } from 'jsencrypt'

const Encrypt = new JSEncrypt();

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value.length < 5 || value.length > 10) {
        callback(new Error('用户名不得小于5个或大于10个字符!'))
      } else {
        callback()
      }
    }

    var validateNickname = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('昵称不得小于2个或大于10个字符!'))
      } else {
        callback()
      }
    }

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
      user: {
        username: '',
        nickName: '',
        pass: '',
        checkPass: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        nickName: [{ required: true, trigger: 'blur', validator: validateNickname }],
        pass: [{ required: true, trigger: 'blur', validator: validatePass }],
        checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }],
      },
      publicKey: '' // 加密公钥
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 重置表单
    resetForm() {
      this.user = {
        username: '',
        nickName: '',
        pass: '',
        checkPass: ''
      }
    },

    // 表单初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        this.user = {
          username: '',
          nickName: '',
          pass: '',
          checkPass: ''
        }
      }
    },

    // 根据id查询记录
    fetchDataById(id) {
      userApi.getById(id).then(response => {
        this.user = response.data.userInfo
      })
    },

    // 添加或修改
    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          // 获取公钥
          userApi.getPublicKey().then(response => {
            if (response.success) {
              this.publicKey = response.data.publicKey
              // 拿到公钥后对用户名和密码进行加密
              Encrypt.setPublicKey(this.publicKey)
              if (!this.user.id) {
                this.saveData()
              } else {
                this.updateData()
              }
            } else {
              this.$message({
                type: 'error',
                message: '从服务器获取加密公钥失败！'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '表单校验不通过，请检查！'
          })
        }
      })
    },

    // 新增讲师
    saveData() {
      const user = { ...this.user }
      user.username = Encrypt.encrypt(this.user.username.trim())
      user.pass = Encrypt.encrypt(this.user.pass.trim())
      user.checkPass = Encrypt.encrypt(this.user.checkPass.trim())

      userApi.save(user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      }).catch(() => {
        this.saveBtnDisabled = false
      })
    },

    // 根据id更新记录
    updateData() {
      const user = { ...this.user }
      user.username = Encrypt.encrypt(this.user.username.trim())
      console.log('username:', user.username)
      userApi.updateById(user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      }).catch(() => {
        this.saveBtnDisabled = false
      })
    }
  }
}
</script>
