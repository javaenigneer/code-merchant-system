<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" style="width: 400px">
      <el-form-item label="入驻手机号">
        <el-input v-model="form.setPhone"></el-input>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input type="password" v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
  import TransactionTable from '../admin/components/TransactionTable'
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import { resetPassword } from '@/api/dashboard'
  import {removeToken } from '@/utils/auth'

  export default {
    name: 'DashboardEditor',
    components: { PanThumb, TransactionTable, mixChart, keyboard, lineMarker },
    data() {
      return {
        form: {
          setPhone: '',
          oldPassword: '',
          newPassword: ''
        }
      }
    },
    created() {
    },
    methods: {
      resetPassword() {
        resetPassword(this.form).then((response => {
          if (response.code === 20000) {
            this.submitOk(response.msg)
            setTimeout(function() {
              removeToken()
              this.$router.push({ path: '/login' })
              location.reload()
            },2000)
          } else {
            this.submitFail(response.msg)
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

