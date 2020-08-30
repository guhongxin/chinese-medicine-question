<template>
  <el-dialog
    title="基础信息详情"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
    class="customDailog"
  >
    <basic-infor />
    <div class="footer">
      <el-button type="primary" class="w-btn" size="small">保存</el-button>
      <el-button type="info" class="w-btn" size="small">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import BasicInfor from '@/components/BasicInfor'
export default {
  components: {
    BasicInfor
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    showModule() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.customDailog {
  /deep/ .el-dialog__header {
    text-align: center;
  }
}
.footer {
  text-align: center;
  margin: 40px 0px 0px;
  .w-btn {
    width: 120px;
    border-radius: 16px;
  }
}
</style>
