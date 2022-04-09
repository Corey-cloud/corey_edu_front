<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>
        </tbody>
        <tbody>
        <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
        <tr>
          <td colspan="3" class="teacher">讲师：{{order.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a target="_blank" :href="'https://localhost:3000/course/'+order.courseId">
              <img :src="order.courseCover"></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a target="_blank" :href="'https://localhost:3000/course/'+ order.courseId">{{order.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{order.totalFee}}</strong></p>
            <!-- <span class="discName red">限时8折</span> -->
          </td>
          <td class="red priceNew Last">￥<strong>{{order.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计<span
                class="red f20">￥<strong>{{order.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree"><p class="on"><el-checkbox v-model="checked"/>我已阅读并同意<span @click="license" class="more-span">《Corey在线教育购买协议》</span></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{order.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <el-button :disabled="!checked" class="fr redb" type="button" id="submitPay" @click="toPay()">去支付</el-button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
import ordersApi from '@/api/order'

export default {
    data() {
      return {
        checked: false
      }
    },
    asyncData({ params, error }) {
      return ordersApi.getById(params.id).then(response => {
        return {
            order: response.data.data.item
        }
      })
    },
    methods:{
      //去支付
      toPay() {
        let routerJump = this.$router.resolve({path: '/pay/' + this.order.orderNo})
        window.open(routerJump.href, '_blank')
        //this.$router.push({path:'/pay/'+this.order.orderNo})
      },

      license() {
        this.$confirm(<span>
        在订购使用任何服务商（即“第三方应用开发者”)基于Corey在线教育平台开发并通过微信支付平台订购之前，请您仔细阅读下述许可协议条款。一旦您点击确认本协议，即表示您已接受了以下所述的条款和条件，同意受本协议约束。如果您不同意接受全部的条款和条件，那么您将无法订购使用在Corey在线教育平台发布的服务商产品。
        <br/><br/>
        一、本许可协议的缔约方为服务商和用户(“您”)，本许可协议具有合同效力。本协议是缔约方就用户通过淘宝服务平台购买服务商开发的应用软件和相关服务（本协议中统称“应用”)的协议。
        <br/><br/>
        二、应用订购方式
        <br/>
        &nbsp;&nbsp;2.1&nbsp;用户需凭其根据Corey在线教育平台注册流程合法注册并取得的Corey在线教育平台用户名和密码访问Corey在线教育平台，并订购产品。对于用户通过其他手段登录、使用所造成的后果，服务商将不承担任何责任。
        <br/>
        &nbsp;&nbsp;2.2&nbsp;服务商仅根据用户登录名和密码来确认使用服务商应用的用户身份。用户应妥善保管用户登录名及密码，并对其使用及其遗失自行承担责任。
        <br/><br/>
        三、软件许可费
        <br/>
        &nbsp;&nbsp;3.1&nbsp;用户通过在线教育平台订购产品的，应当按约定向服务商支付软件许可费。
        <br/>
        &nbsp;&nbsp;3.2&nbsp;软件许可费公示于Corey在线教育平台的服务商应用订购页面。
        <br/>
        &nbsp;&nbsp;3.3&nbsp;服务商可以向用户免费提供服务商应用的使用许可。免费的服务不应视为服务商放弃收费的权利。
        </span>, 'Corey在线教育购买协议', {
          confirmButtonText: '我已阅读该协议，并同意',
          cancelButtonText: '放弃',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '您已阅读并同意Corey在线教育协议'
          })
        }).catch(() => {

        })
      }
    }
}

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
