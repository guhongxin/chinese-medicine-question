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
      <template v-for="(item, key) in tabdata">
        <i v-if="false" :key="key" />
        <tr v-for="(childp, index) in item.child.mm" :key="index">
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
      <el-button type="primary" class="w-btn">暂存</el-button>
      <el-button type="primary" class="w-btn">提交</el-button>
    </div>
  </div>
</template>
<script>
import baseInforDailog from './popup/baseInforDailog'
export default {
  components: {
    baseInforDailog
  },
  data() {
    return {
      tabdata: [{
        name: '门诊预约',
        child: {
          mm: [
            '普通、专科和专家门诊号源网上开放比例', '开展哪些预约诊疗方式', '实现分时段精准预约（每个时段精确到30分钟以内）', '网上预约人次数',
            '预约患者按时就诊人次数', '网上预约专家号人次数', '预约专家号的患者按时就诊人次数', '网上预约普通号人次数', '预约普通号的患者按时就诊人次数'
          ],
          cz1: [
            { type: 0, value: '' },
            { type: 1, value: [], options: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约'] },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 0, value: '' },
            { type: 1, value: [], options: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约'] },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '健康',
        child: {
          mm: ['是否实现“两卡融合”'],
          cz1: [{ type: 2, value: '', options: ['是', '否'] }],
          cz2: [{ type: 2, value: '', options: ['是', '否'] }]
        }
      }, {
        name: '医保卡',
        child: {
          mm: ['健康医保卡使用人次', '健康医保卡使用占就诊人次比例'],
          cz1: [{ type: 0, value: '' }, { type: 0, value: '' }],
          cz2: [{ type: 0, value: '' }, { type: 0, value: '' }]
        }
      }, {
        name: '现场排队',
        child: {
          mm: ['高峰期现场排队时间'],
          cz1: [{ type: 0, value: '' }],
          cz2: [{ type: 0, value: '' }]
        }
      }, {
        name: '门诊结算',
        child: {
          mm: ['是否开展门诊智慧结算', '智慧结算方式', '门诊总结算笔数', '门诊智慧结算笔数',
            '门诊诊间结算笔数', '门诊自助结算笔数', '门诊通过移动终端进行支付的结算笔数'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '病房结算',
        child: {
          mm: ['是否开展门诊智慧结算', '智慧结算方式', '病房总结算笔数', '病房智慧结算笔数',
            '病区（床边）结算笔数', '病房自助结算笔数', '病房通过移动终端进行支付的结算笔数'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['自助结算', '诊间结算', '移动终端结算'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '电子发票',
        child: {
          mm: ['是否开展电子发票应用', '发票总开票数（包括电子发票生成数）', '电子发票生成数', '发票总打印数',
            '发票自助打印数'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '医后付',
        child: {
          mm: ['是否开展医后付', '自助机端医后付笔数', '移动终端医后付笔数'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '检查预约',
        child: {
          mm: ['是否开展检查智慧预约', '检查预约人次数', '检查智慧预约人次数', '检查诊间预约人次数', '检查集中预约人次数',
            '检查自助预约人次数', '预约患者按时检查人次数', '分时段检查预约人次数', '检验检查报告查询方式'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 1, value: [], options: ['APP查询', '网上查询', '公众号查询'] }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 1, value: [], options: ['APP查询', '网上查询', '公众号查询'] }
          ]
        }
      }, {
        name: '互联网+',
        child: {
          mm: ['是否开展互联网医疗', '中医医疗例数', '互联网医院是否接入省互联网监管平台', '互联网医院建设方式（入驻、单独建设、合作共建）', '互联网诊疗总例数（机构对个人）',
            '远程诊疗总例数（机构对机构）', '互联网电子处方张数', '是否开展互联网+护理', '服务模式', '网上门诊服务例数', '其中中医护理例数', '中医护理服务项目有哪些？',
            '中医护理服务模式有哪些？', '中医护理回访人次数'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['网上诊疗', '居家护理'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['网上诊疗', '居家护理'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '刷脸就医',
        child: {
          mm: ['是否开展刷脸就医', '应用流程'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['挂号', '付费', '诊间', '检查检验'] }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['挂号', '付费', '诊间', '检查检验'] }
          ]
        }
      }, {
        name: '名中医预约挂号',
        child: {
          mm: ['是否开展名中医预约挂号', '网上预约名中医人次数', '名中医就诊人次数', '预约名中医号的患者按时就诊人次数',
            '名中医初诊病人人次数'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中草药代煎代送',
        child: {
          mm: ['是否开展中草药代煎服务？', '是否开展中药饮片代煎质量管控？', '现场取煎药的平均等候时间', '是否开展中草药配送服务？',
            '中草药配送范围', '不同范围的平均配送送达时间'
          ],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['市', '省', '国'] },
            { type: 0, value: '' }

          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['市', '省', '国'] },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中药师线上门诊',
        child: {
          mm: ['是否开展中药药物咨询线上门诊', '线上服务人次总数'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' }

          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中医远程会诊（包括国际会诊）',
        child: {
          mm: ['是否开展中医远程会诊', '开展中医远程会诊人次总数', '开展中医远程国际会诊人次总数'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中医冬病夏治服务',
        child: {
          mm: ['是否开展冬病夏治服务', '开展冬病夏治服务总人次数', '冬病夏治服务回访人次数'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中医膏方线上预约',
        child: {
          mm: ['是否开展中医膏方线上预约服务', '中医药膏方线上预约服务总人次数', '中药膏方服务回访人次数'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }, {
        name: '中医药线上科普宣教',
        child: {
          mm: ['是否开展中医药线上科普宣教？', '开展中医药线上科普宣教频次数？'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['挂号', '付费□诊间□检查检验'] }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 1, value: [], options: ['挂号', '付费□诊间□检查检验'] }
          ]
        }
      }, {
        name: '中医线上适宜技术推广',
        child: {
          mm: ['是否开展线上适宜技术推广？', '开展线上适宜技术推广项目数？', '开展线上适宜技术推广项目总数？', '适宜技术推广回访总数？'],
          cz1: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ],
          cz2: [
            { type: 2, value: '', options: ['是', '否'] },
            { type: 0, value: '' },
            { type: 0, value: '' },
            { type: 0, value: '' }
          ]
        }
      }]
    }
  },
  methods: {
    seeBasicInfor() {
      this.$refs.baseInforDoc.showModule()
    },
    text() {
      console.log('tabdata', this.tabdata)
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
