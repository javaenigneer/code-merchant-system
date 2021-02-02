<template>
  <div class="app-container">
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
        <span>服务单信息</span>
      </div>
      <template>
        <el-form :inline="true">
          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.orderReturnId" style="width: 600px">
                <template slot="prepend">订单售后编号</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.orderReturnStatus" style="width: 600px">
                <template slot="prepend">申请状态</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.orderId" style="width: 600px">
                <template slot="prepend">原订单编号</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.orderReturnApplyTime" style="width: 600px">
                <template slot="prepend">申请时间</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.buyerName" style="width: 600px">
                <template slot="prepend">买家名称</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.receiverName" style="width: 600px">
                <template slot="prepend">收货人</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.receiverPhone" style="width: 600px">
                <template slot="prepend">收货人手机号</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <el-input disabled v-model="serviceOrder.receiverAddress" style="width: 600px">
                <template slot="prepend">收货人地址</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </template>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>处理信息</span>
      </div>
      <el-form>
        <el-form-item label="备注信息" prop="desc">
          <el-input type="textarea" v-model="input1"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 500px">
          <el-button type="primary" @click="receiveProcess()">确认</el-button>
          <el-button @click="resetForm('ruleForm')">拒绝</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {
    getOrderReturnInfo,
    receiveProcess
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
        orderStatus: '',
        input1: '',
        input2: '',
        serviceOrder: {
          orderReturnId: '',
          orderReturnStatus: '',
          orderId: '',
          orderReturnApplyTime: '',
          buyerName: '',
          receiverName: '',
          receiverPhone: '',
          receiverAddress: ''
        }
      }
    },
    created() {
      this.getOrderReturnInfo()
    },
    methods: {
      getOrderReturnInfo() {
        // this.listLoading = true
        getOrderReturnInfo(this.$route.query.orderReturnId).then((response) => {
          if (response.code === 20000) {
            let orderReturnDetail = response.data
            this.productDetail = orderReturnDetail.productModels
            this.serviceOrder.orderReturnId = orderReturnDetail.orderReturnId
            this.serviceOrder.orderId = orderReturnDetail.orderId
            this.serviceOrder.orderReturnStatus = this.getOrderReturnStatus(orderReturnDetail.orderReturnStatus)
            this.serviceOrder.orderReturnApplyTime = orderReturnDetail.orderReturnApplyTime
            this.serviceOrder.buyerName = orderReturnDetail.buyerName
            this.serviceOrder.receiverName = orderReturnDetail.receiverName
            this.serviceOrder.receiverPhone = orderReturnDetail.receiverPhone
            this.serviceOrder.receiverAddress = orderReturnDetail.receiverAddress
          } else {
            this.submitFail(response.msg)
          }
        })
      },
      getOrderReturnStatus(orderReturnStatus) {
        switch (orderReturnStatus) {
          case 0:
            return '未处理'
          case 1:
            return '退款中'
          case 2:
            return '退款成功'
          case 3:
            return '退货中'
          case 4:
            return '退货成功'
          case 5:
            return '拒绝退货'
        }
      },
      receiveProcess() {
        receiveProcess(this.serviceOrder.orderReturnId).then((response => {
          if (response.code === 20000) {
            this.submitOk(response.msg)
          } else {
            this.submitFail(response.msg)
          }
        }))
      }
    }
  }
</script>
