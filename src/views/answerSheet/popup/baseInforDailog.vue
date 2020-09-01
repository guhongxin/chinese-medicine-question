<template>
  <el-dialog
    title="基础信息详情"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
    class="customDailog"
  >
    <basic-infor ref="basicInforDoc" :initial-data="basicInfor" />
    <div class="footer">
      <div>
        <el-button type="primary" class="w-btn" size="small" :loading="saveLoading" @click="saveBtn">保存</el-button>
        <el-button type="info" class="w-btn" size="small" @click="cancelBtn">取消</el-button>
      </div>
      <p v-if="errMsg.length" class="ts">{{ errMsg }}</p>
    </div>
  </el-dialog>
</template>
<script>
import BasicInfor from '@/components/BasicInfor'
import { organizationGetOz, organizationSaveOz } from '@/api/usergl'
import { getCookie } from '@/utils/auth'
export default {
  components: {
    BasicInfor
  },
  data() {
    return {
      dialogVisible: false,
      basicInfor: {},
      errMsg: '',
      saveLoading: false
    }
  },
  methods: {
    handleClose() {
      this.errMsg = ''
      this.basicInfor = {}
      this.userId = null
      this.dialogVisible = false
    },
    showModule() {
      this.userId = getCookie('userId')
      this.dialogVisible = true
      this.organizationGetOzApi({
        userId: this.userId
      })
    },
    organizationGetOzApi(param) {
      // 获取机构信息
      organizationGetOz(param).then(res => {
        const data = res.data
        // this.userId = data.user_id
        this.basicInfor = data.organization
      }).catch(err => {
        console.log(err)
      })
    },
    cancelBtn() {
      // 取消
      this.handleClose()
    },
    saveBtn() {
      // 保存
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
      _form.organizationCategory = _form.organizationCategory.join(',')
      _form.organizationLevel = _form.organizationLevel.join(',')
      if (!this.errMsg) {
        // 没有错误填写机构信息
        const obj = Object.assign({}, _form, {
          userId: this.userId
        })
        this.organizationSaveOzApi(obj)
      }
    },
    organizationSaveOzApi(param) {
      this.saveLoading = true
      organizationSaveOz(param).then(res => {
        this.saveLoading = false
        this.$message({
          type: 'success',
          message: '修改机构信息成功!'
        })
      }).catch(() => {
        this.saveLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.customDailog {
  /deep/ .el-dialog__header {
    text-align: center;
  }
}
.footer {
  text-align: center;
  margin: 40px 0px 0px;
  .w-btn {
    width: 120px;
    border-radius: 16px;
  }
}
</style>
