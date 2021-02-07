<template>
  <div>
    <div id="order-view">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg class="icon" aria-hidden="true" style="font-size: 50px">
            <use xlink:href="#icon-fc-order-list"></use>
          </svg>
          <span style="font-size: 20px">订单总数</span>
        </div>
        <h3 style="margin-left: 100px">{{orderTotalCount}}</h3>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg class="icon" aria-hidden="true" style="font-size: 50px">
            <use xlink:href="#icon-fc-order-completed"></use>
          </svg>
          <span style="font-size: 20px">已完成订单数</span>
        </div>
        <h3 style="margin-left: 100px">100</h3>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg class="icon" aria-hidden="true" style="font-size: 50px">
            <use xlink:href="#icon-fc-order-completed"></use>
          </svg>
          <span style="font-size: 20px">已完成订单数</span>
        </div>
        <h3 style="margin-left: 100px">100</h3>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg class="icon" aria-hidden="true" style="font-size: 50px">
            <use xlink:href="#icon-fc-order-completed"></use>
          </svg>
          <span style="font-size: 20px">已完成订单数</span>
        </div>
        <h3 style="margin-left: 100px">100</h3>
      </el-card>
    </div>

    <div id="transaction-reminder">
      <el-card class="box-card-transaction">
        <div slot="header" class="clearfix">
          <span>交易提示</span>
          <span style="float: right; padding: 3px 0" type="text">你需要立即处理的订单</span>
        </div>
        <div class="demo-image" style="margin-left: 30px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{pendingPaymentCount}}</span>
            <br>
            <span>待付款</span>
          </div>
        </div>
        <div class="demo-image" style="margin-left: 50px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{toBeDeliveredCount}}</span>
            <br>
            <span>待发货</span>
          </div>
        </div>
        <div class="demo-image" style="margin-left: 50px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{shippedCount}}</span>
            <br>
            <span>已发货</span>
          </div>
        </div>
        <div class="demo-image" style="margin-left: 50px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{receivedCount}}</span>
            <br>
            <span>已收货</span>
          </div>
        </div>
        <div class="demo-image" style="margin-left: 50px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{refundingCount}}</span>
            <br>
            <span>退款中</span>
          </div>
        </div>

        <div class="demo-image" style="margin-left: 30px;width: 50px; float:left;">
          <div class="block">
            <span class="demonstration" style="align-content: center">{{afterSaleCount}}</span>
            <br>
            <span>待售后</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <!--  <div class="dashboard-editor-container" style="padding: 20px;background: #f2f2f2;">-->

  <!--  </div>-->

</template>

<script>
  import Vue from 'vue'
  import LightTimeline from 'vue-light-timeline'
  import mixChart from '../../../components/Charts/mixChart'
  import keyboard from '../../../components/Charts/keyboard'
  import lineMarker from '../../../components/Charts/lineMarker'

  Vue.use(LightTimeline)
  import { getServerInfo } from '@/api/dashboard'
  import TransactionTable from '../admin/components/TransactionTable'
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import {judgmentMerchantSet,getMerchantDashBoardData } from '@/api/dashboard'

  export default {
    name: 'DashboardEditor',
    components: { PanThumb, TransactionTable, mixChart, keyboard, lineMarker },
    data() {
      return {
        activeNum: Math.round(Math.random() * 10000),
        faceNum: Math.round(Math.random() * 10000),
        userCount: 100,
        activeUserCount: 100,
        orderTotalCount: 100,
        pendingPaymentCount: 100,
        toBeDeliveredCount: 100,
        shippedCount: 100,
        receivedCount: 100,
        refundingCount: 100,
        afterSaleCount: 100
      }
    },
    created() {
      this.judgmentMerchantSet()
      this.getMerchantDashBoardData()
    },
    methods: {
      judgmentMerchantSet() {
        judgmentMerchantSet().then(response => {
          if (response.code === 20000) {
            let status = response.data
            // 商户为入驻
            if (status === 3) {
              this.$confirm('你还未入驻，若在七天后为入驻，将取消该用户，请立刻前往入驻', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({ path: '/my/set-merchant' })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '入驻时间七天内有效哦！'
                })
              })
            }
          }
        })
      },
      getMerchantDashBoardData(){
        getMerchantDashBoardData().then((response => {
          if (response.code === 20000){
            let result = response.data
            this.orderTotalCount = result.orderTotalCount
            this.pendingPaymentCount = result.pendingPaymentCount
            this.toBeDeliveredCount = result.toBeDeliveredCount
            this.shippedCount = result.shippedCount
            this.receivedCount = result.receivedCount
            this.refundingCount = result.refundingCount
            this.afterSaleCount = result.afterSaleCount
          }else {
            this.$message({
              type: 'info',
              message: response.msg
            })
          }
        }))
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles',
        'introduction'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    background-color: #e3e3e3;
    /*min-height: 100vh;*/
    padding: 50px 60px 0px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
    float: left;
    margin-left: 40px;
    margin-top: 20px;
  }

  .box-card-transaction {
    width: 640px;
    float: left;
    margin-left: 40px;
    margin-top: 20px;
  }
</style>

