<template>
  <div class="answerSheet">
    <p class="basicinfor" @click="seeBasicInfor">基本信息</p>
    <!-- <div class="title">问卷</div> -->
    <baseInforDailog ref="baseInforDoc" />
    <table class="w-table" cellspacing="0" style="width:100%;">
      <tr>
        <th style="width:100px;" />
        <th>指标名称</th>
        <th>2018年内容</th>
        <th>2019年内容</th>
      </tr>
      <tr>
        <td style="text-align: center;" rowspan="9">
          门诊预约
        </td>
        <td width="40%"> 普通、专科和专家门诊号源网上开放比例</td>
        <td>
          <el-input v-model="data1.field1" size="small" />
        </td>
        <td>
          <el-input v-model="data2.field1" size="small" />
        </td>
      </tr>
      <tr>
        <td width="40%">开展哪些预约诊疗方式</td>
        <td>
          <el-checkbox-group v-model="data1.field2">
            <el-checkbox
              v-for="(item, key) in options2"
              :key="key"
              :label="item"
            />
          </el-checkbox-group>
        </td>
        <td>
          <el-checkbox-group v-model="data2.field2">
            <el-checkbox
              v-for="(item, key) in options2"
              :key="key"
              :label="item"
            />
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td width="40%">实现分时段精准预约（每个时段精确到30分钟以内）</td>
        <td>
          <el-radio-group v-model="data1.field3">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
        <td>
          <el-radio-group v-model="data2.field3">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td width="40%">网上预约人次数</td>
        <td style="width:200px">
          <el-input v-model="data1.field4" size="small" />
        </td>
        <td style="width:200px">
          <el-input v-model="data2.field4" size="small" />
        </td>
      </tr>
      <tr>
        <td width="40%">预约患者按时就诊人次数</td>
        <td>
          <el-input v-model="data1.field5" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field5" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td width="40%">网上预约专家号人次数</td>
        <td>
          <el-input v-model="data1.field6" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field6" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td width="40%">预约专家号的患者按时就诊人次数</td>
        <td>
          <el-input v-model="data1.field7" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field7" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td width="40%">网上预约普通号人次数</td>
        <td>
          <el-input v-model="data1.field8" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field8" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td width="40%">预约普通号的患者按时就诊人次数</td>
        <td>
          <el-input v-model="data1.field9" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field9" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          健康
        </td>
        <td width="40%">是否实现“两卡融合”</td>
        <td>
          <el-radio-group v-model="data1.field10">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
        <td>
          <el-radio-group v-model="data2.field10">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;" rowspan="2">
          医保卡
        </td>
        <td width="40%">健康医保卡使用人次</td>
        <td>
          <el-input v-model="data1.field11" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field11" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td width="40%">健康医保卡使用占就诊人次比例</td>
        <td>
          <el-input v-model="data1.field12" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field12" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          现场排队
        </td>
        <td width="40%">高峰期现场排队时间</td>
        <td>
          <el-input v-model="data1.field13" size="small" style="width:100px" />
        </td>
        <td>
          <el-input v-model="data2.field13" size="small" style="width:100px" />
        </td>
      </tr>
      <tr>
        <td style="text-align: center;" rowspan="9">
          门诊结算
        </td>
        <td width="40%">是否开展门诊智慧结算</td>
        <td>
          <el-radio-group v-model="data1.field14">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
        <td>
          <el-radio-group v-model="data2.field14">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td width="40%">智慧结算方式</td>
        <td>
          <el-radio-group v-model="data1.field14">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>

          <el-checkbox-group v-model="data2.field2">
            <el-checkbox
              v-for="(item, key) in options2"
              :key="key"
              :label="item"
            />
          </el-checkbox-group>
        </td>
        <td>
          <el-radio-group v-model="data1.field14">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </td>
      </tr>
    </table>
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
      data1: {
        field1: '1',
        field2: [],
        field3: ''
      },
      data2: {
        field1: '2',
        field2: [],
        field3: ''
      },
      tabdata: [{
        name: '门诊预约',
        child: [
          [
            '普通、专科和专家门诊号源网上开放比例', '开展哪些预约诊疗方式', '实现分时段精准预约（每个时段精确到30分钟以内）', '网上预约人次数',
            '预约患者按时就诊人次数', '网上预约专家号人次数', '预约专家号的患者按时就诊人次数', '网上预约普通号人次数', '预约普通号的患者按时就诊人次数'
          ],
          [
            { type: 0, options: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约'] },
            { type: 1, options: ['是', '否'] },
            { type: 2 },
            { type: 0 },
            { type: 0 },
            { type: 0 },
            { type: 0 },
            { type: 0 },
            { type: 0 }
          ]
        ]
      }],
      options2: ['网上预约', '电话预约', '诊间预约', '自助机预约', 'app预约', '公众号预约']
    }
  },
  methods: {
    seeBasicInfor() {
      this.$refs.baseInforDoc.showModule()
    }
  }
}
</script>
<style lang="scss" scoped>
.answerSheet {
  width: 60%;
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
</style>
