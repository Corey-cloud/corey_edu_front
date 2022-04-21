<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单详情</h1>
      <!-- <img src="~/assets/img/cart_setp2.png" class="fr"> -->
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
          <tr>
            <th class="name">商品</th>
            <th class="status">状态</th>
            <th class="price">原价</th>
            <th class="priceNew">价格</th>
          </tr>
        </tbody>
        <tbody>
          <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
          <tr>
            <td colspan="3" class="teacher">讲师：{{ order.teacherName }}</td>
          </tr>
          <tr class="good">
            <td class="name First">
              <a
                target="_blank"
                :href="'https://localhost:3000/course/' + order.courseId"
              >
                <img :src="order.courseCover"
              /></a>
              <div class="goodInfo">
                <input type="hidden" class="ids ids_14502" value="14502" />
                <a
                  target="_blank"
                  :href="'https://localhost:3000/course/' + order.courseId"
                  >{{ order.courseTitle }}</a
                >
              </div>
            </td>
            <td>
              <span style="color: #00aa00" v-if="order.status === 1">
                <b>已支付</b>
              </span>
              <span style="color: #808080" v-else-if="order.status === 2">
                <b>已关闭</b>
              </span>
              <span style="color: #808080" v-else>
                <b>已取消</b>
              </span>
            </td>
            <td class="price">
              <p>
                ￥<strong>{{ (order.totalFee / 0.8).toFixed(2) }}</strong>
              </p>
              <span class="discName red">限时8折</span>
            </td>
            <td class="red priceNew Last">
              ￥<strong>{{ order.totalFee.toFixed(2) }}</strong>
            </td>
          </tr>
          <tr>
            <td class="Billing tr" colspan="3">
              <div class="tr">
                <p>
                  共 <strong class="red">1</strong> 件商品，合计<span
                    class="red f20"
                    >￥<strong>{{ order.totalFee.toFixed(2) }}</strong></span
                  >
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Finish">
        <a href="javascript:void(0)" @click="back">返回我的订单列表</a>
      </div>
    </form>
  </div>
</template>
<script>
import ordersApi from "@/api/order";

export default {
  data() {
    return {};
  },
  asyncData({ params, error }) {
    return ordersApi.getById(params.id).then((response) => {
      return {
        order: response.data.data.item,
      };
    });
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.more-span {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.56);
  cursor: pointer;
}
.more-span:hover {
  color: #32aaff;
}
</style>
