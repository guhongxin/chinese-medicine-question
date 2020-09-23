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
                placeholder="请选择医院类别"
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
                placeholder="请选择医院等级"
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
                  :label="item.text"
                  :value="item.value"
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
            <span class="span-btn" @click="doExport(scope.row)">导出问卷</span>
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

import { questionnaireContent, scoreContent } from '@/utils/questionnaireData.js'
import { questionnaireGetList, questionnairegetQn } from '@/api/usergl'
import XLSX from 'xlsx'
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
      stateOptions: [{
        value: '1',
        text: '已提交'
      }, {
        value: '0',
        text: '未提交'
      }],
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
    },
    doExport(row) {
      require.ensure([], () => { // 用 webpack Code Splitting xlsl还是很大的
        const tHeader = ['', '指标名称', '2018年内容', '2019年内容'] // excel 表格头
        questionnairegetQn({
          userId: row.id
        }).then(res => {
          const data = res.data
          const content = data.questionnaire.content
          const list = []
          const merges = []
          let itemIndex = 0
          for (let i = 0; i < questionnaireContent.length; i++) {
            if (i === 0) {
              merges[0] = { s: { r: 1, c: 0 }, e: { r: questionnaireContent[i].child.mm.length, c: 0 }}
            } else {
              merges[i] = { s: { r: merges[i - 1]['e']['r'] + 1, c: 0 }, e: { r: merges[i - 1]['e']['r'] + 1 + questionnaireContent[i].child.mm.length - 1, c: 0 }}
            }
            for (let j = 0; j < questionnaireContent[i].child.mm.length; j++) {
              const _list = []
              if (j === 0) {
                _list[0] = questionnaireContent[i].name
              } else {
                _list[0] = ''
              }
              if (questionnaireContent[i].child.mm[j] === '不同范围的平均配送送达时间') {
                _list[1] = questionnaireContent[i].child.mm[j]
                const _childcz1 = questionnaireContent[i].child.cz1[j].child
                const _valuecz1 = content ? content['2018']['field' + itemIndex] : ''
                const _valueArrcz1 = _valuecz1.split(',')
                let resultcz1 = ''
                for (let kkmm1 = 0; kkmm1 < _valueArrcz1.length; kkmm1++) {
                  if (_valueArrcz1[kkmm1]) {
                    resultcz1 += `${_childcz1[kkmm1].qzLable}${_valueArrcz1[kkmm1]}${_childcz1[kkmm1].unit}`
                  }
                }
                _list[2] = resultcz1.replace(/,$/g, '')

                const _childcz2 = questionnaireContent[i].child.cz2[j].child
                const _valuecz2 = content ? content['2019']['field' + itemIndex] : ''
                const _valueArrcz2 = _valuecz2.split(',')
                let resultcz2 = ''
                for (let kkmm2 = 0; kkmm2 < _valueArrcz2.length; kkmm2++) {
                  if (_valueArrcz2[kkmm2]) {
                    resultcz2 += `${_childcz2[kkmm2].qzLable}${_valueArrcz2[kkmm2]}${_childcz2[kkmm2].unit}`
                  }
                }
                _list[3] = resultcz2.replace(/,$/g, '')
              } else {
                _list[1] = questionnaireContent[i].child.mm[j]
                _list[2] = content ? content['2018']['field' + itemIndex].replace(/,$/g, '') : ''
                _list[3] = content ? content['2019']['field' + itemIndex].replace(/,$/g, '') : ''
              }
              // _list[1] = questionnaireContent[i].child.mm[j]
              // _list[2] = content ? content['2018']['field' + itemIndex] : ''
              // _list[3] = content ? content['2019']['field' + itemIndex] : ''
              itemIndex++
              list.push(_list)
            }
          }

          const list1 = []
          const perMerges1 = merges[merges.length - 1]

          const _merges1 = {
            s: {
              r: perMerges1.e.r + 1,
              c: 0
            },
            e: {
              r: perMerges1.e.r + 1,
              c: 1
            }
          }
          merges.push(_merges1)

          for (let i = 0; i < scoreContent.length; i++) {
            const perMerges = merges[merges.length - 1]
            const _merges = {
              s: {
                r: perMerges.e.r + 1,
                c: 0
              },
              e: {
                r: perMerges.e.r + 1,
                c: 1
              }
            }
            merges.push(_merges)
            list1[i] = []
            list1[i][0] = scoreContent[i]['name']
            list1[i][1] = ''
            if (content) {
              list1[i][2] = content['2018']['field' + scoreContent[i]['method'][1]] ? ((content['2018']['field' + scoreContent[i]['method'][0]] * 100 / content['2018']['field' + scoreContent[i]['method'][1]]).toFixed(2) + '%') : '0%'
              list1[i][3] = content['2019']['field' + scoreContent[i]['method'][1]] ? ((content['2019']['field' + scoreContent[i]['method'][0]] * 100 / content['2019']['field' + scoreContent[i]['method'][1]]).toFixed(2) + '%') : '0%'
            } else {
              list1[i][2] = ''
              list1[i][3] = ''
            }
          }
          const tHData = [tHeader, ...list, ['推算指标', '', '2018内容', '2019内容'], ...list1]
          const ws = XLSX.utils.aoa_to_sheet(tHData)
          const wb = XLSX.utils.book_new()
          ws['!cols'] = [{ wch: 5 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 60 }]
          ws['!merges'] = merges
          XLSX.utils.book_append_sheet(wb, ws, '问卷')
          XLSX.writeFile(wb, `${row.organization_name}调查问卷.xlsx`)
        }).catch(err => {
          console.log(err)
        })
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
