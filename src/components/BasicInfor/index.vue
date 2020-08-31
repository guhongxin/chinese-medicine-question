<template>
  <div class="basic-infor">
    <el-form ref="form" :model="form">
      <el-form-item>
        1、机构名称<el-input
          v-model="form.organizationName"
          class="hzInput"
          style="width:40%;vertical-align: super;"
        />
      </el-form-item>
      <el-form-item>
        2、医疗卫生机构类别代码：<el-input
          v-model="form.organizationCategoryCode"
          class="hzInput"
          style="width:20%;vertical-align: super;;"
        />； 医疗机构执业许可证登记号：<el-input
          v-model="form.organizationLicenseNum"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />
      </el-form-item>
      <el-form-item>
        3、医院类别：<el-checkbox-group v-model="form.organizationCategory" class="w-checkbox-group">
          <el-checkbox label="中医医院" />
          <el-checkbox label="中西医结合医院" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        4、医院等级：<el-checkbox-group v-model="form.organizationLevel" class="w-checkbox-group">
          <el-checkbox label="三甲" />
          <el-checkbox label="三乙" />
          <el-checkbox label="二甲" />
          <el-checkbox label="二乙" />
          <el-checkbox label="一级" />
          <el-checkbox label="未定级" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        5、年门急诊量<el-input
          v-model="form.annualOutpatientEmergencyNum"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />（人次），其中年门诊量<el-input
          v-model="form.annualOutpatientNum"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />；年急诊量<el-input
          v-model="form.annualEmergencyNum"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />
      </el-form-item>
      <el-form-item>
        6、年门诊患者预约诊疗率<el-input
          v-model="form.annualOutpatientAppointmentRate"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />（%）
      </el-form-item>
      <el-form-item>
        7、中医师人数<el-input
          v-model="form.chineseMedicineNum"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />中药师人数<el-input
          v-model="form.chinesePharmacistNum"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />中医药技术人员占全院人数比例<el-input
          v-model="form.tcmTechniciansProportion"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />（%）
      </el-form-item>
      <el-form-item>
        8、编制床位<el-input
          v-model="form.authorizedBedNum"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />（张）；实有床位<el-input
          v-model="form.actualBedNum"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />（张）；年出院人数<el-input
          v-model="form.annualDischargeNum"
          class="hzInput"
          style="width:10%;vertical-align: super;"
        />
      </el-form-item>
      <el-form-item>
        9、数据填报总负责人姓名：<el-input
          v-model="form.chargePersonName"
          class="hzInput"
          style="width:20%;vertical-align: super;"
        />联系电话<el-input
          v-model="form.chargePersonPhone"
          class="hzInput"
          style="width:30%;vertical-align: super;"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        organizationName: '',
        organizationCategoryCode: '',
        organizationLicenseNum: '',
        organizationCategory: [],
        organizationLevel: [],
        annualOutpatientEmergencyNum: '',
        annualOutpatientNum: '',
        annualEmergencyNum: '',
        annualOutpatientAppointmentRate: '',
        chineseMedicineNum: '',
        chinesePharmacistNum: '',
        tcmTechniciansProportion: '',
        authorizedBedNum: '',
        actualBedNum: '',
        annualDischargeNum: '',
        chargePersonName: '',
        chargePersonPhone: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-infor {
  width: 100%;
}
.hzInput /deep/ input {
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  border-radius: 0px;
}
.w-checkbox-group {
  display: inline-block;
}
.el-form-item {
  margin-bottom: 0px;
}

</style>
