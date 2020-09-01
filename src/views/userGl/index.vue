<template>
  <div class="user-gl">
    <div class="search-box">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row :gutter="8">
          <el-col :span="7">
            <el-form-item label="机构名称：" prop="organizationName">
              <el-input v-model="form.organizationName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="医院类别：" prop="organizationCategory">
              <el-select
                v-model="form.organizationCategory"
                placeholder="请选择活动区域"
                clearable
                style="width:100%"
              >
                <el-option
                  v-for="(item, key) in hospitalTypeOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="医院等级：" prop="organizationLevel">
              <el-select
                v-model="form.organizationLevel"
                placeholder="请选择活动区域"
                clearable
              >
                <el-option
                  v-for="(item, key) in hospitalGradeOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="btn-group">
              <el-button type="primary" size="small" :loading="searchLoading" @click="search">查询</el-button>
              <el-button type="primary" size="small" @click="restFrom">重置</el-button>
            </div>
          </el-col>
          <el-col :span="7">
            <el-form-item label="负责人姓名：" prop="chargePersonName">
              <el-input v-model="form.chargePersonName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系电话：" prop="chargePersonPhone">
              <el-input v-model="form.chargePersonPhone" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="问卷状态：" prop="questionnaireStatus">
              <el-select
                v-model="form.questionnaireStatus"
                clearable
              >
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
        v-loading="tableLoading"
        :data="tableData"
        stripe
        style="width: 100%"
        border
        class="checktable"
        size="small"
        element-loading-text="列表正在加载中"
        fit
      >
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="机构名称" align="center" prop="organization_name" />
        <el-table-column label="医院类别" align="center" prop="organization_category" />
        <el-table-column label="医院等级" align="center" prop="organization_level" />
        <el-table-column label="负责人姓名" align="center" prop="charge_person_name" />
        <el-table-column label="联系电话" align="center" prop="charge_person_phone" />
        <el-table-column label="问卷状态" align="center" prop="status">
          <template slot-scope="scope">
            <span :class="`status${scope.row.status}`">{{ scope.row.status === '1' ? '已提交': '暂存' }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" fixed="right" align="center">
          <template slot-scope="scope">
            <span class="span-btn" @click="userDetails(scope.row)">详情</span>
            <span class="span-btn" @click="viewquestionnaire(scope.row)">查看问卷</span>
            <span class="span-btn">导出问卷</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          background
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 50, 70, 100, 200]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <userDailog ref="userDailogDoc" />
    <questionnairedetails ref="questionnairedetailsDoc" />
  </div>
</template>
<script>
import userDailog from './popup/userDailog'
import questionnairedetails from './popup/questionnairedetails'
import { questionnaireGetList } from '@/api/usergl'
export default {
  components: {
    userDailog,
    questionnairedetails
  },
  data() {
    return {
      tableData: [],
      form: {
        organizationName: '',
        organizationCategory: '',
        organizationLevel: '',
        chargePersonName: '',
        chargePersonPhone: '',
        questionnaireStatus: ''
      },
      hospitalTypeOptions: ['中医医院', '中西医结合医院'],
      hospitalGradeOptions: ['三甲', '三乙', '二甲', '二乙', '一级', '未定级'],
      stateOptions: ['已提交', '未提交'],
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      searchLoading: false,
      tableLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    search() {
      this.searchLoading = true
      this.listQuery = Object.assign({}, this.listQuery, this.form)
      this.getList()
    },
    restFrom() {
      // 重置
      this.$refs['form'].resetFields()
    },
    handleSizeChange(val) {
      // 改变每页显示条数
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange() {
      // 页码改变
      this.getList()
    },
    userDetails(row) {
      // 查看用户机构
      this.$refs.userDailogDoc.showModule(row)
    },
    getList() {
      const obj = Object.assign({}, this.listQuery)
      this.tableLoading = true
      questionnaireGetList(obj).then(res => {
        this.tableLoading = false
        this.searchLoading = false
        const data = res.data
        this.tableData = data.list
        this.total = data.total
      }).catch(() => {
        this.tableLoading = false
        this.searchLoading = false
      })
    },
    viewquestionnaire(row) {
      this.$refs.questionnairedetailsDoc.showModule(row)
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
  color: #409eff;
}
.checktable {
  .has-gutter {
    th {
      background-color: #F56C6C;
    }
  }
}
.status0 {
  color: #F56C6C;
}
.status1 {
  color: #409EFF;
}
.span-btn {
  margin-right: 10px;
}
</style>
