<template>
  <el-form ref="form" :model="form" label-width="80px" style="width: 500px;">
    <el-form-item label="店铺名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="店铺状态">
      <el-select v-model="form.status" placeholder="请选择店铺状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    createStore
  } from '@/api/store/store'

  export default {
    name: 'new-add-store',
    data() {
      return {
        form: {
          name: '',
          status: ''
        }
      }
    },
    methods: {
      // 新增店铺
      onSubmit() {
        createStore(this.form).then((response => {
          if (response.code === 20000) {
            this.submitOk(response.msg)
            this.$router.push({ path: '/systemStore/store'})
          } else {
            this.submitFail(response.msg)
          }
        }))
      }
    }
  }
</script>

<style scoped>

</style>
