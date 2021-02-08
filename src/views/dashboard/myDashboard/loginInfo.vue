<template>
  <div>
    <el-card class="box-card" style="float:left; margin-left: 40px">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="editMerchantInfoView">修改信息</el-button>
      </div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="商户号">
          <el-input v-model="merchantInfo.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户昵称">
          <el-input v-model="merchantInfo.nickName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="merchantInfo.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="merchantInfo.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户跟进人">
          <el-input v-model="merchantInfo.merchantFollower" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="float:left; margin-left: 40px">
      <div slot="header" class="clearfix">
        <span>入驻信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">修改信息</el-button>
      </div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="商户名称">
          <el-input v-model="merchantInfo.merchantName" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证正面">
          <div class="block">
            <el-image :src="merchantInfo.idCardFront" fit="cover" style="width: 100px;height: 100px"></el-image>
          </div>
        </el-form-item>
        <el-form-item label="身份证背面">
          <div class="block">
            <el-image :src="merchantInfo.idCardBack" fit="cover" style="width: 100px;height: 100px">
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div class="block">
            <el-image :src="merchantInfo.license" fit="cover" style="width: 100px;height: 100px">
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="入驻时间">
          <el-input v-model="merchantInfo.setCreateTime" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      title="修改基本信息"
      :visible.sync="merchantInfoDialogVisible"
      width="50%"
      center>
      <el-form ref="form" :model="merchantInfo" label-width="120px">
        <el-form-item label="商户昵称">
          <el-input v-model="merchantInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/codeworld-upload/upload-image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="merchantInfo.avatar" :src="merchantInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商户跟进人">
          <el-select
            v-model="merchantInfo.followerId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="merchantInfoDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateMerchantInfo()">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>

  import { getMerchantInfo, getUserRoleToMerchant } from '@/api/dashboard'
  import TransactionTable from '../admin/components/TransactionTable'
  import PanThumb from '@/components/PanThumb'
  import { updateMerchantInfo } from '@/api/merchant/merchant'

  export default {
    name: 'DashboardEditor',
    components: { PanThumb, TransactionTable },
    data() {
      return {
        emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
        form: {
          id: undefined, //主键ID
          username: undefined, //账号
          pwd: undefined, //登录密码
          nickName: undefined //昵称
        },
        imageUrl: '',
        dialogVisible: false,
        merchantInfoDialogVisible: false,
        dialogStatus: '',
        titleMap: {
          update: '修改个人信息',
          create: '创建'
        },
        merchantInfo: {
          number: '',
          nickName: '',
          phone: '',
          avatar: '',
          createTime: '',
          merchantName: '',
          idCardFront: '',
          idCardBack: '',
          license: '',
          setCreateTime: '',
          merchantFollower: '',
          followerId: ''
        },
        options: [],
        value: '',
        loading: false,
        editMerchantInfo: {
          number: '',
          nickName: '',
          avatar: '',
          merchantFollower: ''
        }
      }
    },
    created() {
      this.getMerchantInfo()
    },
    methods: {
      getMerchantInfo() {
        getMerchantInfo().then(response => {
          if (response.code === 20000) {
            let result = response.data
            this.merchantInfo = result
            let follower = {}
            follower.userId = result.followerId
            follower.userName = result.merchantFollower
            this.options.push(follower)
          }
        })
      },
      editMerchantInfoView() {
        this.merchantInfoDialogVisible = true
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          getUserRoleToMerchant(query).then((response => {
            if (response.code === 20000) {
              this.loading = false
              let result = response.data
              this.options = result
            } else {
              this.options = []
            }
          }))
        }
      },
      handleSuccess(response, file, fileList) {
        if (response.code === 20000) {
          this.submitOk(response.msg)
          this.imageUrl = response.data
          this.merchantInfo.avatar = response.data
        }
      },
      updateMerchantInfo() {
        this.editMerchantInfo.number = this.merchantInfo.number
        this.editMerchantInfo.nickName = this.merchantInfo.nickName
        this.editMerchantInfo.avatar = this.merchantInfo.avatar
        this.editMerchantInfo.merchantFollower = this.merchantInfo.followerId
        updateMerchantInfo(this.editMerchantInfo).then((response => {
          if (response.code === 20000) {
            this.submitOk(response.msg)
            this.merchantInfoDialogVisible = false
          }
        }))
      },
      // 监听dialog关闭时的处理事件
      handleDialogClose() {
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
