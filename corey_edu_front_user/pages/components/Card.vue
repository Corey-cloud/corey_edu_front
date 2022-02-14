<template>
  <el-card :body-style="{ padding: '0px' }" :title="card.title">
    <img :src="card.cover" class="card-img" />
    <div style="padding-left: 8px; padding-right: 5px">
      <p class="card-name line-limit-length">{{ card.title }}</p>
      <div class="bottom clearfix">
        <p class="card-type line-limit-length">{{ card.type }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Card",
  props: ["card"],
  mounted(){
    console.log("------>",this.card)
  }
};
</script>



<style scoped>
.el-card {
  height: 195px;
  width: 280px;
  cursor: pointer;
}
.card-img {
  height: auto;
  width: 100%;
}
.card-name {
  font-size: 14px;
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
</style>
