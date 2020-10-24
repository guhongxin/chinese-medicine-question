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
import { questionnaireContent, scoreContent } from '@/utils/questionnaireData.js'
import { questionnairegetQn } from '@/api/usergl'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tabData: questionnaireContent,
      dialogVisible: false,
      username: '',
      pushIndex: scoreContent
    }
  },
  methods: {
    handleClose() {
      this.userId = null
      this.username = null
      this.dialogVisible = false
    },
    showModule(param) {
      // 显示
      this.dialogVisible = true
      this.username = param.organization_name
      this.userId = param.id
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
    exportExcel() {
      // 导出excel表格
      this.doExport()
    },
    doExport() {
      require.ensure([], () => { // 用 webpack Code Splitting xlsl还是很大的
        const tHeader = ['', '指标名称', '2018年内容', '2019年内容'] // excel 表格头
        questionnairegetQn({
          userId: this.userId
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
                _list[2] = content ? (content['2018']['field' + itemIndex] + '').replace(/,$/g, '') : ''
                _list[3] = content ? (content['2019']['field' + itemIndex] + '').replace(/,$/g, '') : ''
              }
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
          XLSX.writeFile(wb, `${this.username}调查问卷.xlsx`)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    echoData(targetData, sourceData, disabled) {
      let itemIndex = 0
      for (let i = 0; i < targetData.length; i++) {
        for (let j = 0; j < targetData[i]['child']['mm'].length; j++) {
          if (targetData[i]['child']['cz1'][j]['type'] === 5) {
            const _value = sourceData['2018']['field' + itemIndex]
            const _child = targetData[i]['child']['cz1'][j]['child']
            const childValue = _value.split(',')
            let result = ''
            for (let kkmm = 0; kkmm < childValue.length; kkmm++) {
              if (childValue[kkmm]) {
                result += `${_child[kkmm].qzLable}${childValue[kkmm]}${_child[kkmm].unit},`
              }
            }
            targetData[i]['child']['cz1'][j].value = result.replace(/,$/g, '')
          } else {
            targetData[i]['child']['cz1'][j].value = (sourceData['2018']['field' + itemIndex] + '').replace(/,$/g, '')
          }
          if (targetData[i]['child']['cz2'][j]['type'] === 5) {
            const _value = sourceData['2019']['field' + itemIndex]
            const _child = targetData[i]['child']['cz2'][j]['child']
            const childValue = _value.split(',')
            let result = ''
            for (let kkmm = 0; kkmm < childValue.length; kkmm++) {
              if (childValue[kkmm]) {
                result += `${_child[kkmm].qzLable}${childValue[kkmm]}${_child[kkmm].unit},`
              }
            }
            targetData[i]['child']['cz2'][j].value = result.replace(/,$/g, '')
          } else {
            targetData[i]['child']['cz2'][j].value = (sourceData['2019']['field' + itemIndex] + '').replace(/,$/g, '')
          }
          itemIndex++
        }
      }
      for (let k = 0; k < this.pushIndex.length; k++) {
        this.pushIndex[k]['cz1'] = sourceData['2018']['field' + this.pushIndex[k]['method'][1]] ? ((sourceData['2018']['field' + this.pushIndex[k]['method'][0]] * 100 / sourceData['2018']['field' + this.pushIndex[k]['method'][1]]).toFixed(2) + '%') : '0%'
        this.pushIndex[k]['cz2'] = sourceData['2019']['field' + this.pushIndex[k]['method'][1]] ? ((sourceData['2019']['field' + this.pushIndex[k]['method'][0]] * 100 / sourceData['2019']['field' + this.pushIndex[k]['method'][1]]).toFixed(2) + '%') : '0%'
      }
    }
    // exportExcel() {
    //   // 导出excel表格
    //   this.tableToExcel()
    // },
    // tableToExcel() {
    //   const worksheet = this.username
    //   const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset='UTF-8'><!--[if gte mso 9]><xml>
    //     <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    //     <x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    //     <style type="text/css">
    //         table {border: 1px solid #000000;}
    //         table tr td b {background:#FFFFFF;color:#3D3D3D;font-size:24px;border: 1px solid #000000;}
    //         table th {background:#AEE1FE;color:#3D3D3D;font-size:20px;border: 1px solid #000000;}
    //         table td {background:#FFFFFF;color:#3D3D3D;font-size:20px;border: 1px solid #000000;}</style>
    //     </head><body><table>${document.getElementById('wtable').outerHTML}</table></body></html>`
    //   // 创建一个Blob对象，第一个参数是文件的数据，第二个参数是文件类型属性对象
    //   const blob = new Blob([template], { type: 'application/vnd.ms-excel' })
    //   const a = document.createElement('a')
    //   // 利用URL的createObjectURL方法为元素a生成blobURL
    //   a.href = URL.createObjectURL(blob)
    //   // 设置文件名
    //   a.download = this.username + '调查问卷.xlsx'
    //   a.click()
    // }
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
