<template>
  <div class="app-container">
    <el-steps :active="orderStatus" finish-status="success"  style="margin-top: 20px" v-show="orderCompletedDisable">
      <el-step title="提交订单" :description="orderTime.createTime"></el-step>
      <el-step title="支付订单" :description="orderTime.payTime"></el-step>
      <el-step title="平台发货" :description="orderTime.consignTime"></el-step>
      <el-step title="确认收货" :description="orderTime.closeTime"></el-step>
      <el-step title="完成评价" :description="orderTime.evaluationTime"></el-step>
    </el-steps>
    <el-steps :active="orderStatus" finish-status="success"  style="margin-top: 20px" v-show="orderAfterSaleDisable">
      <el-step title="提交订单" :description="orderTime.createTime"></el-step>
      <el-step title="支付订单" :description="orderTime.payTime"></el-step>
      <el-step title="申请售后" :description="orderTime.orderReturnApplyTime"></el-step>
      <el-step title="确认售后" :description="orderTime.orderReturnHandleTime"></el-step>
      <el-step title="订单完成"></el-step>
    </el-steps>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <template>
        <el-table
          :data="orderBasic"
          style="width: 100%">
          <el-table-column
            prop="orderDetailId"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="buyerName"
            label="买家名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="状态">
            <template slot-scope="scope">
              <el-tag size="medium">{{scope.row.orderStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderDeliveryCompany"
            label="物流公司">
          </el-table-column>
          <el-table-column
            prop="orderDeliveryNumber"
            label="物流单号">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>收货信息</span>
      </div>
      <template>
        <el-table
          :data="receiver"
          style="width: 100%">
          <el-table-column
            prop="receiverName"
            label="收货人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="receiverPhone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="receiverAddress"
            label="收货地址">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品信息</span>
      </div>
      <template>
        <el-table
          :data="productDetail"
          style="width: 100%">
          <el-table-column
            prop="productImage"
            label="商品图片"
            width="180">
            <template slot-scope="scope">
              <img :src="scope.row.productImage" width="40" height="40" class="head_pic"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="productTitle"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productSkuModel.price"
            label="商品价格">
          </el-table-column>
          <el-table-column
            prop="productSkuModel.title"
            label="属性">
          </el-table-column>
          <el-table-column
            prop="productCount"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="address"
            label="小计">
            <template slot-scope="scope">
              {{scope.row.productCount * scope.row.productSkuModel.price}}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>操作信息</span>
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="操作者"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="付款状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="发货状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="备注">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
  import {
    getOrderInfoById
  } from '@/api/order/order'

  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        value: '',
        centerDialogVisible: false,
        orderCompletedDisable: false,
        orderAfterSaleDisable: false,
        active: false,
        dialogVisible: false,
        list: [],
        sexList: [
          { key: '0', display_name: '男' },
          { key: '1', display_name: '女' }
        ],
        flagList: [
          { key: 1, display_name: '未付款' },
          { key: 2, display_name: '未发货' },
          { key: 3, display_name: '已发货' },
          { key: 4, display_name: '已完成' },
          { key: 5, display_name: '已关闭' }
        ],
        listLoading: true,
        deptTreeList: [],
        total: 0,
        orderBasic: [],
        receiver: [],
        productDetail: [],
        orderTime:{
          createTime: '',
          payTime: '',
          consignTime: '',
          endTime: '',
          closeTime: '',
          evaluationTime: '',
          orderReturnApplyTime: '',
          orderReturnHandleTime: ''
        },
        orderStatus: ''
      }
    },
    created() {
      this.getOrderInfoById()
    },
    methods: {
      getOrderInfoById() {
        // this.listLoading = true
        getOrderInfoById(this.$route.query.orderDetailId).then((response) => {
          if (response.code === 20000) {
            let orderDetail = response.data
            let orderBasicParam = {}
            // 订单完成评价
            if (orderDetail.orderStatus !== 8 && orderDetail.orderStatus !== 5 && orderDetail.orderStatus !== 9){
              // 设置步骤条为5
              this.orderCompletedDisable = true
              orderBasicParam.orderStatus = this.checkOrderStatus(orderDetail.orderStatus)
              this.orderStatus = 5
              // 订单售后
            }else if (orderDetail.orderStatus === 8) {
              this.orderAfterSaleDisable = true
              this.orderStatus = orderDetail.orderStatus
              orderBasicParam.orderStatus = this.checkOrderReturnStatus(orderDetail.orderReturnStatus)
            }
            // 订单交易关闭
            else if (orderDetail.orderStatus !== 8 && orderDetail.orderStatus === 5){
              // 设置步骤条为5
              this.orderCompletedDisable = true
              orderBasicParam.orderStatus = this.checkOrderStatus(orderDetail.orderStatus)
              this.orderStatus = 2
            }
            // 订单未完成评价
            else if (orderDetail.orderStatus === 9){
              // 设置步骤条为5
              this.orderCompletedDisable = true
              orderBasicParam.orderStatus = this.checkOrderStatus(orderDetail.orderStatus)
              this.orderStatus = 4
            }
            this.orderTime.createTime = orderDetail.createTime
            this.orderTime.payTime = orderDetail.payTime
            this.orderTime.consignTime = orderDetail.consignTime
            this.orderTime.endTime = orderDetail.endTime
            this.orderTime.closeTime = orderDetail.closeTime
            this.orderTime.evaluationTime = orderDetail.evaluationTime
            this.orderTime.orderReturnApplyTime = orderDetail.orderReturnApplyTime
            this.orderTime.orderReturnHandleTime = orderDetail.orderReturnHandleTime

            orderBasicParam.orderDetailId = orderDetail.orderDetailId
            orderBasicParam.buyerName = orderDetail.buyerName

            orderBasicParam.orderDeliveryCompany = orderDetail.orderDeliveryCompany
            orderBasicParam.orderDeliveryNumber = orderDetail.orderDeliveryNumber
            this.orderBasic.push(orderBasicParam)

            let receiverParam = {}
            receiverParam.receiverName = orderDetail.receiverName
            receiverParam.receiverPhone = orderDetail.receiverPhone
            receiverParam.receiverAddress = orderDetail.receiverAddress
            this.receiver.push(receiverParam)

            this.productDetail = orderDetail.productModels
          } else {
            this.submitFail(response.msg)
          }
        })
      },
      checkOrderStatus(orderStatus) {
        switch (orderStatus) {
          case 1:
            return '未支付'
          case 2:
            return '已支付，未发货'
          case 3:
            return '已发货'
          case 4:
            return '已完成'
          case 5:
            return '已关闭'
          case 8:
            return "申请售后"
          case 9:
            return "未评价"
        }
      },
      checkOrderReturnStatus(orderReturnStatus){
        switch (orderReturnStatus) {
          case 0:
            return '待处理'
          case 1:
            return '退款中'
          case 2:
            return '退款成功'
          case 3:
            return '退货中'
          case 4:
            return '退货成功'
          case 5:
            return "拒绝退款"
          case 6:
            return "拒绝退货"
        }
      }
    }
  }
</script>
