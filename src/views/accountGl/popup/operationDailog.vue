<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDailog"
    size="small"
  >
    <el-form ref="form" :model="form" :rules="loginRules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入英文和数字" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入英文和数字" />
      </el-form-item>
      <el-form-item label="机构名称" prop="organizationName">
        <el-input v-model="form.organizationName" placeholder="请输入英文和数字" />
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" class="w-btn" size="small" :loading="btnloading" @click="saveBtn">保存</el-button>
      <el-button type="info" class="w-btn" size="small" @click="cancelBtn">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户名！'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能少于6位！'))
  } else {
    callback()
  }
}
export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      form: {
        username: '',
        password: '',
        organizationName: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        organizationName: [{ required: true, trigger: 'blur', message: '请填写机构名称' }]
      },
      btnloading: false
    }
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields()
      this.btnloading = true
      this.dialogVisible = false
    },
    showModule(param) {
      this.btnloading = false
      this.title = param.title
      this.dialogVisible = true
    },
    saveBtn() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnloading = true
          this.$emit('saveBtn', this.form)
        }
      })
    },
    cancelBtn() {
      this.handleClose()
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
  margin: 40px 0px 0px;
  .w-btn {
    width: 120px;
    border-radius: 16px;
  }
}
</style>
