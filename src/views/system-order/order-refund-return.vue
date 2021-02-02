<template>
  <div class="app-container">
    <cus-wraper>
      <cus-filter-wraper>
        <el-input v-model="listQuery.orderId" placeholder="请输入订单号" style="width:150px" clearable></el-input>
        <el-select
          v-model="listQuery.orderStatus"
          class="filter-item"
          placeholder="订单状态"
          style="width: 150px;"
        >
          <el-option
            v-for="item in flagList"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="listQuery.createTime"
          type="datetime"
          placeholder="创建时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-date-picker
          v-model="listQuery.updateTime"
          type="datetime"
          placeholder="更新时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
      </cus-filter-wraper>
      <div class="table-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          size="mini"
          fit
          element-loading-text="Loading"
          border
          highlight-current-row
          align="center"

        >
          <el-table-column fixed label="订单售后编号" prop="orderReturnId" align="center"></el-table-column>
          <el-table-column label="原订单编号" prop="orderId" align="center"></el-table-column>
          <el-table-column label="会员名称" prop="buyerName" align="center"></el-table-column>
          <el-table-column label="订单金额" prop="totalPay" align="center"></el-table-column>
          <el-table-column label="订单创建时间" prop="createTime" align="center"></el-table-column>
          <el-table-column label="订单售后申请时间" prop="orderReturnApplyTime" align="center"></el-table-column>
          <el-table-column label="订单售后受理时间" prop="orderReturnHandleTime" align="center"></el-table-column>
          <el-table-column label="服务订单类型" prop="orderReturnType" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.orderReturnType == 1"
                      type="info"
                      hit
              >退款
              </el-tag>
              <el-tag v-if="scope.row.orderReturnType == 3"
                      type="info"
                      hit
              >退货
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="orderReturnStatus" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.orderReturnStatus == 0"
                      type="danger"
                      hit
              >待处理
              </el-tag>
              <el-tag v-if="scope.row.orderReturnStatus == 1"
                      type="info"
                      hit
              >退款中
              </el-tag>
              <el-tag v-if="scope.row.orderReturnStatus == 2"
                      type="success"
                      hit
              >退款成功
              </el-tag>
              <el-tag v-if="scope.row.orderReturnStatus == 3"
                      type="info"
                      hit
              >退货中
              </el-tag>
              <el-tag v-if="scope.row.orderReturnStatus == 4"
                      type="success"
                      hit
              >退货成功
              </el-tag>
              <el-tag v-if="scope.row.orderReturnStatus == 5"
                      type="warning"
                      hit
              >拒绝退货
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200px"
            v-if="this.global_checkBtnPermission(['order:view','order:delivery'])"
            :label="$t('table.actions')"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.orderStatus != 1"
                size="mini"
                type="success"
                @click="viewOrderReturn(scope.row)"
              >{{ $t('table.seeDetails') }}
              </el-button>
              <el-button
                v-if="scope.row.orderStatus == 2"
                v-has="'order:delivery'"
                size="mini"
                type="success"
                @click="orderDeliveryPage(scope.row)"
              >{{ $t('table.orderDelivery') }}
              </el-button>
              <cus-del-btn v-has="'order:delete'" @ok="handleDelete(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </cus-wraper>
  </div>
</template>

<script>
  import {
    getReceiverAddressById,
    orderDelivery,
    getPageMerchantOrderReturn
  } from '@/api/order/order'
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '通过'
        }, {
          value: '0',
          label: '未通过'
        }],
        value: '',
        centerDialogVisible: false,
        active: true,
        dialogVisible: false,
        list: [],
        flagList: [
          { key: 1, display_name: '未付款' },
          { key: 2, display_name: '未发货' },
          { key: 3, display_name: '已发货' },
          { key: 4, display_name: '已完成' },
          { key: 5, display_name: '已关闭' }
        ],
        logisticsCompany: [
          { key: 1, display_name: '圆通' },
          { key: 2, display_name: '中通' },
          { key: 3, display_name: '韵达' },
          { key: 4, display_name: '申通' },
          { key: 5, display_name: '邮政' }
        ],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          orderId: undefined,
          orderStatus: undefined,
          createTime: undefined
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        input: '',
        dialogStatus: '',
        titleMap: {
          update: '编辑',
          create: '创建'
        },
        orderDeliveryList: {
          orderId: undefined,
          receiverName: undefined,
          receiverPhone: undefined,
          receiverAddress: undefined,
          logisticsCompany: undefined
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getPageMerchantOrderReturn(this.listQuery).then((response) => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 监听dialog关闭时的处理事件
      handleDialogClose() {
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
        }
      },
      viewOrderReturn(row) {
        this.$router.push({ path: '/systemOrder/order-refund-return-detail', query: { orderReturnId: row.orderReturnId } })
      },
      // 订单发货列表
      orderDeliveryPage(row) {
        // 根据地址id查询地址信息
        getReceiverAddressById(row.addressId).then((response) => {
          if (response.code === 20000) {
            this.orderDeliveryList.orderId = row.orderId
            this.orderDeliveryList.receiverName = response.data.name
            this.orderDeliveryList.receiverPhone = response.data.phone
            this.orderDeliveryList.receiverAddress = response.data.area + response.data.detailed + response.data.houseNumber
            this.dialogVisible = true
          } else {
            this.submitFail(response.msg)
          }
        })
      },



      // 订单发货
      orderDelivery() {
        let orderDeliveryMessage = {}
        orderDeliveryMessage.orderId = this.orderDeliveryList.orderId
        orderDeliveryMessage.logisticsCompany = this.orderDeliveryList.logisticsCompany
        orderDelivery(orderDeliveryMessage).then((response) => {
          if (response.code === 20000) {
            this.getList()
            this.submitOk(response.msg)
            this.dialogVisible = false
          } else {
            this.submitFail(response.msg)
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>
