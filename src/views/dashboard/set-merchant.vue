<template>
  <div>
    <el-steps :active="2" finish-status="success" simple style="margin-top: 20px">
      <el-step title="提交申请" ></el-step>
      <el-step title="商户管理员审核" ></el-step>
      <el-step title="超级管理员审核" ></el-step>
    </el-steps>
    <el-form ref="form" :model="form" label-width="100px" style="width: 700px; margin-top: 20px;margin-left: 200px" :rules="rules">
      <el-form-item label="商户名称" prop="name">
        <el-input v-model="form.merchantName"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" >
        <el-upload
          action="http://localhost:8888/codeworld-upload/upload-image"
          list-type="picture-card"
          name="file"
          :limit="1"
          :on-preview="handlePictureIdCardFrontPreview"
          :on-remove="handleRemove"
          :on-success="idCardFrontHandleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="idCardFrontDialogVisible">
          <img width="100%" :src="idCardFrontImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="身份证反面" >
        <el-upload
          action="http://localhost:8888/codeworld-upload/upload-image"
          list-type="picture-card"
          name="file"
          :limit="1"
          :on-preview="handlePictureIdCardBackPreview"
          :on-remove="handleRemove"
          :on-success="idCardBackHandleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="idCardBackDialogVisible">
          <img width="100%" :src="idCardBackImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="营业执照" >
        <el-upload
          action="http://localhost:8888/codeworld-upload/upload-image"
          list-type="picture-card"
          name="file"
          :limit="1"
          :on-preview="handlePictureLicensePreview"
          :on-remove="handleRemove"
          :on-success="licenseHandleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="licenseDialogVisible">
          <img width="100%" :src="licenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="入驻类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择入驻类型">
          <el-option label="包月：599/月" value="1"></el-option>
          <el-option label="包年：1599/年" value="2"></el-option>
          <el-option label="包季：5999/年" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="merchantSettled">立即入驻</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { merchantSettled } from '@/api/dashboard'

  export default {
    name: 'set-merchant',
    data() {
      return {
        form: {
          merchantName: '',
          idCardFront: '',
          idCardBack: '',
          license: '',
          type: ''
        },
        monthType: '1',
        yearType: '2',
        seasonType: '3',
        idCardFrontImageUrl: '',
        idCardBackImageUrl: '',
        licenseImageUrl: '',
        idCardFrontDialogVisible: false,
        idCardBackDialogVisible: false,
        licenseDialogVisible: false,
        rules: {
          name: [
            {
              required: true,
              message: '请输入商户名称',
              trigger: 'blur'
            }
          ],
          frontImageUrl: [
            {
              required: true,
              message: '请上传身份证正面',
              trigger: 'blur'
            }
          ],
          backImageUrl: [
            {
              required: true,
              message: '请上传身份证反面',
              trigger: 'blur'
            }
          ],
          lImageUrl: [
            {
              required: true,
              message: '请上传营业执照',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择入驻类型',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      // 身份证正面放大
      handlePictureIdCardFrontPreview(file) {
        this.idCardFrontImageUrl = file.url
        this.idCardFrontDialogVisible = true
      },
      // 身份证反面放大
      handlePictureIdCardBackPreview(file) {
        this.idCardFrontImageUrl = file.url
        this.idCardFrontDialogVisible = true
      },
      // 营业执照放大
      handlePictureLicensePreview(file) {
        this.idCardFrontImageUrl = file.url
        this.idCardFrontDialogVisible = true
      },
      // 身份证正面
      idCardFrontHandleSuccess(response, file, fileList) {
        if (response.code === 20000) {
          this.submitOk(response.msg)
          this.idCardFrontImageUrl = response.data
          this.form.idCardFront = response.data
        }
      },
      // 身份证反面
      idCardBackHandleSuccess(response, file, fileList) {
        if (response.code === 20000) {
          this.submitOk(response.msg)
          this.idCardBackImageUrl = response.data
          this.form.idCardBack = response.data
        }
      },
      // 营业执照
      licenseHandleSuccess(response, file, fileList) {
        if (response.code === 20000) {
          this.submitOk(response.msg)
          this.licenseImageUrl = response.data
          this.form.license = response.data
        }
      },
      merchantSettled() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            merchantSettled(this.form).then((response => {
              if (response.code === 20000) {
                this.submitOk(response.msg)
                setTimeout(function() {
                  window.reload()
                }, 2000)
              } else {
                this.submitFail(response.msg)
                return
              }
            }))
          }
        })
      }
    }
  }
</script>

<style>
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

  <
  /
  sty
