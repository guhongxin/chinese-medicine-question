<template>
  <div class="userBasicInfor">
    <div class="title">医院基本信息</div>
    <basic-infor ref="basicInforDoc" />
    <div class="footer">
      <el-button type="primary" class="w-btn" :loading="btnloading" @click="nextBtn">下一步</el-button>
      <p v-if="errMsg.length" class="ts">{{ errMsg }}</p>
      <p class="explain">页面说明： 录入全部信息才可以进入下一步，如果存在未填项目，点击下一步，有红字提示文字</p>
    </div>
  </div>
</template>
<script>
import BasicInfor from '@/components/BasicInfor'
import { organizationSaveOz } from '@/api/usergl'
import { getCookie } from '@/utils/auth'
export default {
  components: {
    BasicInfor
  },
  data() {
    return {
      btnloading: false,
      errMsg: ''
    }
  },
  methods: {
    nextBtn() {
      const errMsg = {
        organizationName: '请填写机构名称',
        organizationCategoryCode: '请填写医疗卫生机构类别代码',
        organizationLicenseNum: '请填写医疗机构执业许可证登记号',
        organizationCategory: '请选择医院类别',
        organizationLevel: '请选择医院等级',
        annualOutpatientEmergencyNum: '请填写年门急诊量',
        annualOutpatientNum: '请填写年门诊量',
        annualEmergencyNum: '请填写年急诊量',
        annualOutpatientAppointmentRate: '请填写年门诊患者预约诊疗率',
        chineseMedicineNum: '请填写中医师人数',
        chinesePharmacistNum: '请填写中药师人数',
        tcmTechniciansProportion: '请填写中医药技术人员占全院人数比例',
        authorizedBedNum: '请填写编制床位',
        actualBedNum: '请填写实有床位',
        annualDischargeNum: '请填写年出院人数',
        chargePersonName: '请填写总负责人姓名',
        chargePersonPhone: '请填写联系电话'
      }
      const _form = this.$refs.basicInforDoc.form
      const Keys = Object.keys(errMsg)
      for (let i = 0; i < Keys.length; i++) {
        if (Keys[i] === 'organizationCategory' || Keys[i] === 'organizationLevel') {
          // 如果是这两个中的一个
          if (_form[Keys[i]].length === 0) {
            this.errMsg = errMsg[Keys[i]]
            return false
          } else {
            this.errMsg = ''
          }
        } else {
          if (!_form[Keys[i]]) {
            this.errMsg = errMsg[Keys[i]]
            return false
          } else {
            this.errMsg = ''
          }
        }
      }
      // _form.organizationCategory = _form.organizationCategory
      // _form.organizationLevel = _form.organizationLevel
      if (!this.errMsg) {
        // 没有错误填写机构信息
        const userId = getCookie('userId')
        const obj = Object.assign({}, _form, {
          userId
        })

        this.organizationSaveOzApi(obj)
      }
    },
    organizationSaveOzApi(param) {
      this.organizationSaveOz = true
      organizationSaveOz(param).then(res => {
        this.organizationSaveOz = false
        this.$message({
          type: 'success',
          message: '保存机构信息成功!'
        })
        this.$router.push({ path: 'answerSheet' })
      }).catch(() => {
        this.organizationSaveOz = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.userBasicInfor {
  width: 60%;
  margin: 0px auto;
  padding-top: 30px;
  box-sizing: border-box;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
  }
}
.w-btn {
  width: 200px;
  margin-top: 50px;
}
.ts {
  text-align: center;
  font-size: 12px;
  color: #f56c6c;
}
.explain {
  font-size: 12px;
  text-align: center;
  color: #909399;
  margin-top: 50px;
}
.footer {
  text-align: center;
}
</style>
