<script>
// @ is an alias to /src
import HelloWorld from './component/HelloWorld.vue'
import NavHead from './component/NavHead.vue'
import Carousel from './component/Carousel.vue'
import NavBar from './component/NavBar.vue'
import UpdateTable from './component/UpdateTable.vue'
import FooterBar from './component/FooterBar.vue'
import Recommond from './component/Recommond.vue'
import banner from '@/api/banner'
import index from '@/api/index'
export default {
  name: 'index',
  components: {
    HelloWorld,
    Carousel,
    NavBar,
    UpdateTable,
    Recommond
  },
  created() {
    this.getBannerList()
    //调用查询热门课程和名师的方法
    this.getHotCourseTeacher()
  },

  methods: {
    //查询banner数据
    getBannerList() {
      banner.getList().then(response => {
        this.carousels = response.data.data.bannerList
      })
    },
    //查询热门课程和名师
    getHotCourseTeacher() {
      index.getList()
        .then(response => {
          this.recommondItems = response.data.data.courseList
          this.rankingList = response.data.data.rankingList
          this.teacherList = response.data.data.teacherList
          this.updateData = response.data.data.updateItems
          var flag = false
          for (let i = 0; i < this.updateData.length; i++) {
            this.updateItems[i].updateCards = this.updateData[i]

            if (this.updateData[i] != null && this.updateData[i].length > 0) {
              this.updateItems[i].updateDate = this.updateData[i][0].gmtCreate.substr(6,4)
              if (flag == false) {
                this.updateItems[i].isShow = true
                flag = true
              }
            } else {
              this.updateItems[i].updateDate = ""
            }
          }
        })
    },
  },

  data() {
    return {
      visible: false,
      user: null,
      teacherList: [],
      courseList: [],
      // 由后台传入cards不需要require，后期修改
      carousels: [
        // require('./assets/img/carousel1.png'),
        // require('./assets/img/carousel2.png'),
        // require('./assets/img/carousel3.png'),
        // require('./assets/img/carousel4.png')
      ],
      recommondItems: [
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '2恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '1恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '3恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '4恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '5恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '6恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '7恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '8恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '9恋爱，搞笑，校园，日常' }
      ],
      rankingList: [
        // { id: 1, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: false },
        // { id: 2, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 3, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 4, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 5, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 6, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 7, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 8, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 9, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        // { id: 10, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true }
      ],
      updateItems: [
        { updateDate: '今天',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), viewCount: 13123242, commentCount: 54653654 }
          ]
        },
        { updateDate: '昨天',
          isShow: false,
          updateCards: [
            { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '恋爱，搞笑，校园，日常' }
          ]
        },
        { updateDate: '前天',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周二',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周一',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周日',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周六',
          isShow: false,
          updateCards: [
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { title: '抱歉，我要毁灭一下这个地球', cover: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        }

      ]
    }
  }
}
</script>

<template>
  <el-container>
    <!-- header -->
    <el-header style="height:auto">
      <!-- <nav-head :user="user"></nav-head> -->
      <carousel :carousels="carousels"></carousel>
      <!-- <nav-bar></nav-bar> -->
    </el-header>
    <!-- main -->
    <el-main>
      <el-row class="common-content-row">
        <el-col>
          <div>
            <p></p>
          </div>
        </el-col>
        <el-col>
          <div class="common-content">
            <!-- 课程推荐 -->
            <recommond :recommondItems="recommondItems"
                       :rankinglist="rankingList"></recommond>
            <!-- 网校名师 开始 -->
            <div>
              <section class="container">
                <header class="comm-title">
                  <h2 class="tac">
                    <span class="c-333">名师大咖</span>
                  </h2>
                </header>
                <div>
                  <article class="i-teacher-list">
                    <ul class="of">
                      <li v-for="teacher in teacherList" :key="teacher.id">
                        <section class="i-teach-wrap">
                          <div class="i-teach-pic">
                            <a :href="'/teacher/' + teacher.id" :title="teacher.name">
                              <img :alt="teacher.name" :src="teacher.avatar">
                            </a>
                          </div>
                          <div class="mt10 hLh30 txtOf tac">
                            <a :href="'/teacher/' + teacher.id" :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                          </div>
                          <div class="hLh30 txtOf tac">
                            <span class="fsize14 c-999">{{teacher.career}}</span>
                          </div>
                          <div class="mt15 i-q-txt">
                            <p v-html="teacher.intro"
                              class="c-999 f-fA"
                            ></p>
                          </div>
                        </section>
                      </li>

                    </ul>
                    <div class="clear"></div>
                  </article>
                  <section class="tac pt20">
                    <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
                  </section>
                </div>
              </section>
            </div>
            <!-- /网校名师 结束 -->
            <!-- 更新表 -->
            <update-table :updateItems="updateItems" style="margin-top: 80px;"></update-table>
          </div>
        </el-col>
        <el-col>
          <div>
            <p></p>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <!-- footer -->
    <!-- <el-footer style="height:auto">
      <footer-bar></footer-bar>
    </el-footer> -->
  </el-container>

</template>

<style scoped>
@import "./assets/css/common.css";
</style>
