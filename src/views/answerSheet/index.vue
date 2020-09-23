<template>
  <div class="answerSheet">
    <div class="basicinfor">
      <div @click="seeBasicInfor">基本信息</div>
      <div class="login-out" @click="loginOut">[退出]</div>
    </div>
    <div class="title">问卷</div>
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
            <el-input v-if="item.child.cz1[index].type === 0" v-model="item.child.cz1[index].value" :disabled="item.child.cz1[index].disabled" size="small" />
            <el-checkbox-group v-else-if="item.child.cz1[index].type === 1" v-model="item.child.cz1[index].value" :disabled="item.child.cz1[index].disabled">
              <el-checkbox
                v-for="(option, key1) in item.child.cz1[index].options"
                :key="key1"
                :label="option"
              />
            </el-checkbox-group>
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
            <el-radio-group v-else v-model="item.child.cz1[index].value" :disabled="item.child.cz1[index].disabled">
              <el-radio label="是" @click.native.prevent="radioChange('是', item.child.cz1[index], 'value')" />
              <el-radio label="否" @click.native.prevent="radioChange('否', item.child.cz1[index], 'value')" />
            </el-radio-group>
          </td>
          <td>
            <el-input v-if="item.child.cz2[index].type === 0" v-model="item.child.cz2[index].value" :disabled="item.child.cz2[index].disabled" size="small" />
            <el-checkbox-group v-else-if="item.child.cz2[index].type === 1" v-model="item.child.cz2[index].value" :disabled="item.child.cz2[index].disabled">
              <el-checkbox
                v-for="(option, key1) in item.child.cz2[index].options"
                :key="key1"
                :label="option"
              />
            </el-checkbox-group>
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
            <el-radio-group v-else v-model="item.child.cz2[index].value" :disabled="item.child.cz2[index].disabled">
              <el-radio label="是" @click.native.prevent="radioChange('是', item.child.cz2[index], 'value')" />
              <el-radio label="否" @click.native.prevent="radioChange('否', item.child.cz2[index], 'value')" />
            </el-radio-group>
          </td>
        </tr>
      </template>
    </table>
    <div v-if="questionEditStatus" class="footer">
      <el-button type="primary" class="w-btn" :loading="loading0" @click="temporaryStorage">暂存</el-button>
      <el-button type="primary" class="w-btn" :loading="loading1" @click="submite">提交</el-button>
    </div>
  </div>
</template>
<script>
import baseInforDailog from './popup/baseInforDailog'
import { questionnaireContent } from '@/utils/questionnaireData.js'
import { questionnairegetQn, questionnaireSaveQn } from '@/api/usergl'
import { getCookie } from '@/utils/auth'
export default {
  components: {
    baseInforDailog
  },
  data() {
    return {
      tabData: questionnaireContent,
      loading0: false,
      loading1: false,
      questionEditStatus: true // true 编辑状态 false 禁用编辑
    }
  },
  mounted() {
    this.userId = getCookie('userId')
    this.questionnairegetQnApi()
  },
  methods: {
    seeBasicInfor() {
      this.$refs.baseInforDoc.showModule()
    },
    temporaryStorage() {
      // 暂存
      const _result = this.statisticalData(this.tabData)
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
            // 类型为1，多选
            result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value.join(',')
          } else if (param[i]['child']['cz1'][j].type === 3) {
            // 下拉 选择不为其它，为下拉选项， 如果是其它 就取输入值
            if (param[i]['child']['cz1'][j].value !== '其它') {
              result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value
            } else {
              result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].valueInput
            }
          } else {
            result['2018']['field' + itemIndex] = param[i]['child']['cz1'][j].value
          }
          // 2019
          if (param[i]['child']['cz2'][j].type === 1) {
            // 类型为1，多选
            result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].value.join(',')
          } else if (param[i]['child']['cz2'][j].type === 3) {
            // 下拉 选择不为其它，为下拉选项， 如果是其它 就取输入值
            if (param[i]['child']['cz2'][j].value !== '其它') {
              result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].value
            } else {
              result['2019']['field' + itemIndex] = param[i]['child']['cz2'][j].valueInput
            }
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
            targetData[i]['child']['cz1'][j].value = sourceData['2018']['field' + itemIndex].split(',')
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
          } else {
            // 输入 或者单选直接等于
            targetData[i]['child']['cz1'][j].value = sourceData['2018']['field' + itemIndex]
          }
          targetData[i]['child']['cz1'][j].disabled = disabled

          if (targetData[i]['child']['cz2'][j].type === 1) {
            // 多选， 将字符串变成数组
            targetData[i]['child']['cz2'][j].value = sourceData['2019']['field' + itemIndex].split(',')
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
          } else {
            // 输入 或者单选直接等于
            targetData[i]['child']['cz2'][j].value = sourceData['2019']['field' + itemIndex]
          }
          targetData[i]['child']['cz2'][j].disabled = disabled
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
    radioChange(val, obj, val2) {
      if (val === obj[val2]) {
        this.$set(obj, val2, '')
        return
      }
      this.$set(obj, val2, val)
    },
    async loginOut() {
      // 退出
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    verifyData(param) {
      const verify = ['2018', '2019']
      for (const key of verify) {
        const _data = param[key]
        if (Number(_data.field4) > Number(_data.field3)) {
          this.warnts('预约患者按时就诊人次数<=网上预约人次数')
        }
        if (Number(_data.field3) !== Number(_data.field5) + Number(_data.field7)) {
          this.warnts('网上预约人次数=网上预约专家号人次数+网上预约普通号人次数')
        }
        if (Number(_data.field6) > Number(_data.field5)) {
          this.warnts('预约专家号的患者按时就诊人次数<=网上预约专家号人次数')
        }
        if (Number(_data.field6) > Number(_data.field7)) {
          this.warnts('预约普通号的患者按时就诊人次数<=网上预约普通号人次数')
        }
      }
    },
    warnts(msg) {
      // 警告提示
      this.$message({
        type: 'warning',
        message: `${msg},请重新填写问卷！`
      })
      return false
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
</style>
