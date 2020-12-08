<template>
  <div class="answerSheet">
    <div class="basicinfor">
      <div @click="seeBasicInfor">基本信息</div>
      <div class="login-out" @click="loginOut">[退出]</div>
    </div>
    <div class="title-box">
      <div class="title">
        问卷
        <a href="../../../pdf/中医互联网指标说明.pdf" download="中医互联网指标说明.pdf" class="sms">
          <i class="el-icon-download" />
          问卷选项说明
        </a>
      </div>
    </div>
    <baseInforDailog ref="baseInforDoc" />
    <table class="w-table" cellspacing="0" style="width:100%;">
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
            <el-input
              v-if="item.child.cz1[index].type === 0"
              v-model="item.child.cz1[index].value"
              :disabled="item.child.cz1[index].disabled"
              size="small"
              @change="(val) => inputChange(val, item.child.cz1[index], item.child.cz1, 2)"
            />
            <template v-else-if="item.child.cz1[index].type === 1">
              <el-checkbox-group v-model="item.child.cz1[index].value" :disabled="item.child.cz1[index].disabled">
                <el-checkbox
                  v-for="(option, key1) in item.child.cz1[index].options"
                  :key="key1"
                  :label="option"
                />
              </el-checkbox-group>
              <el-input v-if="item.child.cz1[index].value.indexOf('其它') !== -1" v-model="item.child.cz1[index].valueInput" :disabled="item.child.cz1[index].disabled" size="small" style="margin-top: 5px;" />
            </template>
            <template v-else-if="item.child.cz1[index].type === 3">
              <el-select v-model="item.child.cz1[index].value" placeholder="请选择" size="small" :disabled="item.child.cz1[index].disabled">
                <el-option
                  v-for="(option, key1) in item.child.cz1[index].options"
                  :key="key1"
                  :label="option"
                  :value="option"
                />
              </el-select>
              <el-input v-if="item.child.cz1[index].value === '其它'" v-model="item.child.cz1[index].valueInput" :disabled="item.child.cz1[index].disabled" size="small" style="margin-top: 5px;" />
            </template>
            <div v-else-if="item.child.cz1[index].type === 4">{{ item.child.cz1[index].value }}</div>
            <div v-else-if="item.child.cz1[index].type === 5" class="colDivRow">
              <div
                v-for="(colRow, colRowIndex) in item.child.cz1[index].child"
                :key="colRowIndex"
                class="div-row"
              >
                {{ colRow.qzLable }}
                <el-input
                  v-if="colRow.type === 0"
                  v-model="colRow.value"
                  :disabled="colRow.disabled"
                  size="small"
                  class="hzInput"
                  style="width:40%;vertical-align: super;"
                />{{ colRow.unit }}
              </div>
            </div>
            <el-radio-group v-else v-model="item.child.cz1[index].value" :disabled="item.child.cz1[index].disabled">
              <el-radio label="是" @click.native.prevent="radioChange('是', item.child.cz1[index], 'value', item.child.cz1, [1, 2])" />
              <el-radio label="否" @click.native.prevent="radioChange('否', item.child.cz1[index], 'value', item.child.cz1, [1, 2])" />
            </el-radio-group>
          </td>
          <td>
            <el-input
              v-if="item.child.cz2[index].type === 0"
              v-model="item.child.cz2[index].value"
              :disabled="item.child.cz2[index].disabled"
              size="small"
              @change="(val) => inputChange(val, item.child.cz2[index], item.child.cz2, 2)"
            />
            <template v-else-if="item.child.cz2[index].type === 1">
              <el-checkbox-group v-model="item.child.cz2[index].value" :disabled="item.child.cz2[index].disabled">
                <el-checkbox
                  v-for="(option, key1) in item.child.cz2[index].options"
                  :key="key1"
                  :label="option"
                />
              </el-checkbox-group>
              <el-input v-if="item.child.cz2[index].value.indexOf('其它') !== -1" v-model="item.child.cz2[index].valueInput" :disabled="item.child.cz2[index].disabled" size="small" style="margin-top: 5px;" />
            </template>
            <template v-else-if="item.child.cz2[index].type === 3">
              <el-select v-model="item.child.cz2[index].value" placeholder="请选择" size="small" :disabled="item.child.cz2[index].disabled">
                <el-option
                  v-for="(option, key1) in item.child.cz2[index].options"
                  :key="key1"
                  :label="option"
                  :value="option"
                />
              </el-select>
              <el-input v-if="item.child.cz2[index].value === '其它'" v-model="item.child.cz2[index].valueInput" :disabled="item.child.cz2[index].disabled" size="small" style="margin-top: 5px;" />
            </template>
            <div v-else-if="item.child.cz2[index].type === 4">{{ item.child.cz2[index].value }}</div>
            <div v-else-if="item.child.cz2[index].type === 5" class="colDivRow">
              <div
                v-for="(colRow, colRowIndex) in item.child.cz2[index].child"
                :key="colRowIndex"
                class="div-row"
              >
                {{ colRow.qzLable }}
                <el-input
                  v-if="colRow.type === 0"
                  v-model="colRow.value"
                  :disabled="colRow.disabled"
                  size="small"
                  class="hzInput"
                  style="width:40%;vertical-align: super;"
                />{{ colRow.unit }}
              </div>
            </div>
            <el-radio-group v-else v-model="item.child.cz2[index].value" :disabled="item.child.cz2[index].disabled">
              <el-radio label="是" @click.native.prevent="radioChange('是', item.child.cz2[index], 'value', item.child.cz2, [1, 2])" />
              <el-radio label="否" @click.native.prevent="radioChange('否', item.child.cz2[index], 'value', item.child.cz2, [1, 2])" />
            </el-radio-group>
          </td>
        </tr>
      </template>
    </table>
    <div v-if="questionEditStatus" class="footer">
      <el-button type="primary" class="w-btn" :loading="loading0" @click="temporaryStorage">暂存</el-button>
      <el-button type="primary" class="w-btn" :loading="loading1" @click="submite">提交</el-button>
    </div>
    <div v-if="questionEditStatus" class="zc-save" @click="temporaryStorage">
      <el-tooltip class="item" effect="dark" content="暂存" placement="top">
        <img src="../../assets/img/save.png">
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import baseInforDailog from './popup/baseInforDailog'
import { questionnaireContent } from '@/utils/questionnaireData.js'
import { questionnairegetQn, questionnaireSaveQn, organizationGetOz } from '@/api/usergl'
import { getCookie } from '@/utils/auth'
// import { constantRoutes } from '@/router'
export default {
  components: {
    baseInforDailog
  },
  data() {
    return {
      tabData: questionnaireContent,
      loading0: false,
      loading1: false,
      questionEditStatus: true, // true 编辑状态 false 禁用编辑
      annualOutpatientNum: 0
    }
  },
  mounted() {
    this.userId = getCookie('userId')
    this.organizationGetOzApi({
      userId: this.userId
    })
    this.questionnairegetQnApi()
  },
  methods: {
    seeBasicInfor() {
      this.$refs.baseInforDoc.showModule()
    },
    temporaryStorage() {
      // 暂存
      const _result = this.statisticalData(this.tabData)
      const isverifyData = this.verifyData(_result)
      console.log('isverifyData', isverifyData)
      if (!isverifyData) {
        return false
      }
      const obj = Object.assign({}, {
        userId: this.userId,
        status: '0'
      }, _result)
      this.questionnaireSaveQnApi(obj, 'loading0')
    },
    submite() {
      // 提交
      this.$confirm('提交后不可修改，请确认全部填写完成后再提交!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _result = this.statisticalData(this.tabData)
        const isverifyData = this.verifyData(_result)
        console.log('isverifyData', isverifyData)
        if (!isverifyData) {
          return false
        }
        const obj = Object.assign({}, {
          userId: this.userId,
          status: '1'
        }, _result)
        this.questionnaireSaveQnApi(obj, 'loading1')
      }).catch(() => {
        return false
      })
    },
    statisticalData(param) {
      // 提取问卷结果
      let itemIndex = 0
      const result = {
        '2018': {},
        '2019': {}
      }
      for (let i = 0; i < param.length; i++) {
        for (let j = 0; j < param[i]['child']['mm'].length; j++) {
          // 2018
          if (param[i]['child']['cz1'][j].type === 1) {
            // 类型为1，多选判断是否选选中其它， 如果选中其它需要把其它替换成输入内容
            const otherIndex = param[i]['child']['cz1'][j].value.findIndex(item => item === '其它')
            if (otherIndex !== -1) {
              const _checkValue = JSON.parse(JSON.stringify(param[i]['child']['cz1'][j].value))
              _checkValue.splice(otherIndex, 1)
              const _value = _checkValue.join(',') + ',' + param[i]['child']['cz1'][j].valueInput
              result['2018']['field' + itemIndex] = _value.replace(/(^,|,$)/g, '')
            } else {
              result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value.join(',')
            }
          } else if (param[i]['child']['cz1'][j].type === 3) {
            // 下拉 选择不为其它，为下拉选项， 如果是其它 就取输入值
            if (param[i]['child']['cz1'][j].value !== '其它') {
              result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value
            } else {
              result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].valueInput
            }
          } else if (param[i]['child']['cz1'][j].type === 5) {
            const _value = param[i]['child']['cz1'][j].child.reduce((total, item) => {
              total.push(item.value || '')
              return total
            }, [])
            result['2018']['field' + itemIndex] = _value.join(',')
          } else {
            result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value
          }
          // 2019
          if (param[i]['child']['cz2'][j].type === 1) {
            // 类型为1，多选判断是否选选中其它， 如果选中其它需要把其它替换成输入内容
            const otherIndex = param[i]['child']['cz2'][j].value.findIndex(item => item === '其它')
            if (otherIndex !== -1) {
              const _checkValue = JSON.parse(JSON.stringify(param[i]['child']['cz2'][j].value))
              _checkValue.splice(otherIndex, 1)
              const _value = _checkValue.join(',') + ',' + param[i]['child']['cz2'][j].valueInput
              result['2019']['field' + itemIndex] = _value.replace(/(^,|,$)/g, '')
            } else {
              result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].value.join(',')
            }
          } else if (param[i]['child']['cz2'][j].type === 3) {
            // 下拉 选择不为其它，为下拉选项， 如果是其它 就取输入值
            if (param[i]['child']['cz2'][j].value !== '其它') {
              result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].value
            } else {
              result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].valueInput
            }
          } else if (param[i]['child']['cz2'][j].type === 5) {
            const _value = param[i]['child']['cz2'][j].child.reduce((total, item) => {
              total.push(item.value || '')
              return total
            }, [])
            result['2019']['field' + itemIndex] = _value.join(',')
          } else {
            result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].value
          }
          // const isStrcz1 = param[i]['child']['cz1'][j].type === 1
          // result['2018']['field' + itemIndex] = isStrcz1 ? param[i]['child']['cz1'][j].value.join(',') : param[i]['child']['cz1'][j].value
          // const isStrcz2 = param[i]['child']['cz2'][j].type === 1
          // result['2019']['field' + itemIndex] = isStrcz2 ? param[i]['child']['cz2'][j].value.join(',') : param[i]['child']['cz2'][j].value
          itemIndex++
        }
      }
      return result
    },
    questionnairegetQnApi() {
      // 获取问卷
      const obj = {
        userId: this.userId
      }
      questionnairegetQn(obj).then(res => {
        const data = res.data
        if (data.questionnaire.content) {
          // 已填写问卷，就要回显相关填写内容
          if (data.questionnaire.content.status === '0') {
            // 暂存，是可以编辑数据，回显数据
            this.echoData(this.tabData, data.questionnaire.content)
            this.questionEditStatus = true
          } else {
            // 已提交是不可以编辑数据，只支持回显
            this.questionEditStatus = false
            this.echoData(this.tabData, data.questionnaire.content, true)
          }
        } else {
          this.questionEditStatus = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    questionnaireSaveQnApi(param, btnLoading) {
      const msg = param.status === '0' ? '暂存文档成功' : '文档提交成功'
      this[btnLoading] = true
      questionnaireSaveQn(param).then(res => {
        this.$message({
          type: 'success',
          message: msg
        })
        this[btnLoading] = false
        if (param.status === '1') {
          // 提交重新获取文档信息
          this.questionnairegetQnApi()
        }
      }).catch(err => {
        console.log(err)
        this[btnLoading] = false
      })
    },
    echoData(targetData, sourceData, disabled) {
      let itemIndex = 0
      for (let i = 0; i < targetData.length; i++) {
        for (let j = 0; j < targetData[i]['child']['mm'].length; j++) {
          // 2018
          if (targetData[i]['child']['cz1'][j].type === 1) {
            // 多选， 将字符串变成数组
            const _options = targetData[i]['child']['cz1'][j].options
            const _value = sourceData['2018']['field' + itemIndex].split(',')
            // 查找并集和交集 intersectionSet[0] 交集 intersectionSet[1] 差集
            // 如果差集长度大于0 说明选中其它项 如果等于零说明未选中其它项
            const intersectionSet = _value.reduce((total, item) => {
              const has = _options.indexOf(item)
              if (has !== -1) {
                total[0].push(item)
              } else {
                if (item) {
                  total[1].push(item)
                }
              }
              return total
            }, [[], []])
            // 查找差集
            if (intersectionSet[1].length > 0) {
              intersectionSet[0].push('其它')
            }
            targetData[i]['child']['cz1'][j].value = intersectionSet[0]
            targetData[i]['child']['cz1'][j].valueInput = intersectionSet[1].join(',')
          } else if (targetData[i]['child']['cz1'][j].type === 3) {
            // 下拉 判断值是否是其它
            const _options = JSON.parse(JSON.stringify(targetData[i]['child']['cz1'][j].options))
            const otherIndex = _options.findIndex(item => item === '其它')
            _options.splice(otherIndex, 1)
            if (_options.indexOf(sourceData['2018']['field' + itemIndex]) !== -1) {
              // 不是其它
              targetData[i]['child']['cz1'][j].value = sourceData['2018']['field' + itemIndex]
            } else {
              // 是其它
              targetData[i]['child']['cz1'][j].value = '其它'
              targetData[i]['child']['cz1'][j].valueInput = sourceData['2018']['field' + itemIndex]
            }
          } else if (targetData[i]['child']['cz1'][j].type === 5) {
            const _value = sourceData['2018']['field' + itemIndex]
            const childValue = _value.split(',')
            for (let kkmm = 0; kkmm < childValue.length; kkmm++) {
              targetData[i]['child']['cz1'][j]['child'][kkmm]['value'] = childValue[kkmm]
              targetData[i]['child']['cz1'][j]['child'][kkmm]['disabled'] = disabled
            }
          } else {
            // 输入 或者单选直接等于
            targetData[i]['child']['cz1'][j].value = sourceData['2018']['field' + itemIndex]
            if (targetData[i]['child']['mm'][j] === '是否实现“两卡融合”') {
              if (targetData[i]['child']['cz1'][j].value === '否') {
                // 是否实现“两卡融合” 如果是否 健康医保卡使用人次禁用
                targetData[i]['child']['cz1'][j + 1].disabled = true
              }
            }
          }
          if (disabled) {
            targetData[i]['child']['cz1'][j].disabled = disabled
          }

          if (targetData[i]['child']['cz2'][j].type === 1) {
            // 多选， 将字符串变成数组
            const _options = targetData[i]['child']['cz2'][j].options
            const _value = sourceData['2019']['field' + itemIndex].split(',')
            // 查找并集和交集 intersectionSet[0] 交集 intersectionSet[1] 差集
            // 如果差集长度大于0 说明选中其它项 如果等于零说明未选中其它项
            const intersectionSet = _value.reduce((total, item) => {
              const has = _options.indexOf(item)
              if (has !== -1) {
                total[0].push(item)
              } else {
                if (item) {
                  total[1].push(item)
                }
              }
              return total
            }, [[], []])
            // 查找差集
            if (intersectionSet[1].length > 0) {
              intersectionSet[0].push('其它')
            }
            targetData[i]['child']['cz2'][j].value = intersectionSet[0]
            targetData[i]['child']['cz2'][j].valueInput = intersectionSet[1].join(',')
          } else if (targetData[i]['child']['cz2'][j].type === 3) {
            // 下拉 判断值是否是其它
            const _options = JSON.parse(JSON.stringify(targetData[i]['child']['cz2'][j].options))
            const otherIndex = _options.findIndex(item => item === '其它')
            _options.splice(otherIndex, 1)
            if (_options.indexOf(sourceData['2019']['field' + itemIndex]) !== -1) {
              // 不是其它
              targetData[i]['child']['cz2'][j].value = sourceData['2019']['field' + itemIndex]
            } else {
              // 是其它
              targetData[i]['child']['cz2'][j].value = '其它'
              targetData[i]['child']['cz2'][j].valueInput = sourceData['2019']['field' + itemIndex]
            }
          } else if (targetData[i]['child']['cz2'][j].type === 5) {
            const _value = sourceData['2019']['field' + itemIndex]
            const childValue = _value.split(',')
            for (let kkmm = 0; kkmm < childValue.length; kkmm++) {
              targetData[i]['child']['cz2'][j]['child'][kkmm]['value'] = childValue[kkmm]
              targetData[i]['child']['cz2'][j]['child'][kkmm]['disabled'] = disabled
            }
          } else {
            // 输入 或者单选直接等于
            targetData[i]['child']['cz2'][j].value = sourceData['2019']['field' + itemIndex]
            if (targetData[i]['child']['mm'][j] === '是否实现“两卡融合”') {
              if (targetData[i]['child']['cz2'][j].value === '否') {
                // 是否实现“两卡融合” 如果是否 健康医保卡使用人次禁用
                targetData[i]['child']['cz2'][j + 1].disabled = true
              }
            }
          }
          if (disabled) {
            targetData[i]['child']['cz2'][j].disabled = disabled
          }
          // const toArr1 = targetData[i]['child']['cz1'][j].type === 1
          // targetData[i]['child']['cz1'][j].value = toArr1 ? sourceData['2018']['field' + itemIndex].split(',') : sourceData['2018']['field' + itemIndex]
          // targetData[i]['child']['cz1'][j].disabled = disabled
          // const toArr2 = targetData[i]['child']['cz2'][j].type === 1
          // targetData[i]['child']['cz2'][j].value = toArr2 ? sourceData['2019']['field' + itemIndex].split(',') : sourceData['2019']['field' + itemIndex]
          // targetData[i]['child']['cz2'][j].disabled = disabled
          itemIndex++
        }
      }
    },
    radioChange(val, obj, val2, obj1, fieldIndex) {
      // 如果选择了否，禁用健康医保卡使用人次field10 disabled
      if (val === obj[val2]) {
        this.$set(obj, val2, '')
        if (obj.rowName === '门诊预约') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
          this.$set(obj1[7], 'disabled', false)
          this.$set(obj1[8], 'disabled', false)
        }
        if (obj.rowName === '浙里办健康医保卡') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
        }
        if (obj.rowName === '门诊结算') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
        }
        if (obj.rowName === '病房结算') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
        }
        if (obj.rowName === '电子发票') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
        }
        // this.$set(obj1[fieldIndex[0]], 'disabled', false)
        return false
      }
      if (val === '否') {
        if (obj.rowName === '门诊预约') {
          // 门诊预约，后面的6位不能选中
          this.$set(obj1[1], 'disabled', true)
          this.$set(obj1[3], 'disabled', true)
          this.$set(obj1[4], 'disabled', true)
          this.$set(obj1[5], 'disabled', true)
          this.$set(obj1[6], 'disabled', true)
          this.$set(obj1[7], 'disabled', true)
          this.$set(obj1[8], 'disabled', true)
          this.$set(obj1[1], 'value', [])
          this.$set(obj1[3], 'value', '')
          this.$set(obj1[4], 'value', '')
          this.$set(obj1[5], 'value', '')
          this.$set(obj1[6], 'value', '')
          this.$set(obj1[7], 'value', '')
          this.$set(obj1[8], 'value', '')
        }
        if (obj.rowName === '浙里办健康医保卡') {
          this.$set(obj1[1], 'disabled', true)
          this.$set(obj1[2], 'disabled', true)
          this.$set(obj1[1], 'value', '')
          this.$set(obj1[2], 'value', '')
        }
        if (obj.rowName === '门诊结算') {
          // 门诊结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', true)
          this.$set(obj1[2], 'disabled', true)
          this.$set(obj1[3], 'disabled', true)
          this.$set(obj1[4], 'disabled', true)
          this.$set(obj1[5], 'disabled', true)
          this.$set(obj1[6], 'disabled', true)
          this.$set(obj1[1], 'value', [])
          this.$set(obj1[2], 'value', '')
          this.$set(obj1[3], 'value', '')
          this.$set(obj1[4], 'value', '')
          this.$set(obj1[5], 'value', '')
          this.$set(obj1[6], 'value', '')
        }
        if (obj.rowName === '病房结算') {
          // 门诊结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', true)
          this.$set(obj1[2], 'disabled', true)
          this.$set(obj1[3], 'disabled', true)
          this.$set(obj1[4], 'disabled', true)
          this.$set(obj1[5], 'disabled', true)
          this.$set(obj1[6], 'disabled', true)
          this.$set(obj1[1], 'value', [])
          this.$set(obj1[2], 'value', '')
          this.$set(obj1[3], 'value', '')
          this.$set(obj1[4], 'value', '')
          this.$set(obj1[5], 'value', '')
          this.$set(obj1[6], 'value', '')
        }
        if (obj.rowName === '电子发票') {
          // 门诊结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', true)
          this.$set(obj1[2], 'disabled', true)
          this.$set(obj1[3], 'disabled', true)
          this.$set(obj1[4], 'disabled', true)
          this.$set(obj1[1], 'value', '')
          this.$set(obj1[2], 'value', '')
          this.$set(obj1[3], 'value', '')
          this.$set(obj1[4], 'value', '')
        }
        // this.$set(obj1[fieldIndex[0]], 'disabled', true)
        // this.$set(obj1[fieldIndex[0]], 'value', '')
        // this.$set(obj1[fieldIndex[1]], 'value', '')
      } else {
        if (obj.rowName === '门诊预约') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
          this.$set(obj1[7], 'disabled', false)
          this.$set(obj1[8], 'disabled', false)
        }
        if (obj.rowName === '浙里办健康医保卡') {
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
        }
        if (obj.rowName === '门诊结算') {
          // 门诊结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
        }
        if (obj.rowName === '病房结算') {
          // 病房结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
          this.$set(obj1[5], 'disabled', false)
          this.$set(obj1[6], 'disabled', false)
        }
        if (obj.rowName === '电子发票') {
          // 门诊结算，后面的6位不能选中
          this.$set(obj1[1], 'disabled', false)
          this.$set(obj1[2], 'disabled', false)
          this.$set(obj1[3], 'disabled', false)
          this.$set(obj1[4], 'disabled', false)
        }
        // this.$set(obj1[fieldIndex[0]], 'disabled', false)
      }
      this.$set(obj, val2, val)
    },
    inputChange(val, item, obj, fieldIndex) {
      // 监听type=0 改变事件
      // 健康医保卡使用人次输入框改变， 计算健康医保卡使用占就诊人次比例 / 其中年门诊量
      if (item.rowName === '健康医保卡使用人次') {
        const ratio = this.annualOutpatientNum ? (Number(val) * 100 / this.annualOutpatientNum).toFixed(2) : 0
        this.$set(obj[fieldIndex], 'value', `${ratio}%`)
      }
      // 计算网上预约人数总和
      if (item.rowName === '网上预约人次数') {
        const total = Number(obj['5']['value']) + Number(obj['7']['value']) + ''
        this.$set(obj['3'], 'value', total)
      }
      // 计算门诊智慧结算笔数总和
      if (item.rowName === '门诊智慧结算笔数') {
        const total = Number(obj['4']['value']) + Number(obj['5']['value']) + Number(obj['6']['value']) + ''
        this.$set(obj['3'], 'value', total)
      }
      // 计算病房智慧结算笔数总和
      if (item.rowName === '病房智慧结算笔数') {
        const total = Number(obj['4']['value']) + Number(obj['5']['value']) + ''
        this.$set(obj['3'], 'value', total)
      }
      // 计算病房智慧结算笔数总和
      if (item.rowName === '检查智慧预约人次数') {
        const total = Number(obj['3']['value']) + Number(obj['4']['value']) + Number(obj['5']['value']) + ''
        this.$set(obj['2'], 'value', total)
      }
    },
    async loginOut() {
      // 退出
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    verifyData(param) {
      const verify = ['2018', '2019']
      let result = true
      for (const key of verify) {
        const _data = param[key]
        if (Number(_data.field4) > Number(_data.field3)) {
          this.warnts('预约患者按时就诊人次数<=网上预约人次数')
          result = false
          return false
        }
        // if (Number(_data.field3) !== Number(_data.field5) + Number(_data.field7)) {
        //   this.warnts('网上预约人次数=网上预约专家号人次数+网上预约普通号人次数')
        //   return false
        // }
        if (Number(_data.field6) > Number(_data.field5)) {
          this.warnts('预约专家号的患者按时就诊人次数<=网上预约专家号人次数')
          result = false
          return false
        }
        if (Number(_data.field8) > Number(_data.field7)) {
          this.warnts('预约普通号的患者按时就诊人次数<=网上预约普通号人次数')
          result = false
          return false
        }
        if (Number(_data.field16) > Number(_data.field15)) {
          this.warnts('门诊智慧结算笔数<=门诊总结算笔数')
          result = false
          return false
        }
        // if (Number(_data.field16) !== Number(_data.field17) + Number(_data.field18)) {
        //   this.warnts('门诊智慧结算笔数=门诊诊间结算笔数+门诊自助结算笔数')
        //   return false
        // }
        if (Number(_data.field19) > Number(_data.field15)) {
          this.warnts('门诊通过移动终端进行支付的结算笔数<=门诊总结算笔数')
          result = false
          return false
        }
        if (Number(_data.field23) > Number(_data.field22)) {
          this.warnts('病房智慧结算笔数<=病房总结算笔数')
          result = false
          return false
        }
        // if (Number(_data.field23) !== Number(_data.field24) + Number(_data.field25)) {
        //   this.warnts('病房智慧结算笔数=病区（床边）结算笔数+病房自助结算笔数')
        //   return false
        // }
        if (Number(_data.field24) > Number(_data.field23)) {
          this.warnts('病区（床边）结算笔数<=病房智慧结算笔数')
          result = false
          return false
        }
        if (Number(_data.field25) > Number(_data.field23)) {
          this.warnts('病房自助结算笔数<=病房智慧结算笔数')
          result = false
          return false
        }
        if (Number(_data.field26) > Number(_data.field23)) {
          this.warnts('病房通过移动终端进行支付的结算笔数<=病房智慧结算笔数')
          result = false
          return false
        }
        if (Number(_data.field29) > Number(_data.field28)) {
          this.warnts('电子发票生成数<=发票总开票数（包括电子发票生成数）')
          result = false
          return false
        }
        if (Number(_data.field30) > Number(_data.field28)) {
          this.warnts('电子发票生成数<=发票总开票数（包括电子发票生成数）')
          result = false
          return false
        }
        if (Number(_data.field31) > Number(_data.field28)) {
          this.warnts('电子发票生成数<=发票总开票数（包括电子发票生成数）')
          result = false
          return false
        }
        if (Number(_data.field37) > Number(_data.field36)) {
          this.warnts('检查智慧预约人次数<=检查预约人次数')
          result = false
          return false
        }
        // if (Number(_data.field37) !== Number(_data.field38) + Number(_data.field39) + Number(_data.field40)) {
        //   this.warnts('检查智慧预约人次数=检查诊间预约人次数+检查集中预约人次数+检查自助预约人次数')
        //   return false
        // }
        if (Number(_data.field38) > Number(_data.field37)) {
          this.warnts('检查诊间预约人次数<=检查智慧预约人次数')
          result = false
          return false
        }
        if (Number(_data.field39) > Number(_data.field37)) {
          this.warnts('检查集中预约人次数<=检查智慧预约人次数')
          result = false
          return false
        }
        if (Number(_data.field40) > Number(_data.field37)) {
          this.warnts('检查自助预约人次数<=检查智慧预约人次数')
          result = false
          return false
        }
        if (Number(_data.field41) > Number(_data.field37)) {
          this.warnts('预约患者按时检查人次数<=检查智慧预约人次数')
          result = false
          return false
        }
        if (Number(_data.field42) > Number(_data.field37)) {
          this.warnts('分时段检查预约人次数<=检查智慧预约人次数')
          result = false
          return false
        }
        if (Number(_data.field53) > Number(_data.field52)) {
          this.warnts('其中中医护理例数<=网上门诊服务例数')
          result = false
          return false
        }
        if (Number(_data.field56) > Number(_data.field52)) {
          this.warnts('中医护理回访人次数<=网上门诊服务例数')
          result = false
          return false
        }
        if (Number(_data.field61) > Number(_data.field5)) {
          this.warnts('名中医就诊人次数<=网上预约专家号人次数')
          result = false
          return false
        }
        // if (Number(_data.field60) > Number(_data.field61)) {
        //   this.warnts('网上预约名中医人次数<=名中医就诊人次数')
        //   result = false
        //   return false
        // }
        if (Number(_data.field62) > Number(_data.field60)) {
          this.warnts('预约名中医号的患者按时就诊人次数<=网上预约名中医人次数')
          result = false
          return false
        }
        // if (Number(_data.field63) > Number(_data.field60)) {
        //   this.warnts('名中医初诊病人人次数<=网上预约名中医人次数')
        //   result = false
        //   return false
        // }
        if (Number(_data.field74) > Number(_data.field73)) {
          this.warnts('开展中医远程国际会诊人次总数<=开展中医远程会诊人次总数')
          result = false
          return false
        }
        if (Number(_data.field77) > Number(_data.field76)) {
          this.warnts('冬病夏治服务回访人次数<=开展冬病夏治服务总人次数')
          result = false
          return false
        }
        if (Number(_data.field85) > Number(_data.field84)) {
          this.warnts('开展线上适宜技术推广项目总数<=开展适宜技术推广项目总数（线上，线下）')
          result = false
          return false
        }
        if (Number(_data.field86) > Number(_data.field84)) {
          this.warnts('适宜技术推广回访总数<=开展适宜技术推广项目总数（线上，线下）')
          result = false
          return false
        }
      }
      return result
    },
    warnts(msg) {
      // 警告提示
      this.$message({
        type: 'warning',
        message: `${msg},请重新填写问卷！`
      })
    },
    organizationGetOzApi(param) {
      // 获取机构信息
      organizationGetOz(param).then(res => {
        const data = res.data
        this.annualOutpatientNum = Number(data.organization.annual_outpatient_num || '0')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.answerSheet {
  width: 50%;
  padding-top: 60px;
  margin: 0px auto 40px;
  position: relative;
  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
    position: relative;
  }
  .basicinfor {
    color: #409EFF;
    position: absolute;
    right: 0px;
    top: 30px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    .login-out {
      margin-left: 10px;
    }
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
.footer {
  text-align: center;
  padding: 30px 0px;
  box-sizing: border-box;
  .w-btn {
    width: 120px;
    border-radius: 30px;
  }
}
.hzInput /deep/ input {
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  border-radius: 0px;
}
.colDivRow {
  margin: -10px -5px;
  .div-row {
    padding: 5px;
  }
  &>.div-row:not(:last-child) {
    border-bottom: 1px solid  #ebeef5;
  }
}
.zc-save {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color:#F4F5F5;
  bottom: 50px;
  left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
    display: block;
  }
}
.sms {
  font-size: 12px;
  margin: 0px 5px;
  color: #409EFF;
  position: absolute;
  bottom: 0px;
  right: -140px;
  width: 140px;
}
</style>
