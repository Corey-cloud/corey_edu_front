// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueQriously from 'vue-qriously'
import App from './App'
import router from './router'
// element-ui
// import '../assets/blue_theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// momemt
import moment from 'vue-moment'
// v-region
import vRegion from 'v-region'
// Axios
import axios from 'axios'
// vue-qriously

import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用


Vue.use(ElementUI)
Vue.use(moment)
Vue.prototype.$Moment = moment
Vue.use(vRegion)

Vue.use(axios)
Vue.config.productionTip = false
Vue.use(VueQriously)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, VueQriously },
  template: '<App/>'
})
