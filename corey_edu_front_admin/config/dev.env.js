'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"http://8.130.98.98:8222"',
  OSS_API: '"https://corey-edu.oss-cn-shenzhen.aliyuncs.com"'
})
