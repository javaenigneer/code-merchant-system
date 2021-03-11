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
              prop="id"
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
                <el-button @click="addStoreCategoryView(scope.row)" type="text" size="small">添加</el-button>
                <el-button @click="editStoreCategoryView(scope.row)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" style="width: 500px">
        <el-form-item label="上级分类名称" prop="parentName">
          <el-input v-model="form.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名">
          <el-input v-model="form.name" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sortNo" type="number" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改分类"
      :visible.sync="editDialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" style="width: 500px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortNo">
          <el-input v-model="form.sortNo" type="number" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitEdit">立即修改</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getStoreByName,
    getStoreCategoryByStoreId,
    addStoreCategory,
    editStoreCategory
  } from '@/api/store/store'

  export default {
    name: 'store-category',
    data() {
      return {
        options: [],
        storeId: undefined,
        list: [],
        loading: false,
        tableData: [],
        dialogVisible: false,
        editDialogVisible: false,
        form: {
          parentName: '',
          parentId: '',
          name: '',
          sortNo: '',
          storeId: '',
          id: ''
        },
        resetForm:{
          parentName: '',
          parentId: '',
          name: '',
          sortNo: '',
          storeId: ''
        }
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
      },
      addStoreCategoryView(row){
        this.form = this.resetForm
        if (row != null){
          this.form.parentId = row.id
          this.form.parentName = row.name
          this.form.storeId = this.storeId
        }else {
          this.parentId = 0
          this.form.storeId = this.storeId
        }
        this.dialogVisible = true
      },
      editStoreCategoryView(row){
        this.form.id = row.id
        this.form.name = row.name
        this.form.sortNo = row.sortNo
        this.editDialogVisible = true
      },
      // 添加分类
      onSubmit(){
        addStoreCategory(this.form).then((response => {
          if (response.code === 20000){
            this.submitOk(response.msg)
            this.dialogVisible =false
            this.getStoreCategoryByStoreId();
          }else {
            this.submitFail(response.msg)
          }
        }))
      },
      onSubmitEdit(){
        editStoreCategory(this.form).then((response => {
          if (response.code === 20000){
            this.submitOk(response.msg)
            this.editDialogVisible =false
            this.getStoreCategoryByStoreId();
          }else {
            this.submitFail(response.msg)
          }
        }))
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
