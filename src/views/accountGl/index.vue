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
              <el-button type="success" size="small" @click="addAccount">新增</el-button>
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
    <div class="tabbox">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
        class="checktable"
        size="small"
        element-loading-text="列表正在加载中"
        fit
      >
        <el-table-column label="ID" align="center" />
        <el-table-column label="账号" align="center" />
        <el-table-column label="密码" align="center" />
        <el-table-column label="机构名称" align="center" />
        <el-table-column label="医院类别" align="center" />
        <el-table-column label="医院名等级" align="center" />
        <el-table-column label="负责人" align="center" />
        <el-table-column label="联系电话" align="center" />
        <el-table-column width="200" fixed="right" align="center">
          <template>
            <span class="span-btn" @click="editClick">编辑</span>
            <span class="span-btn">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          background
          :current-page.sync="listQuery.page"
          :page-sizes="[30, 50, 70, 100, 200]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <operationDailog ref="operationDailogDoc" />
  </div>
</template>
<script>
import operationDailog from './popup/operationDailog'
export default {
  components: {
    operationDailog
  },
  data() {
    return {
      form: {
        hospitalType: '',
        hospitalGrade: ''
      },
      tableData: [{}],
      hospitalTypeOptions: ['中医医院', '中西医结合医院'],
      hospitalGradeOptions: ['三甲', '三乙', '二甲', '二乙', '一级', '未定级'],
      stateOptions: ['已提交', '未提交'],
      listQuery: {
        page: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  methods: {
    addAccount() {
      // 新增
      const obj = {
        title: '新增账号'
      }
      this.$refs.operationDailogDoc.showModule(obj)
    },
    editClick() {
      const obj = {
        title: '编辑账号'
      }
      this.$refs.operationDailogDoc.showModule(obj)
    },
    handleSizeChange() {},
    handleCurrentChange() {}
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
</style>
