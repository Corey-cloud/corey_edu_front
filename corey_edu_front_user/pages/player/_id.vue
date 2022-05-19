<template class="bg">
  <div class="bg">
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
    <!-- 公共底引入 -->
    <footer class="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="/" title="科里学院" target="_blank">科里学院</a>
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
                <span>©2021课程版权均归科里学院所有 京ICP备17055252号</span>
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
  </div>
</template>

<script>
import vod from '@/api/vod'

export default {
    layout: 'video',//应用video布局
    asyncData({ params, error }) {
       return vod.getPlayAuth(params.id).then(response => {
          return {
              playAuth: response.data.data.playAuth,
              vid: params.id
          }
        })
    },
    mounted() { //页面渲染之后  created
    // console.log('playAuth:',this.playAuth)
    // console.log('vid:',this.vid)
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.vid, // 视频id
            playauth: this.playAuth, // 播放凭证
            encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '720px',
            // 以下可选设置
            // cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
            // qualitySort: 'asc', // 清晰度排序

            // mediaType: 'video', // 返回音频还是视频
            autoplay: true, // 自动播放
            // isLive: false, // 直播
            // rePlay: false, // 循环播放
            // preload: true,
            // controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
            // useH5Prism: true, // 播放器类型：html5
        }, function(player) {
            console.log('播放器创建成功')
        })
    }

}
</script>

<style>
  
  .footer {
    background-color: #323232;
    border-top-style: none;
    color: #999;
    width: 100%;
    overflow: hidden;
    padding-top: 30px;
  }
</style>