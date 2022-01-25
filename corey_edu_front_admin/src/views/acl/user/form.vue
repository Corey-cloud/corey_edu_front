<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" style="width:350px"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="user.nickName" style="width:350px"/>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="user.pass" style="width:350px">
<<<<<<< HEAD
          <!-- <i slot="suffix" class="el-icon-view" @click="showPwd"></i> -->
=======
>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" style="width:350px">
<<<<<<< HEAD
          <!-- <i slot="suffix" class="el-icon-view" @click="showPwd"></i> -->
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button :disabled="saveBtnDisabled" @click="resetForm">清空</el-button>
=======
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled"  type="primary" @click="saveOrUpdate">保存</el-button>
        <!-- <el-button :disabled="saveBtnDisabled" @click="resetForm">清空</el-button> -->
>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/acl/user'
<<<<<<< HEAD
import Base64 from 'js-base64/Base64'
=======
import { JSEncrypt } from 'jsencrypt'

const Encrypt = new JSEncrypt();

>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value.length < 5 || value.length > 10) {
        return callback(new Error('用户名不得小于5个或大于10个字符!'))
      }
    }

    var validateNickname = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        return callback(new Error('昵称不得小于2个或大于10个字符!'))
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
      else {
        callback()
      }
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
<<<<<<< HEAD
        checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }]
      }
=======
        checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }],
      },
      publicKey: '' // 加密公钥
>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
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
        this.user = response.data.data
      })
    },

    saveOrUpdate() {
      // this.$refs.user.validate(valid => {
<<<<<<< HEAD
        // if (valid) {
        //   this.saveBtnDisabled = true // 防止表单重复提交
        //   if (!this.user.id) {
        //     this.saveData()
        //   } else {
        //     this.updateData()
        //   }
        // } else {
        //   console.log('校验不通过')
        // }
      // })
      this.saveBtnDisabled = true
      if (!this.user.id) {
        this.saveData()
      } else {
        this.updateData()
=======
      //   if (valid) {
      //     this.saveBtnDisabled = true // 防止表单重复提交
      //     if (!this.user.id) {
      //       this.saveData()
      //     } else {
      //       this.updateData()
      //     }
      //   } else {
      //     console.log("校验不通过")
      //   }
      // })
      
      if (this.user.username.length >= 5 && this.user.username.length <= 10 && this.user.nickName.length >= 2 && this.user.nickName.length <= 10 && this.user.pass.length >= 6 && this.user.checkPass === this.user.pass) {
        this.saveBtnDisabled = true // 防止表单重复提交
        userApi.getPublicKey().then(response => {
          if (response.success) {
            this.publicKey = response.data.publicKey
            console.log('公钥', this.publicKey)
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
>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
      }
    },

    // 新增讲师
    saveData() {
<<<<<<< HEAD
      var user = this.user
      console.log(user)
      userApi.save(this.user).then(response => {
        // debugger
=======
      let user = { ...this.user }
      user.username = Encrypt.encrypt(this.user.username.trim())
      user.pass = Encrypt.encrypt(this.user.pass.trim())
      user.checkPass = Encrypt.encrypt(this.user.checkPass.trim())
      console.log(user.username)
      console.log(user.pass)
      console.log(user.checkPass)
      userApi.save(user).then(response => {
>>>>>>> 268ce8986c587a4e042657081146ed1ae9ecc4d2
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
      // user数据的获取
      userApi.updateById(this.user).then(response => {
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
