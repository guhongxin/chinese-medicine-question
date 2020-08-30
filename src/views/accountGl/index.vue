<template>
  <div class="account-gl">
    <div class="search-box">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row :gutter="8">
          <el-col :span="6">
            <el-form-item label="机构名称：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账号：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人姓名：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="btn-group">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="info" size="small">重置</el-button>
              <el-button type="success" size="small">新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="6">
            <el-form-item label="联系电话：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        hospitalType: '',
        hospitalGrade: ''
      },
      hospitalTypeOptions: ['中医医院', '中西医结合医院'],
      hospitalGradeOptions: ['三甲', '三乙', '二甲', '二乙', '一级', '未定级'],
      stateOptions: ['已提交', '未提交']
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box {
  box-sizing: border-box;
  padding: 20px 10px;
  .btn-group {
    text-align: center;
  }
}
</style>
