<script>
// @ is an alias to /src
import HelloWorld from './components/HelloWorld.vue'
import NavHead from './components/NavHead.vue'
import Carousel from './components/Carousel.vue'
import NavBar from './components/NavBar.vue'
import UpdateTable from './components/UpdateTable.vue'
import FooterBar from './components/FooterBar.vue'
import Recommond from './components/Recommond.vue'
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
          this.teacherList = response.data.data.teacherList
          console.log( this.recommondItems, this.teacherList)
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
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '9恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '10恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '11恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '12恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '13恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '14恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '15恋爱，搞笑，校园，日常' },
        // { title: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', cover: require('./assets/img/card.png'), type: '16恋爱，搞笑，校园，日常' }

      ],
      rankinglist: [
        { id: 1, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: false },
        { id: 2, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 3, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 4, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 5, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 6, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 7, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 8, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 9, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true },
        { id: 10, name: 'html page cover', createTime: '2019-11-08', author: '秋天书店', type: '冒险，奇幻', img: require('./assets/img/html_cover.png'), showWord: true }
      ],
      updateItems: [
        { updateDate: '今天',
          isShow: true,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '昨天',
          isShow: false,
          updateCards: [
            { name: '辉夜大小姐想让我告白 ~天才们的恋爱头脑战~', img: require('./assets/img/card.png'), type: '恋爱，搞笑，校园，日常' }
          ]
        },
        { updateDate: '周三',
          isShow: false,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周二',
          isShow: false,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周一',
          isShow: false,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周日',
          isShow: false,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
          ]
        },
        { updateDate: '周六',
          isShow: false,
          updateCards: [
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' },
            { name: '抱歉，我要毁灭一下这个地球', img: require('./assets/img/card2.png'), type: '奇幻，校园，智斗' }
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
            <!-- 漫画推荐 -->
            <recommond :recommondItems="recommondItems"
                       :rankinglist="rankinglist"></recommond>
            <!-- 更新表 -->
            <update-table :updateItems="updateItems"></update-table>
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
