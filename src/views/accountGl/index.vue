<template>
  <div class="account-gl">
    <div class="search-box">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row :gutter="8">
          <el-col :span="6">
            <el-form-item label="机构名称：" prop="organizationName">
              <el-input v-model="form.organizationName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账号：" prop="username">
              <el-input v-model="form.username" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人姓名：" prop="chargePersonName">
              <el-input v-model="form.chargePersonName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="btn-group">
              <el-button type="primary" size="small" :loading="searchLoading" @click="search">查询</el-button>
              <el-button type="info" size="small" @click="restFrom">重置</el-button>
              <el-button type="success" size="small" @click="addAccount">新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="6">
            <el-form-item label="联系电话：" prop="chargePersonPhone">
              <el-input v-model="form.chargePersonPhone" clearable />
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
        <el-table-column label="账号" align="center" prop="username" />
        <el-table-column label="密码" align="center" prop="password" />
        <el-table-column label="机构名称" align="center" prop="organization_name" />
        <el-table-column label="医院类别" align="center" prop="organization_category" />
        <el-table-column label="医院名等级" align="center" prop="organization_level" />
        <el-table-column label="负责人" align="center" prop="charge_person_name" />
        <el-table-column label="联系电话" align="center" prop="charge_person_phone" />
        <el-table-column width="200" fixed="right" align="center">
          <template slot-scope="scope">
            <span class="span-btn" @click="editClick(scope.row)">编辑</span>
            <span class="span-btn" @click="deleteClick(scope.row)">删除</span>
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
    <operationDailog ref="operationDailogDoc" @saveBtn="saveBtn" />
  </div>
</template>
<script>
import operationDailog from './popup/operationDailog'
import { addUser, editUser, userGetList, delUser } from '@/api/usergl.js'
export default {
  components: {
    operationDailog
  },
  data() {
    return {
      form: {
        organizationName: '',
        username: '',
        chargePersonName: '',
        chargePersonPhone: ''
      },
      tableData: [],
      hospitalTypeOptions: ['中医医院', '中西医结合医院'],
      hospitalGradeOptions: ['三甲', '三乙', '二甲', '二乙', '一级', '未定级'],
      stateOptions: ['已提交', '未提交'],
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      tableLoading: false,
      searchLoading: false
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
    addAccount() {
      // 新增
      const obj = {
        title: '新增账号'
      }
      this.$refs.operationDailogDoc.showModule(obj)
    },
    editClick(row) {
      const obj = {
        title: '编辑账号',
        flag: 1,
        row
      }
      this.$refs.operationDailogDoc.showModule(obj)
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
    saveBtn(param) {
      // 添加用户
      if (param.flag === 1) {
        this.editUserApi(param).then(() => {
          this.getList()
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.addUserApi(param).then(() => {
          this.getList()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    addUserApi(param) {
      // 添加账号
      return new Promise((resolve, reject) => {
        addUser(param).then(res => {
          this.$message({
            type: 'success',
            message: '添加账号成功!'
          })
          this.$refs.operationDailogDoc.handleClose()
          resolve()
        }).catch(err => {
          console.log(err)
          this.$refs.operationDailogDoc.btnloading = false
          reject(err)
        })
      })
    },
    editUserApi(param) {
      // 编辑账号
      return new Promise((resolve, reject) => {
        editUser(param).then(res => {
          this.$message({
            type: 'success',
            message: '编辑账号成功!'
          })
          this.$refs.operationDailogDoc.handleClose()
          resolve()
        }).catch(err => {
          console.log(err)
          this.$refs.operationDailogDoc.btnloading = false
          reject(err)
        })
      })
    },
    getList() {
      this.tableLoading = true
      const obj = Object.assign({}, this.listQuery)
      userGetList(obj).then(res => {
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
    delUserApi(param) {
      // 删除
      delUser(param).then(res => {
        this.$message({
          type: 'success',
          message: '删除账号成功！'
        })
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteClick(row) {
      // 删除确定按钮
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const obj = {
          userId: row.id
        }
        this.delUserApi(obj)
      }).catch(() => {
        return false
      })
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
</style>
