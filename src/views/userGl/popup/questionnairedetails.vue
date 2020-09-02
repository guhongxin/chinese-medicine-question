<template>
  <el-dialog
    title="问卷"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
    class="customDailog"
    size="small"
  >
    <div class="answerSheet">
      <div class="title">{{ username }}调查问卷 <img src="../../../assets/img/excel.png" @click="exportExcel"></div>
      <div class="tab-box">
        <table id="wtable" class="w-table" cellspacing="0" style="width:100%;">
          <tr>
            <th style="width:100px;" />
            <th>指标名称</th>
            <th>2018年内容</th>
            <th>2019年内容</th>
          </tr>
          <template v-for="(item, key) in tabData">
            <tr v-for="(childp, index) in item.child.mm" :key="`${key}-${index}`">
              <td v-if="index === 0" style="text-align: center;" :rowspan="item.child.mm.length">
                {{ item.name }}
              </td>
              <td width="40%">{{ childp }}</td>
              <td>
                {{ item.child.cz1[index].value }}
              </td>
              <td>
                {{ item.child.cz2[index].value }}
              </td>
            </tr>
          </template>
          <tr>
            <th colspan="2" style="color:red;">推算指标</th>
            <th>2018年内容</th>
            <th>2019年内容</th>
          </tr>
          <tr v-for="(item, key) in pushIndex" :key="key">
            <td colspan="2">{{ item.name }}</td>
            <td>{{ item.cz1 }}</td>
            <td>{{ item.cz2 }}</td>
          </tr>
        </table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { questionnaireContent } from '@/utils/questionnaireData.js'
import { questionnairegetQn } from '@/api/usergl'
export default {
  data() {
    return {
      tabData: questionnaireContent,
      dialogVisible: false,
      username: '',
      pushIndex: [{
        name: '按时就诊率',
        cz1: '',
        cz2: '',
        method: [4, 3]
      }, {
        name: '预约专家号的患者按时就诊率',
        cz1: '',
        cz2: '',
        method: [5, 6]
      }, {
        name: '预约普通号的患者按时就诊率',
        cz1: '',
        cz2: '',
        method: [8, 7]
      }, {
        name: '门诊智慧结算率',
        cz1: '',
        cz2: '',
        method: [16, 15]
      }, {
        name: '门诊诊间结算率',
        cz1: '',
        cz2: '',
        method: [17, 5]
      }, {
        name: '门诊自助结算率',
        cz1: '',
        cz2: '',
        method: [18, 15]
      }, {
        name: '门诊移动终端进支付结算率',
        cz1: '',
        cz2: '',
        method: [19, 15]
      }, {
        name: '病房智慧结算率',
        cz1: '',
        cz2: '',
        method: [23, 22]
      }, {
        name: '病区（床边）结算笔率',
        cz1: '',
        cz2: '',
        method: [24, 22]
      }, {
        name: '病房自助结算笔率',
        cz1: '',
        cz2: '',
        method: [25, 22]
      }, {
        name: '病房移动终端支付结算率',
        cz1: '',
        cz2: '',
        method: [26, 22]
      }, {
        name: '电子发票使用率',
        cz1: '',
        cz2: '',
        method: [29, 28]
      }, {
        name: '发票自助打印率',
        cz1: '',
        cz2: '',
        method: [30, 28]
      }, {
        name: '检查智慧预约率',
        cz1: '',
        cz2: '',
        method: [37, 36]
      }, {
        name: '检查诊间预约率',
        cz1: '',
        cz2: '',
        method: [38, 36]
      }, {
        name: '检查集中预约率',
        cz1: '',
        cz2: '',
        method: [39, 36]
      }]
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    showModule(param) {
      // 显示
      this.dialogVisible = true
      this.username = param.username
      const obj = {
        userId: param.id
      }
      this.questionnairegetQnApi(obj)
    },
    questionnairegetQnApi(obj) {
      // 获取问卷
      questionnairegetQn(obj).then(res => {
        const data = res.data
        if (data.questionnaire.content) {
          // 已填写问卷，就要回显相关填写内容
          if (data.questionnaire.content.status === '0') {
            // 暂存，是可以编辑数据，回显数据
            this.echoData(this.tabData, data.questionnaire.content, true)
          } else {
            // 已提交是不可以编辑数据，只支持回显
            this.echoData(this.tabData, data.questionnaire.content, true)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    echoData(targetData, sourceData, disabled) {
      let itemIndex = 0
      for (let i = 0; i < targetData.length; i++) {
        for (let j = 0; j < targetData[i]['child']['mm'].length; j++) {
          targetData[i]['child']['cz1'][j].value = sourceData['2018']['field' + itemIndex]
          targetData[i]['child']['cz2'][j].value = sourceData['2019']['field' + itemIndex]
          itemIndex++
        }
      }
      for (let k = 0; k < this.pushIndex.length; k++) {
        this.pushIndex[k]['cz1'] = sourceData['2018']['field' + this.pushIndex[k]['method'][1]] ? ((sourceData['2018']['field' + this.pushIndex[k]['method'][0]] * 100 / sourceData['2018']['field' + this.pushIndex[k]['method'][1]]).toFixed(2) + '%') : '0%'
        this.pushIndex[k]['cz2'] = sourceData['2019']['field' + this.pushIndex[k]['method'][1]] ? ((sourceData['2019']['field' + this.pushIndex[k]['method'][0]] * 100 / sourceData['2019']['field' + this.pushIndex[k]['method'][1]]).toFixed(2) + '%') : '0%'
      }
    },
    exportExcel() {
      // 导出excel表格
      this.tableToExcel()
    },
    tableToExcel() {
      const worksheet = this.username
      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset='UTF-8'><!--[if gte mso 9]><xml>
        <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style type="text/css">
            table {border: 1px solid #000000;}
            table tr td b {background:#FFFFFF;color:#3D3D3D;font-size:24px;border: 1px solid #000000;}
            table th {background:#AEE1FE;color:#3D3D3D;font-size:20px;border: 1px solid #000000;}
            table td {background:#FFFFFF;color:#3D3D3D;font-size:20px;border: 1px solid #000000;}</style>
        </head><body><table>${document.getElementById('wtable').outerHTML}</table></body></html>`
      // 创建一个Blob对象，第一个参数是文件的数据，第二个参数是文件类型属性对象
      const blob = new Blob([template], { type: 'application/vnd.ms-excel' })
      const a = document.createElement('a')
      // 利用URL的createObjectURL方法为元素a生成blobURL
      a.href = URL.createObjectURL(blob)
      // 设置文件名
      a.download = this.username + '调查问卷.xlsx'
      a.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.answerSheet {
  width: 100%;
  margin: 0px auto 40px;
  position: relative;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .basicinfor {
    color: #409EFF;
    position: absolute;
    right: 0px;
    top: 30px;
    font-size: 12px;
    cursor: pointer;
  }
}
.w-table {
  border-bottom: 1px solid #ebeef5;
  // table-layout: fixed;
  // border-collapse: separate;
  tr {
    th {
      padding: 10px 0px;
      text-align: center;
    }
    &>th:not(:last-child) {
      border-top: 1px solid #ebeef5;
      border-left: 1px solid #ebeef5;
    }
    &>th:last-child {
      border-top: 1px solid #ebeef5;
      border-left: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
    }
    & > td {
      border-top: 1px solid #ebeef5;
      border-left: 1px solid #ebeef5;
      padding: 10px 5px;
      font-size: 14px;
      .w-input {
        width: 100px;
      }
    }
    & > td:last-child {
      border-right: 1px solid #ebeef5;
    }
  }
}
.title img {
  width: 30px;
  margin-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
