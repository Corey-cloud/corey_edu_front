module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '科里学院',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '科里学院' },
      { hid: 'description', name: 'description', content: '科里学院是国内领先的IT在线视频学习平台、职业教育平台。截止目前,科里学院线上、线下学习人次数以万计！会同上百个知名开发团队联合制定的Java、HTML5前端、大数据、Python等视频课程，被广大学习者及IT工程师誉为：业界最适合自学、代码量最大、案例最多、实战性最强、技术最前沿的IT系列视频课程！' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css' }
    ],
    script: [
      {src: 'https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js'},
    ],

  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui']
  },
  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
    '~plugins/element-ui.js'
  ],
  css: [
    'swiper/dist/css/swiper.css',
    'element-ui/lib/theme-chalk/index.css',
    './pages/assets/css/common.css'
  ],
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/pay/:id',
        name: 'pay',
        component: resolve(__dirname, 'pages/pay/_id.vue')
      })
    }
  },
}

