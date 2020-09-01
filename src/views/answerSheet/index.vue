<template>
  <div class="answerSheet">
    <p class="basicinfor" @click="seeBasicInfor">基本信息</p>
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
            <el-input v-if="item.child.cz1[index].type === 0" v-model="item.child.cz1[index].value" size="small" />
            <el-checkbox-group v-else-if="item.child.cz1[index].type === 1" v-model="item.child.cz1[index].value">
              <el-checkbox
                v-for="(option, key1) in item.child.cz1[index].options"
                :key="key1"
                :label="option"
              />
            </el-checkbox-group>
            <el-radio-group v-else v-model="item.child.cz1[index].value">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>
          </td>
          <td>
            <el-input v-if="item.child.cz2[index].type === 0" v-model="item.child.cz2[index].value" size="small" />
            <el-checkbox-group v-else-if="item.child.cz2[index].type === 1" v-model="item.child.cz2[index].value">
              <el-checkbox
                v-for="(option, key1) in item.child.cz2[index].options"
                :key="key1"
                :label="option"
              />
            </el-checkbox-group>
            <el-radio-group v-else v-model="item.child.cz2[index].value">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>
          </td>
        </tr>
      </template>
    </table>
    <div class="footer">
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
      loading1: false
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
        this.questionnaireSaveQnApi(obj, 'loading0')
      }).catch(() => {
        return false
      })
    },
    statisticalData(param) {
      let itemIndex = 0
      const result = {
        '2018': {},
        '2019': {}
      }
      for (let i = 0; i < param.length; i++) {
        for (let j = 0; j < param[i]['child']['mm'].length; j++) {
          const isStrcz1 = param[i]['child']['cz1'][j].type === 1
          result['2018']['field' + itemIndex] = isStrcz1 ? param[i]['child']['cz1'][j].value.join(',') : param[i]['child']['cz1'][j].value
          const isStrcz2 = param[i]['child']['cz2'][j].type === 1
          result['2019']['field' + itemIndex] = isStrcz2 ? param[i]['child']['cz2'][j].value.join(',') : param[i]['child']['cz2'][j].value
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
      }).catch(err => {
        console.log(err)
        this[btnLoading] = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.answerSheet {
  width: 50%;
  padding-top: 60px;
  margin: 0px auto;
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
