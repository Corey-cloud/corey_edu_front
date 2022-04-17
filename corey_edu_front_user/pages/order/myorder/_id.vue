<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="myOrderData.records" fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="orderNo" align="center" />
      <el-table-column label="课程封面" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.courseCover"
            alt="scope.row.courseTitle"
            width="150"
            height="80"
          />
        </template>
      </el-table-column>
      <el-table-column label="课程名称" prop="courseTitle" align="center" />
      <el-table-column
        label="讲师名称"
        prop="teacherName"
        align="center"
        width="100"
      />
      <el-table-column label="用户昵称" prop="nickname" align="center" />
      <el-table-column label="用户手机号" prop="mobile" align="center" />

      <el-table-column label="订单金额" width="100" align="center">
        <template slot-scope="scope">
          <b>
            {{ "¥" + scope.row.totalFee.toFixed(2) }}
          </b>
        </template>
      </el-table-column>
      <el-table-column
        label="支付类型"
        prop="payType"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.payType === 1">
            <b>微信</b>
          </span>
          <span v-else>
            <b>支付宝</b>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="status"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.status === 0">
            <div>{{ array[scope.$index] }}</div>
            <b>等待买家付款</b>
          </span>
          <span style="color: #00aa00" v-else-if="scope.row.status === 1">
            <b>已支付</b>
          </span>
          <span style="color: #808080" v-else-if="scope.row.status === 2">
            <b>已关闭</b>
          </span>
          <span style="color: #808080" v-else>
            <b>已取消</b>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="gmtCreate"
        align="center"
        width="160"
      />
      <!-- <el-table-column label="更新时间" prop="gmtModified" align="center" width="160" /> -->
      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <a
            v-if="scope.row.status == 0"
            style="color: #00aa00"
            :href="'/order/' + scope.row.orderNo"
            >订单详情</a
          >
          <a
            v-else
            style="color: #00aa00"
            :href="'/order/myorder/detail/' + scope.row.orderNo"
            >订单详情</a
          >
          <div></div>
          <a
            href="javascript:void(0)"
            v-if="scope.row.status == 0"
            style="color: grey"
            @click="cancelOrder(scope.row.orderNo)"
            >取消订单</a
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      :page-sizes="[8, 16, 32, 48, 64, 80]"
      style="padding: 30px 0; text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import ordersApi from "@/api/order";
export default {
  data() {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 8, // 每页记录数
      timedown: "",
      gmtCreate: "",
      array: null,
    };
  },

  asyncData({ params, error }) {
    if (params.id != null) {
      return ordersApi.getMyOrderList(1, 8, params.id).then((response) => {
        return {
          memberId: params.id,
          myOrderData: response.data.data,
          total: response.data.data.total,
        };
      });
    } else {
      this.$alert("您从哪里来，id都不传，想屁吃？");
    }
  },

  created() {
    if (this.total > 0) {
      this.array = new Array(this.total);
      for (let i = 0; i < this.total; i++) {
        this.array[i] = this.myOrderData.records[i].gmtCreate;
        if (this.myOrderData.records[i].status == 0) {
          this.countdown(i, this.array[i]);
        }
      }
    }
  },

  mounted() {
    this.tm = setInterval(() => {
      if (this.total > 0) {
        this.array = new Array(this.total);
        for (let i = 0; i < this.total; i++) {
          this.array[i] = this.myOrderData.records[i].gmtCreate;
          if (this.myOrderData.records[i].status == 0) {
            console.log("--------array[", i, "]--------");
            this.countdown(i, this.array[i]);
          }
        }
      }
    }, 1000);
  },

  methods: {
    fetchData(page = 1) {
      this.page = page;
      ordersApi
        .getMyOrderList(this.page, this.limit, this.memberId)
        .then((response) => {
          this.myOrderData = response.data.data;
          this.total = response.data.data.total;
        });
    },
    changeSize(size) {
      this.limit = size;
      this.fetchData(1);
    },
    cancelOrder(orderNo) {
      ordersApi.cancelOrder(orderNo).then((res) => {
        this.fetchData(1);
      });
    },
    //倒计时
    countdown(i, gmtCreate) {
      const startTime = Date.parse(new Date(gmtCreate));
      const now = Date.parse(new Date());
      const msec = 5 * 60 * 60 * 1000 - (now - startTime);

      console.log(msec);
      if (msec < 0) {
        this.fetchData(1);
        return;
      }

      // let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hh = parseInt((msec / 1000 / 60 / 60) % 24);
      let mm = parseInt((msec / 1000 / 60) % 60);
      let ss = parseInt((msec / 1000) % 60);
      // this.day = day;
      hh = hh > 9 ? hh : "0" + hh;
      mm = mm > 9 ? mm : "0" + mm;
      ss = ss > 9 ? ss : "0" + ss;

      this.array[i] = hh + ":" + mm + ":" + ss;
      console.log(this.array[i]);
    },
  },
};
</script>

<style scoped>
.myClassList .info {
  width: 450px;
  overflow: hidden;
}
.myClassList .info .pic {
  width: 150px;
  height: 90px;
  overflow: hidden;
  float: left;
}
.myClassList .info .pic a {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.myClassList .info .pic img {
  display: block;
  width: 100%;
}
.myClassList td .info .title {
  width: 280px;
  float: right;
  height: 90px;
}
.myClassList td .info .title a {
  display: block;
  height: 48px;
  line-height: 24px;
  overflow: hidden;
  color: #00baf2;
  margin-bottom: 12px;
}
.myClassList td .info .title p {
  line-height: 20px;
  margin-top: 5px;
  color: #818181;
}
</style>

