<template>
  <el-card :body-style="{ padding: '0px' }" :title="card.title">
    <a target="_blank" :href="'/course/'+card.id">
    <img :src="card.cover" class="card-img" />
    </a>
    <div style="padding-left: 8px; padding-right: 5px">
      <p class="card-name line-limit-length">{{ card.title }}</p>
      <div class="bottom clearfix">
        <section class="hLh2 f of">
          <span class="fr jgTag bg-green" v-if="Number(card.price) === 0">
            <i class="c-fff">免费</i>
          </span>
          <span class="fl jgAttr c-ccc">
            <i class="c-999">
              <span v-if="Number(card.viewCount) >= 100000000">
                {{(card.viewCount/100000000).toFixed(1)}}亿播放
              </span>
              <span v-else-if="Number(card.viewCount) >= 10000">
                {{(card.viewCount/10000).toFixed(1)}}万播放
              </span>
              <span v-else>
                {{card.viewCount}}播放
              </span>
            </i>
            |
            <i class="c-999">
              <span v-if="Number(card.commentCount) >= 100000000">
                {{(card.commentCount/100000000).toFixed(1)}}亿评论
              </span>
              <span v-else-if="Number(card.commentCount) >= 10000">
                {{(card.commentCount/10000).toFixed(1)}}万评论
              </span>
              <span v-else>
                {{card.commentCount}}评论
              </span>
            </i>
          </span>
        </section>
        <!-- <p class="card-type line-limit-length">{{ card.type }}</p> -->
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Card",
  props: ["card"]
};
</script>

<style scoped>
.el-card {
  width: 280px;
  cursor: pointer;
}
.card-img {
  height: auto;
  width: 100%;
}
.card-name {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.87);
  text-align: left;
}
.card-type {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34);
  text-align: left;
}
.line-limit-length {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px;
}
.f {
  font-size: 13px;
}
</style>
