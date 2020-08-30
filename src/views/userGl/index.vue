<template>
  <div class="user-gl">
    <div class="search-box">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row :gutter="8">
          <el-col :span="7">
            <el-form-item label="机构名称：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="医院类别：">
              <el-select v-model="form.hospitalType" placeholder="请选择活动区域" clearable>
                <el-option
                  v-for="(item, key) in hospitalTypeOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="医院等级：">
              <el-select v-model="form.hospitalGrade" placeholder="请选择活动区域" clearable>
                <el-option
                  v-for="(item, key) in hospitalGradeOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="btn-group">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" size="small">重置</el-button>
            </div>
          </el-col>
          <el-col :span="7">
            <el-form-item label="负责人姓名：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系电话：">
              <el-input v-model="form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="问卷状态：">
              <el-select v-model="form.hospitalGrade" placeholder="请选择活动区域" clearable>
                <el-option
                  v-for="(item, key) in stateOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tabbox">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
        class="checktable"
      >
        <el-table-column label="ID" />
        <el-table-column label="医院类别" />
        <el-table-column label="医院等级" />
        <el-table-column label="负责人姓名" />
        <el-table-column label="联系电话" />
        <el-table-column label="问卷状态" />
        <el-table-column>
          <template>
            <span class="span-btn">详情</span>
            <span class="span-btn">查看问卷</span>
            <span class="span-btn">导出问卷</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        name: 'sna'
      }],
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
.tabbox {
  padding: 0px 10px;
}
.span-btn {
  cursor: pointer;
  color: #409EFF;
}
.checktable {
  .has-gutter {
    th {
      background-color: red;
    }
  }
}
</style>
