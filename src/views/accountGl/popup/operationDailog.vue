<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    class="customDailog"
    size="small"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" placeholder="请输入英文和数字" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name" type="password" placeholder="请输入英文和数字" />
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.name" type="password" placeholder="请输入英文和数字" />
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" class="w-btn" size="small">保存</el-button>
      <el-button type="info" class="w-btn" size="small">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      form: {}
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    showModule(param) {
      this.title = param.title
      this.dialogVisible = true
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
