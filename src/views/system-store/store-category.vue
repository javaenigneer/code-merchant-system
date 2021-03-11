<template>
  <div>
    <div style="float:left;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>请选择店铺</span>
        </div>
        <div>
          <el-select
            v-model="storeId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            @change="getStoreCategoryByStoreId"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-card>
    </div>
    <div style="float: left;margin-left: 50px">
      <el-card class="box-card" style="width: 900px">
        <div slot="header" class="clearfix">
          <span>店铺分类</span>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="storeId"
              label="分类ID"
              sortable
              fixed
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="分类名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="sortNo"
              label="排序"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="addStoreCategory(scope.row)" type="text" size="small">添加</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {
    getStoreByName,
    getStoreCategoryByStoreId
  } from '@/api/store/store'

  export default {
    name: 'store-category',
    data() {
      return {
        options: [],
        storeId: undefined,
        list: [],
        loading: false,
        tableData: []
      }
    },
    methods: {
      // 远程搜索
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          getStoreByName(query).then((response => {
            if (response.code === 20000) {
              this.submitOk(response.msg)
              this.loading = false
              this.options = response.data
            } else {
              this.submitFail(response.msg)
              this.options = []
            }
          }))
        } else {
          this.options = []
        }
      },
      // 根据店铺id查询店铺分类
      getStoreCategoryByStoreId() {
        getStoreCategoryByStoreId(this.storeId).then((response => {
          if (response.code === 20000) {
            this.tableData = response.data
          } else {
            this.submitFail(response.msg)
          }
        }))
      }
    }
  }
</script>

<style>
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
    width: 480px;
  }
</style>
